import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { messageError } from './messagesSlice';
import { getCurrentChannelId } from '../../store/selectors';
import SocketContext from '../../contexts/SocketContext';
import AuthContext from '../../contexts/AuthContext';

const NewMessageForm = () => {
  const { t } = useTranslation();
  const channelId = useSelector(getCurrentChannelId);
  const { user } = useContext(AuthContext);
  const { addMessage } = useContext(SocketContext);
  const dispatch = useDispatch();
  const handelMessageSubmit = (messageBody, { resetForm }) => {
    try {
      const { body } = messageBody;
      const messageInfo = { user: user.username, channelId, body };
      addMessage(messageInfo);
      resetForm();
    } catch (exception) {
      dispatch(messageError(exception.message));
    }
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{
          body: '',
        }}
        validateOnChange
        onSubmit={handelMessageSubmit}
      >
        {({
          errors, isValid, isSubmitting,
        }) => (
          <Form>
            <div className="form-group">
              <div className={`input-group ${errors.body && 'has-validation'}`}>
                <Field
                  autoFocus
                  name="body"
                  aria-label="body"
                  data-testid="new-message"
                  placeholder={`${t('chat.placeholder')}`}
                  className={cn(
                    'mr-2 form-control',
                    !isValid && 'is-invalid',
                  )}
                />
                <Button
                  aria-label={`${t('chat.send')}`}
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {t('chat.send')}
                </Button>
                {errors.body && (
                <div className="d-block invalid-feedback">{t(errors.body)}</div>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewMessageForm;
