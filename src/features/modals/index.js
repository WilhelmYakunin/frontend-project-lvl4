import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  addModal: Add,
  removeModal: Remove,
  renameModal: Rename,
};

export default (modalName) => modals[modalName];
