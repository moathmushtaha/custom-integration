const Item = require('../../models/item');

module.exports = {
  //get all items
  items: async () => {
    try {
      const items = await Item.find();
      return items.map(item => {
        return transformItem(item);
      });
    } catch (err) {
      throw err;
    }
  },

  //create item
  createItem: async args => {
    const item = new Item({
      name: args.itemInput.name,
      description: args.itemInput.description,
      status: args.itemInput.status
    });
    try {
      //save function returns a promise created by mongoose
      const result = await item.save();
      return transformItem(result);
    } catch (err) {
      throw err;
    }
  },
};

/**
 * @description
 * return item (core properties only, and leave metadata out) and transform the _id to a string
 * _id is an object, and we want to return a string
 */
const transformItem = item => {
  return {
    ...item._doc,
    _id: item.id,
  };
}
