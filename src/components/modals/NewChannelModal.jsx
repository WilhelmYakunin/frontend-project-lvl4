import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import {
  requestChannelsChanges,
  addChannel,
  setCurrentChannel,
  reciveChannelsChanges,
  channelsProccedingError,
} from '../../reducers/channelsSlice';
import {
  requestModalClose,
  setModalClose,
  reciveModalClose,
  modalProccedingError,
} from '../../reducers/newChannelModal';

export default function Modal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.newChannelModal.isOpen);
  const channels = useSelector((state) => state.channelsData.channels);
  const channelsNames = channels.map((channel) => channel.name);
  const SignupSchema = yup.object().shape({
    name: yup.string()
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .notOneOf(channelsNames, 'modals.uniq'),
  });

  function handleModalClose() {
    try {
      dispatch(requestModalClose());
      dispatch(setModalClose());
      dispatch(reciveModalClose());
    } catch (exception) {
      dispatch(modalProccedingError(exception.message));
    }
  }

  return (isModalOpen === false ? null
    : (
      <>
        <div className="fade modal-backdrop show" />
        <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ paddingLeft: '21px', display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title h4">{t('modals.add')}</div>
                <button type="button" onClick={handleModalClose} className="close">
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{
                    name: '',
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={async (newChannelName, { resetForm }) => {
                    try {
                      const { name } = newChannelName;
                      const socket = io();
                      await socket.emit('newChannel', name, (socketInfo) => {
                        const { id, removable } = socketInfo.data;
                        dispatch(requestChannelsChanges());
                        dispatch(addChannel({ name, id, removable }));
                        dispatch(setCurrentChannel(id));
                        dispatch(reciveChannelsChanges());
                        resetForm();
                        handleModalClose();
                      });
                    } catch (exception) {
                      dispatch(channelsProccedingError(exception.message));
                    }
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-group">
                        <Field
                          name="name"
                          data-testid="add-channel"
                          aria-label="add channel"
                          className={`${'mb-2 form-control'} ${errors.name && touched.name ? 'is-invalid' : null}`}
                        />
                        { errors.name && touched.name ? (
                          <div className="invalid-feedback">{t(errors.name)}</div>
                        ) : null }
                      </div>
                      <div className="d-flex justify-content-end">
                        <button type="button" onClick={handleModalClose} className="mr-2 btn btn-secondary">
                          {t('modals.cancel')}
                        </button>
                        <button type="submit" className="btn btn-primary">{t('modals.submit')}</button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
