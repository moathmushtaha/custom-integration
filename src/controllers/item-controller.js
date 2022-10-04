const mondayService = require('../services/monday-service');

//import createItem from '../graphql/resolvers/items';
const Item = require('../models/item');

function printRequest(req, res) {
  console.log('print', JSON.stringify(req.body));
  return res.status(200).send({});
}

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
  const itemId = req.body.payload.inputFields.itemId;

  check(data);

  const item = new Item({
    _id: itemId,
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

async function update(req, res) {
  const _id = req.body.payload.inputFields.itemId;
  const data = req.body.payload.inputFields.itemField;

  check(data);

  try {
    const item = await Item.findById(_id);
    if (!item) {
     console.log('Item Not Found');
    } else {
      item.name = data.name;
      item.description = data.description;
      item.status = data.status;
      const result = await item.save();
      return res.status(200).send({});
    }
  } catch (err) {
    throw err;
  }
}

async function storeOrUpdate(req, res) {
  console.log('store or update');
  console.log('Item Data From Monday', JSON.stringify(req.body.payload.inputFields.itemField));
  const _id = req.body.payload.inputFields.itemId;
  const data = req.body.payload.inputFields.itemField;

  check(data);

  try {
    let item = await Item.findById(_id);
    if (!item) {
       item = new Item({
        _id: _id,
        name: data.name,
        description: data.description,
        status: data.status,
      });
    } else {
      item.name = data.name;
      item.description = data.description;
      item.status = data.status;
    }

    const result = await item.save();
    console.log('Result From MongoDB', JSON.stringify(result));
    return res.status(200).send({});
  } catch (err) {
    throw err;
  }
}

function check(data) {
  //check if data has all the required fields
  if (!data.name || !data.description || !data.status) {
    data.name = data.name || 'No Name';
    data.description = data.description || 'No Description';
    data.status = data.status || 'No Status';
  }
}

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

module.exports = {
  store,
  update,
  getItemFieldDefs,
  printRequest,
  storeOrUpdate,
};

