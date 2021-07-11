import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import {
  renameChannel,
  channelsProccedingError,
} from '../channels/channelsSlice';
import { setModalClose } from './modalSlice';

const RenameModal = ({ socket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.dropdown.id);
  const allChannels = useSelector((state) => state.channelsData.channels);
  const allChannelsNames = allChannels.map((channel) => channel.name);
  const RenameSchema = yup.object().shape({
    name: yup.string()
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .notOneOf(allChannelsNames, 'modals.uniq'),
  });

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ paddingLeft: '21px', display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('modals.rename')}</div>
              <button type="button" onClick={() => dispatch(setModalClose())} className="close">
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  name: allChannels.filter((channel) => channel.id === id)[0].name,
                }}
                validationSchema={RenameSchema}
                onSubmit={async ({ name }, { resetForm }) => {
                  try {
                    const req = { id, name };
                    await socket.emit('renameChannel',
                      req, () => {
                        dispatch(renameChannel(req));
                        resetForm();
                        dispatch(setModalClose());
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
                        data-testid="rename-channel"
                        aria-label="rename channel"
                        className={`${'mb-2 form-control'} ${errors.name && touched.name ? 'is-invalid' : null}`}
                      />
                      { errors.name && touched.name ? (
                        <div className="invalid-feedback">{t(errors.name)}</div>
                      ) : null }
                    </div>
                    <div className="d-flex justify-content-end">
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

export default RenameModal;
