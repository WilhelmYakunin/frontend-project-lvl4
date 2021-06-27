import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { loadChatState, channelsProccedingError } from '../channels/channelsSlice';
import spinnerPosition from './spinnerStyles';
import routes from '../../routes';

const ChantSpinner = () => {
  const dispatch = useDispatch();
  const { token } = JSON.parse(localStorage.getItem('user'));
  const channelsDataUrl = routes.dataPath();

  axios.get(
    channelsDataUrl, {
      headers: { Authorization: 'Bearer '.concat(token) },
    },
  ).then((res) => {
    dispatch(loadChatState(res.data));
  })
    .catch((exception) => {
      const { message } = exception;
      dispatch(channelsProccedingError(message));
    });

  return <Spinner className={spinnerPosition} animation="grow" variant="success" role="status" />;
};

export default ChantSpinner;
