import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { messageError } from './messagesSlice';
import { getCurrentChannelsId } from '../../selectors/selectors';
import Context from '../../contexts/context';

const NewMessageForm = () => {
  const { t } = useTranslation();
  const channelId = useSelector(getCurrentChannelsId);
  const user = JSON.parse(localStorage.getItem('user')).username;
  const { addMessage } = React.useContext(Context);
  const dispatch = useDispatch();
  const handelMessageSubmit = (messageBody, { resetForm }) => {
    try {
      const { body } = messageBody;
      const messageInfo = { user, channelId, body };
      addMessage(messageInfo);
      resetForm();
    } catch (exception) {
      dispatch(messageError(exception.message));
    }
  };

  return (
    <div className="mt-auto">
      <Formik
        initialValues={{
          body: '',
        }}
        onSubmit={handelMessageSubmit}
      >
        {({
          errors, touched, isValid, isSubmitting,
        }) => (
          <Form>
            <div className="form-group">
              <div className={`input-group ${(errors.body && touched.body) ? 'has-validation' : null}`}>
                <Field
                  autoFocus
                  name="body"
                  aria-label="body"
                  data-testid="new-message"
                  placeholder={`${t('chat.placeholder')}`}
                  className={cn(
                    'mr-2 form-control',
                    !!touched.body && (!isValid && 'is-invalid'),
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
                {(errors.body && touched.body) && (
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
