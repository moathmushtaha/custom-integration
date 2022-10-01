//import createItem from '../graphql/resolvers/items';
const Item = require('../models/item');

function getItemFieldDefs(req, res) {
  console.log('getItemFieldDefs', JSON.stringify(req.body));
  return res.status(200).send([
    {
      id: 'name',
      title: 'Name',
      outboundType: 'text',
      inboundTypes: ['text', 'text_array', 'text_with_label'],
      required: true
    },
    {
      id: 'description',
      title: 'Description',
      outboundType: 'text',
      inboundTypes: ['text', 'text_array', 'text_with_label'],
      required: true
    },
    {
      id: 'status',
      title: 'Status',
      outboundType: 'text',
      inboundTypes: ['text', 'text_array', 'text_with_label'],
      required: true
    },
  ]);
}

async function store(req, res) {
  console.log('Item Data From Monday', JSON.stringify(req.body.payload.inputFields.itemField));
  const data = req.body.payload.inputFields.itemField;
  //check if data has all the required fields
  if (!data.name || !data.description || !data.status) {
    data.name = data.name || 'No Name';
    data.description = data.description || 'No Description';
    data.status = data.status || 'No Status';
  }
  const item = new Item({
    name: req.body.payload.inputFields.itemField.name,
    description: req.body.payload.inputFields.itemField.description,
    status: req.body.payload.inputFields.itemField.status
  });
  try {
    //save function returns a promise created by mongoose
    const result = await item.save();
    console.log('Result From MongoDB', JSON.stringify(result));
    return res.status(200).send({});
  } catch (err) {
    throw err;
  }
}

function update(req, res) {
  console.log('update', JSON.stringify(req.body));
  return res.status(200).send({});
}

module.exports = {
  store,
  update,
  getItemFieldDefs,
};

