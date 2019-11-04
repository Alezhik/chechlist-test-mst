import { types } from 'mobx-state-tree';
import Category from './category';

const Thing = types
  .model('Thing', {
    name: types.string,
    category: types.reference(Category),
    countUse: types.number,
    id: types.identifierNumber
  })
  .actions(self => ({
    use() {
      self.countUse++
    },
    unused() {
      self.countUse--
    },
    edit(name, category = 7) {
      self.name = name;
      self.category = category;
    },
  }));

export default Thing;
