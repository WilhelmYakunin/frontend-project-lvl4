import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import cn from 'classnames';
import { channelsProccedingError } from '../channels/channelsSlice';
import { setModalClose } from './modalSlice';
import { getAllChannels } from '../../selectors/selectors';
import Context from '../../contexts/context';

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(getAllChannels);
  const channelsNames = channels.map((channel) => channel.name);
  const { addChannel } = React.useContext(Context);

  return (
    <>
      <Modal
        animation={false}
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
              addChannel(name);
              resetForm();
              dispatch(setModalClose());
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
                    name="name"
                    data-testid="add-channel"
                    aria-label="add channel"
                    className={cn(
                      'mr-2 form-control',
                      !!touched.name && (!isValid && 'is-invalid'),
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
