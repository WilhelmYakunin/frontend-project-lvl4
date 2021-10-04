import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import getOnlyUniqeChannelName from './getOnlyUniqueSchema';
import { channelsGotError } from '../channels/channelsSlice';
import { closeModal } from './modalFormsSlice';
import { getAllChannels, showDropdownForChannel } from '../../store/selectors';
import SocketContext from '../../contexts/SocketContext';

const RenameChannelForm = () => {
  const { renameChannel } = React.useContext(SocketContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const idOfRenamingChannel = useSelector(showDropdownForChannel);
  const allChannels = useSelector(getAllChannels);
  const allChannelsNames = allChannels.map((channel) => channel.name);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: allChannels.filter((channel) => channel.id === idOfRenamingChannel)[0].name,
        }}
        validationSchema={getOnlyUniqeChannelName(allChannelsNames)}
        validateOnMount
        validateOnChange
        onSubmit={({ name }, { resetForm }) => {
          try {
            const renameChannelInfo = { id: idOfRenamingChannel, name };
            renameChannel(renameChannelInfo);
            resetForm();
            dispatch(closeModal());
          } catch (exception) {
            dispatch(channelsGotError(exception.message));
          }
        }}
      >
        {({ errors, isValid }) => (
          <Form>
            <Modal.Body>
              <FormGroup>
                <Field
                  autoFocus
                  name="name"
                  data-testid="rename-channel"
                  aria-label="rename channel"
                  required
                  className={cn(
                    'mb-2 form-control',
                    !isValid && 'is-invalid',
                  )}
                />
                { errors && (
                  <div className="invalid-feedback">{t(errors.name)}</div>
                ) }
              </FormGroup>
            </Modal.Body>
          </Form>
        )}
      </Formik>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          {t('modals.cancel')}
        </Button>
        <Button type="submit" variant="primary">{t('modals.submit')}</Button>
      </Modal.Footer>
    </>
  );
};

export default RenameChannelForm;
