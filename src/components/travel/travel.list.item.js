import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { travels } from '../../store';

const TravelListItemComponent = ({ travel, stores }) => {

  const [value, setValue] = useState({ 
    edit: false, 
    newName: travel.thing.name,
    category: travel.thing.category.id,
    newCount: travel.count,
    thing_id: travel.thing.id,
    thing: travel.thing
  });

  const handleChangeTravel = () => {
    travel.edit(value.newName, value.category, travel.count);
    setValue({ ...value, edit: false });
  };

  const handleCountChange = (count) => {
    travel.edit(value.newName, value.category, parseInt(count));
    setValue({ ...value, newCount: parseInt(count)});
  }

  const handleSelect = (event) => {
    travel.edit(value.newName, event.currentTarget.value, travel.count);
    setValue({ ...value, category: event.currentTarget.value});
  }

  const sameDom = () => <>
    <input 
      key="count_input"
      type="number"
      value={value.newCount} 
      onChange={obj => handleCountChange(obj.target.value)}
    />
    <select name="select" onChange={e => handleSelect(e)} value={value.category}>
      {stores.categories.categories.map((category) => 
        <option
          value={category.id}
          key={`category_${category.id}`}
        >
          {category.name}
        </option> 
      )}
    </select>
  </>

  return (
    <div key={`travel-${travel.id}`}>
      {value.edit ? 
        <>
          <input
            key="edit_input"
            value={value.newName} 
            onChange={obj => setValue({ ...value, newName: obj.target.value }) } 
          />
          {sameDom()}
          <button onClick={handleChangeTravel} key="save_button">save</button>
        </>
      : 
        <>
          {`${travel.thing.name} - ${travel.thing.countUse}`}
          {sameDom()}
          <button onClick={() => setValue({ ...value, edit: true})} key="edit_button">edit</button>
          <button onClick={() => travels.remove()} key="delete_button">x</button>
        </>
      }
    </div>
  ) 
};

const TravelListItem = inject('stores')(observer(TravelListItemComponent));
export default TravelListItem;
