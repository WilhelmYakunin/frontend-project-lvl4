import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import cn from 'classnames';
import getOnlyUniqeChannelName from './getOnlyUniqueSchema';
import { channelsGotError } from '../channels/channelsSlice';
import { closeModal } from './modalFormsSlice';
import { getAllChannels } from '../../store/selectors';
import SocketContext from '../../contexts/SocketContext';

const NewChannelForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(getAllChannels);
  const channelsNames = channels.map((channel) => channel.name);
  const { addChannel } = React.useContext(SocketContext);

  return (
    <>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={getOnlyUniqeChannelName(channelsNames)}
        validateOnMount
        validateOnChange={false}
        onSubmit={(newChannelName, { resetForm }) => {
          try {
            const { name } = newChannelName;
            addChannel(name);
            resetForm();
            dispatch(closeModal());
          } catch (exception) {
            dispatch(channelsGotError(exception.message));
          }
        }}
      >
        {({ errors, isValid }) => (
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
                  required
                  className={cn(
                    'mr-2 form-control',
                    !isValid && 'is-invalid',
                  )}
                />
                { errors.name && (
                <div className="invalid-feedback">{t(errors.name)}</div>
                ) }
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => dispatch(closeModal())}>
                {t('modals.cancel')}
              </Button>
              <Button type="submit" variant="primary">{t('modals.submit')}</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default NewChannelForm;
