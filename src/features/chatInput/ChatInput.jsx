import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  inputContainerStyles,
  formGroupStyles,
  inputGroupStyles,
  inputStyles,
  inputBtnStyles,
  inputFeedbackStyles,
} from './chatInputStyles';
import {
  addMessage,
  addMessageError,
} from '../messages/messagesSlice';

const Input = ({ socket }) => {
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.channelsData.currentChannelId);
  const user = JSON.parse(localStorage.getItem('user')).username;
  const dispatch = useDispatch();
  const handelMessageSubmit = async (messageBody, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const { body } = messageBody;
      const messageInfo = { user, channelId, body };
      await socket.emit('newMessage', messageInfo, () => {
        dispatch(addMessage(messageInfo));
        resetForm();
      });
    } catch (exception) {
      dispatch(addMessageError(exception.message));
    }
    setSubmitting(false);
  };

  return (
    <div className={inputContainerStyles}>
      <Formik
        initialValues={{
          body: '',
        }}
        onSubmit={handelMessageSubmit}
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
                  aria-label={`${t('chat.send')}`}
                  type="submit"
                  className={inputBtnStyles}
                  disabled={isSubmitting}
                >
                  {t('chat.send')}
                </button>
                {(errors.body && touched.body) && (
                  <div className={inputFeedbackStyles}>{t(errors.body)}</div>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Input;
