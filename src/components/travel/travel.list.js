import React from 'react';
import { observer, inject } from 'mobx-react';

import TravelListItem from './travel.list.item';
import TravelAdd from './travel.add';
import TravelCheckList from './travel.check.list';

const TravelListComponent = ({ stores: { travels } }) => {
  return (
    <>
      <h4>Your travel list</h4>
      <button onClick={() => travels.clear()}>Clear list</button>
      <button onClick={() => travels.new()}>New list</button>
      <div className="listBlock">
        <div className="addingList">
          {travels.travels.map(travel => (
            <TravelListItem key={travel.id} travel={travel} />
          ))}
          <TravelAdd />
        </div>
        <TravelCheckList />
      </div>
    </>
  )
}

const TravelList = inject('stores')(observer(TravelListComponent));
export default TravelList;
