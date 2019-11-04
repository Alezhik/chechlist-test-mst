import { types } from 'mobx-state-tree';

const Message = types
  .model('Message', {
    text: types.string,
    show: false
  })
  .actions(self => ({
    new(text, show) {
      self.text = text;
      self.show = show;
    }
  }));

export default Message;
