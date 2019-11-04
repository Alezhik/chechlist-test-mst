import { types, getParent } from 'mobx-state-tree';
import Travel from './travel';

const TravelsStore = types
  .model('TravelsStore', {
    travels: types.array(Travel)
  })
  .actions(self => {
    let id = 0;
    const getId = () => id++;
    return({
      clear() {
        self.travels = [];
      },
      new() {
        self.travels = [];
        let things = [];
        getParent(self, 1).categories.categories
          .forEach(category => {
            const defaultThings = getParent(self, 1).things
              .handleFilter(category.id, category.defaultThings);
            things = [ ...things, ...defaultThings ];
          });
          things.forEach(thing => self.add(thing.name, thing.category));
      },
      add(name, category) {
        const duplicateThing = self.travels.find(travel => travel.thing.name === name);
        if (!duplicateThing) {
          const newThing = getParent(self, 1).things.add(name, category);
          self.travels.push({ 
            thing: newThing.id,
            isComplete: false,
            id: getId(),
            count: 1
          });
        } else {
          getParent(self, 1).message.new("This thing is already in your list", true);
        }
      },
      remove(travel) {
        self.travels.splice(self.travels.indexOf(travel), 1);
      }
    })
  })

export default TravelsStore;
