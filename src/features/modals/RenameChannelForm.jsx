import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
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
  const RenameSchema = yup.object().shape({
    name: yup.string()
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .notOneOf(allChannelsNames, 'modals.uniq'),
  });

  return (
    <>
      <Modal
        animation={false}
        show
        onHide={() => dispatch(closeModal())}
        backdrop="static"
        centered
      >
        <Formik
          initialValues={{
            name: allChannels.filter((channel) => channel.id === idOfRenamingChannel)[0].name,
          }}
          validationSchema={RenameSchema}
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
          {({ errors, isValid, touched }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>{t('modals.rename')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup>
                  <Field
                    autoFocus
                    name="name"
                    data-testid="rename-channel"
                    aria-label="rename channel"
                    className={cn(
                      'mb-2 form-control',
                      !!touched && (isValid || 'is-invalid'),
                    )}
                  />
                  { (errors.name && touched.name) && (
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
      </Modal>
    </>
  );
};

export default RenameChannelForm;
