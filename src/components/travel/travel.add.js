import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class TravelAddComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thingNmae: ""
    }
  }

  handleAddTravel = () => {
    const { thingNmae } = this.state;
    const { stores } = this.props;
    stores.travels.add(thingNmae);
    this.setState({ thingNmae: "" });
  };

  render() {
    const { thingNmae } = this.state;
    return (
      <div>
        <label>Add new thing</label>
        <input 
          value={thingNmae}
          onChange={e => this.setState({ thingNmae: e.currentTarget.value })} 
        />
        <button onClick={this.handleAddTravel}>Add</button>
      </div>
    );
  }
};

const TravelAdd = inject('stores')(observer(TravelAddComponent));
export default TravelAdd;
