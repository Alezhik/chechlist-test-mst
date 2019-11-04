import { types } from 'mobx-state-tree';

import Thing from './thing';

const ThingsStore = types
  .model('ThingsStore', {
    things: types.array(Thing),
  })
  .actions(self => {
    let idCount = 10;
    const getId = () => idCount++;
    return ({ 
      add(name, category = 7) {
        const thisThing = self.things.find(thing => thing.name === name);
        if (!thisThing) {
          const newThing = { name, category, id: getId(), countUse: 1 }
          self.things.push(newThing)
          return self.things[self.things.length-1]
        }
        thisThing.category = category;
        thisThing.use();
        return thisThing
      },
      handleFilter(category, maxCount) {
        return self.things
          .filter(thing => thing.category.id === category && thing.countUse > 0)
          .sort((a, b) => b.countUse - a.countUse)
          .slice(0, maxCount)
      }
    })
  })

export default ThingsStore;
