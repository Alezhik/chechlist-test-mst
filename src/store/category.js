import { types } from 'mobx-state-tree';

const Category = types.model('Category', {
  id: types.identifierNumber,
  name: types.string,
  defaultThings: types.number
})

export default Category;