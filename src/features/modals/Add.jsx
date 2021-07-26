import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
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
            <div className="modal-body">
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
                    <div className="form-group">
                      <Field
                        autoFocus
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
                    </div>
                  <div className="modal-footer">
                    <button type="button" onClick={() => dispatch(setModalClose())} className="mr-2 btn btn-secondary">
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
  );
};

export default Add;
