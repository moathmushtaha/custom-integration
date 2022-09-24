const items = [];

module.exports = {
  items: async () => {
    return [...items];
  },
  createItem: async args => {
    const { name, description, status } = args.itemInput;
    const item = {
      _id: Math.random().toString(),
      name,
      description,
      status,
    };
    console.log(args);
    items.push(item);
    return item;
  }
};
