import { types } from "mobx-state-tree";

import Category from './category';

const Categories = types.model('Categories', {
  categories: types.array(Category)
});

export default Categories;