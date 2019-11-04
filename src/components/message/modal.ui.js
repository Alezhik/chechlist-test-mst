import React from 'react';
import { observer, inject } from 'mobx-react';

const ChildComponent = ({ stores }) => {

  if (stores.message.show) {
    return (
      <div className="modal">
        <div>
          {stores.message.text}
        </div>
        <button onClick={() => stores.message.new("", false)}>Ok</button>
      </div>
    );
  }
  return null
}

const Child = inject('stores')(observer(ChildComponent));
export default Child;
