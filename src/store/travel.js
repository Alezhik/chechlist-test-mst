import React from 'react';
import { types, getParent } from 'mobx-state-tree';
import Thing from './thing';

const Travel = types
  .model('Travel', {
    thing: types.reference(Thing),
    isComplete: false,
    count: types.number,
    id: types.identifierNumber
  })
  .actions(self => {
    return({
      increment() {
        self.count++
      },
      decrement() {
        self.count--
      },
      setCompleted(complate = true) {
        self.isComplete = complate;
      },
      edit(name, category, count) {
        if (self.thing.name === name) {
          self.thing.edit(name, category)
          self.count = count;
        } else {
          getParent(self, 2).add(name);
          getParent(self, 2).remove(self);
        }
      }
    })
  })
  .views(self => ({
    status() {
      return self.isComplete ? 
        <span className="crossed">{self.thing.name}</span> 
        : self.thing.name
    }
  }))

export default Travel;
