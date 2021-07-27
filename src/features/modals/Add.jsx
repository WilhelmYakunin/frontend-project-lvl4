import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
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
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ paddingLeft: '21px', display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="m-auto modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('modals.add')}</div>
              <button type="button" onClick={() => dispatch(setModalClose())} className="close">
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
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
                    resetForm();
                    dispatch(setModalClose());
                  });
                } catch (exception) {
                  dispatch(channelsProccedingError(exception.message));
                }
              }}
            >
              {({ errors, isValid, touched }) => (
                <Form>
                  <div className="modal-body">
                    <div className="form-group">
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
                    </div>
                  </div>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(setModalClose())}>
                      {t('modals.cancel')}
                    </Button>
                    <Button type="submit" name={t('modals.submit')} variant="primary">{t('modals.submit')}</Button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
