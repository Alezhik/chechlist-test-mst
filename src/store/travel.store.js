// import { observable, action } from 'mobx';
// // import { messageStore } from './message';
// // import { thingStore } from './thing.store';
// import categorys from '../constants/thingsCategory/catrgoris.json';


// export class TravelStore {
//   // @observable travelList: Travel[] = [];
//   // @observable messageStore = messageStore;
//   // @observable thingStore = thingStore;

//   idInList: number = 0;

  // constructor() {
  //   this.createNewTravelList();
  // }

  // getIdInList(): number {
  //   return this.idInList++;
  // }

  // getTravel(name: string): Travel | undefined {
  //   // const duplicateThing = thingStore.getThing(undefined, name);
  //   // if (!duplicateThing) {
  //   //   return undefined
  //   // }
  //   // return this.travelList.find(travel => travel.thing_id === duplicateThing.id);
  //   return undefined
  // }

  // @action
  // createNewTravelList() {
  //   this.travelList = [];
  //   let things: any[] = [];
  //   // categorys.categories.forEach(category => {
  //   //   const newThings = thingStore.getThingToCategory(category.id, category.defaultThings);
  //   //   things = [ ...things, ...newThings ];
  //   // })

  //   things.forEach(thing => this.addTravel(thing.name, thing.category_id));
  // }

  // @action
  // setCompleted(id: number, isComplete: boolean = true) {
  //   this.travelList.find(travel => travel.id === id)!.isComplete = isComplete;
  // }

  // @action
  // addTravel(name: string, category_id: number = 7) {
  //   const duplicateThing = this.getTravel(name);
  //   // if (!duplicateThing) {
  //   //   this.travelList.push({ 
  //   //     thing_id: thingStore.addThing(name, category_id),
  //   //     isComplete: false,
  //   //     id: this.getIdInList(),
  //   //     count: 1
  //   //   });
  //   // } else {
  //   //   this.messageStore.addMessage({ message: "This thing is already in your list", show: true });
  //   // }
  // }

  // @action
  // removeTravel(id: number) {
  //   const deletedTravelID = this.travelList.findIndex(travel => travel.id === id);
  //   // thingStore.changeCount(this.travelList[deletedTravelID].thing_id, false);
  //   this.travelList.splice(deletedTravelID, 1);
  // }

  // @action
  // editTravel(id: number, name: string, category_id: number = 7, count: number) {
  //   const travelIndex = this.travelList.findIndex(thing => thing.id === id);
  //   // const oldThing = thingStore.getThing(this.travelList[travelIndex].thing_id);
  //   // const newTravel = travelStore.getTravel(name);
  //   // const newThing = thingStore.getThing(undefined, name);

  //   // if (!!newTravel && newThing!.id !== oldThing!.id) { 
  //   //   thingStore.changeCount(oldThing!.id, false);
  //   //   travelStore.removeTravel(id);
  //   // } else {
  //   //   if (oldThing!.countUse === 1 || newThing!.id === oldThing!.id) {
  //   //     thingStore.editThing(oldThing!.id, name, category_id);
  //   //   } else {
  //   //     this.addTravel(name, category_id);
  //   //   }
  //   // }

  //   // this.travelList[travelIndex].count = count;
  // }

  // @action
  // clearTravelList() {
  //   this.travelList = [];
//   // }
// }

// export const travelStore = new TravelStore();

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
