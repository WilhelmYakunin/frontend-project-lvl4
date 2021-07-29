import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import initLocalization from '../locales/initLocalization';
import AppHeader from '../features/AppHeader';
import Login from '../features/login/Login';
import Signup from '../features/signup/Signup';
import NoMatch from '../components/NoMatch';
import StartPage from '../features/StartPage';
import Modal from '../features/modals/Switch';
import LoadSpinner from '../components/LoadSpinner';
import { addMessage } from '../features/messages/messagesSlice';
import {
  addChannel, setCurrentChannel, renameChannel, deleteChannel,
} from '../features/channels/channelsSlice';

const App = ({ socket }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (newMessage) => dispatch(addMessage(newMessage)));
  socket.on('newChannel', (newChannel) => {
    dispatch(addChannel(newChannel));
    dispatch(setCurrentChannel(newChannel.id));
  });
  socket.on('renameChannel', (newName) => dispatch(renameChannel(newName)));
  socket.on('removeChannel', (requestedChannleId) => {
    const INITIAL_CURRENT_CHANNEL_ID = 1;
    dispatch(deleteChannel(requestedChannleId));
    dispatch(setCurrentChannel(INITIAL_CURRENT_CHANNEL_ID));
  });

  initLocalization();

  return (
    <Router>
      <React.Suspense fallback={<LoadSpinner />}>
        <div className="d-flex flex-column h-100">
          <AppHeader />
          <Switch>
            <StartPage exact path="/" socket={socket} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="*" component={NoMatch} />
          </Switch>
          <Modal socket={socket} />
        </div>
      </React.Suspense>
    </Router>
  );
};

export default App;
