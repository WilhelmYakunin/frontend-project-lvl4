import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import cn from 'classnames';
import {
  addChannel,
  setCurrentChannel,
  channelsProccedingError,
} from '../channels/channelsSlice';
import { setModalClose } from './modalSlice';
import { getAllChannels } from '../../selectors/selectors';

const Add = ({ socket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(getAllChannels);
  const channelsNames = channels.map((channel) => channel.name);

  return (
    <>
      <Modal
        show
        onHide={() => dispatch(setModalClose())}
        backdrop="static"
        centered
      >
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={yup.object().shape({
            name: yup.string()
              .min(3, 'modals.min')
              .max(20, 'modals.max')
              .notOneOf(channelsNames, 'modals.uniq'),
          })}
          onSubmit={(newChannelName, { resetForm }) => {
            try {
              const { name } = newChannelName;
              socket.emit('newChannel', { name }, (socketInfo) => {
                dispatch(addChannel(socketInfo.data));
                dispatch(setCurrentChannel(socketInfo.data.id));
                dispatch(setModalClose());
                resetForm();
              });
            } catch (exception) {
              dispatch(channelsProccedingError(exception.message));
            }
          }}
        >
          {({ errors, isValid, touched }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>{t('modals.add')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup>
                  <Field
                    autoFocus
                    required
                    name="name"
                    data-testid="add-channel"
                    aria-label="add channel"
                    className={cn(
                      'mr-2 form-control',
                      !!touched.name && (isValid ? 'is-valid' : 'is-invalid'),
                    )}
                  />
                  { (errors.name && touched.name) && (
                  <div className="invalid-feedback">{t(errors.name)}</div>
                  ) }
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => dispatch(setModalClose())}>
                  {t('modals.cancel')}
                </Button>
                <Button type="submit" variant="primary">{t('modals.submit')}</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default Add;
