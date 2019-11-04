import React from 'react';
import './App.css';
import { observer, Provider } from 'mobx-react';

import Modal from './components/message/modal';
import Child from './components/message/modal.ui';
import TravelList from './components/travel/travel.list';

import stores from './store';

function App() {
  return (
    <Provider stores={stores}>
      <TravelList />
      <Modal>
        <Child/>
      </Modal>
    </Provider>
  );
}

export default observer(App);
