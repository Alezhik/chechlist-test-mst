import { types } from 'mobx-state-tree';

import Categories from './categories.store';
import Message from './message';
import ThingsStore from './thing.store';
import TravelsStore from './travel.store';

import categoriesData from '../constants/category.json';
import thingsDate from '../constants/things.json';

export const categories = Categories.create(categoriesData),
message = Message.create({text: "", show: false}),
things = ThingsStore.create(thingsDate),
travels = TravelsStore.create();

const StoresObj = types.model('Stores', {
  categories: Categories,
  message: Message,
  things: ThingsStore,
  travels: TravelsStore,
})

const stores = StoresObj.create({categories, message, things, travels});

travels.new();

export default stores;
