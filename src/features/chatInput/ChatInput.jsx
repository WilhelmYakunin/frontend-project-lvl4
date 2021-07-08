import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import {
  inputContainerStyles,
  formGroupStyles,
  inputGroupStyles,
  inputStyles,
  inputBtnStyles,
  inputFeedbackStyles,
} from './chatInputStyles';
import {
  requestAddMessage,
  addMessage,
  receiveNewMessage,
  addMessageError,
} from '../messages/messagesSlice';

export default function Input() {
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.channelsData.currentChannelId);
  const user = JSON.parse(localStorage.getItem('user')).username;
  const dispatch = useDispatch();

  return (
    <div className={inputContainerStyles}>
      <Formik
        initialValues={{
          body: '',
        }}
        onSubmit={async (messageBody, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            const { body } = messageBody;
            const messageInfo = { user, channelId, body };
            const socket = io();
            await socket.emit('newMessage', messageInfo, () => {
              dispatch(requestAddMessage());
              dispatch(addMessage(messageInfo));
              dispatch(receiveNewMessage());
              resetForm();
            });
          } catch (exception) {
            dispatch(addMessageError(exception.message));
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className={formGroupStyles}>
              <div className={`${inputGroupStyles} ${errors.body && touched.body ? 'has-validation' : null}`}>
                <Field
                  name="body"
                  aria-label="body"
                  data-testid="new-message"
                  placeholder={`${t('chat.placeholder')}`}
                  className={`${inputStyles} ${errors.body && touched.body ? 'is-invalid' : null}`}
                />
                <button
                  aria-label="submit"
                  type="button"
                  className={inputBtnStyles}
                  disabled={isSubmitting}
                >
                  {t('chat.send')}
                </button>
                {errors.body && touched.body ? (
                  <div className={inputFeedbackStyles}>{t(errors.body)}</div>
                ) : null}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
