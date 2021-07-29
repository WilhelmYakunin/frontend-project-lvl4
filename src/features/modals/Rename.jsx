import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { channelsProccedingError } from '../channels/channelsSlice';
import { setModalClose } from './modalSlice';
import { getAllChannels } from '../../selectors/selectors';

const RenameModal = ({ socket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.dropdown.id);
  const allChannels = useSelector(getAllChannels);
  const allChannelsNames = allChannels.map((channel) => channel.name);
  const RenameSchema = yup.object().shape({
    name: yup.string()
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .notOneOf(allChannelsNames, 'modals.uniq'),
  });

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
            name: allChannels.filter((channel) => channel.id === id)[0].name,
          }}
          validationSchema={RenameSchema}
          onSubmit={async ({ name }, { resetForm }) => {
            try {
              const req = { id, name };
              await socket.emit('renameChannel', req, (acknowledge) => {
                if (acknowledge.status === 'ok') {
                  resetForm();
                  dispatch(setModalClose());
                }
              });
            } catch (exception) {
              dispatch(channelsProccedingError(exception.message));
            }
          }}
        >
          {({ errors, isValid, touched }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>{t('modals.rename')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup>
                  <Field
                    autoFocus
                    name="name"
                    data-testid="rename-channel"
                    aria-label="rename channel"
                    className={cn(
                      'mb-2 form-control',
                      !!touched && (isValid || 'is-invalid'),
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

export default RenameModal;
