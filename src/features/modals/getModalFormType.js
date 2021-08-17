import NewChannelForm from './NewChannelForm.jsx';
import RemoveChannelForm from './RemoveChannelForm.jsx';
import RenameChannelForm from './RenameChannelForm.jsx';

const modals = {
  addModal: NewChannelForm,
  removeModal: RemoveChannelForm,
  renameModal: RenameChannelForm,
};

export default (modalName) => modals[modalName];
