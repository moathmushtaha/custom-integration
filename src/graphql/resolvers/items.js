const Item = require('../../models/item');

module.exports = {
  //get all items
  items: async () => {
    try {
      //reverse the order of the items so the newest item is first
      const items = await Item.find().sort({ _id: -1 });
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

  //update item
  updateItem: async args => {
    try {
      const item = await Item.findById(args._id);
      item.name = args.itemInput.name;
      item.description = args.itemInput.description;
      item.status = args.itemInput.status;
      const result = await item.save();
      return transformItem(result);
    } catch (err) {
      throw err;
    }
  }
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
