import React from 'react';
import { observer } from 'mobx-react';

const TravelCheckListItemComponent = ({ travel }) => {
  return (
    <div key={travel.id}>
      <input 
        type="checkbox"
        onClick={() => travel.setCompleted(!travel.isComplete)}
        defaultChecked={travel.isComplete}
      />&nbsp;{travel.status()}
    </div>
  ) 
};

const TravelCheckListItem = observer(TravelCheckListItemComponent);
export default TravelCheckListItem;
