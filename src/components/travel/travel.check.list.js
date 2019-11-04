import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';

import TravelCheckListItem from './travel.check.item';
import { getParent } from 'mobx-state-tree';

const TravelCheckListComponent = ({ stores: { travels } }) => {
  const [sortedTravelList, setSortedTravelList] = useState("default");

  const listReturn = (list) => list.map(travel => 
    <TravelCheckListItem 
      key={travel.id}
      travel={travel}
    />
  );

  let listContent = <>{listReturn(travels.travels)}</>;

  switch (sortedTravelList) {
    case "category":
      listContent = <>{
        getParent(travels, 1).categories.categories.map(category => {
          const things = travels.travels.filter(
            travel => travel.thing.category === category
          );
          return (
            <div key={`category_${category.id}`}>
              <h6>{category.name}</h6>
              {listReturn(things)}
            </div>
          )}
        )
      }</>;
      break;
    case "take":
      listContent = <>
        <h6>Done</h6>
        {listReturn(travels.travels.filter(travel => !!travel.isComplete))}
        <h6>Not done</h6>
        {listReturn(travels.travels.filter(travel => !travel.isComplete))}
      </>;
      break;
    case "default":
    default:
      listContent = <>{listReturn(travels.travels)}</>;
      break;
  }

  return (
    <div>
      <button onClick={() => setSortedTravelList("default")}>Defualt sort</button>
      <button onClick={() => setSortedTravelList("category")}>Sort by category</button>
      <button onClick={() => setSortedTravelList("take")}>Group what you take</button>
      <div className="checkerList">
        {listContent}
      </div>
    </div>
  )
}

const TravelCheckList = inject('stores')(observer(TravelCheckListComponent));
export default TravelCheckList;
