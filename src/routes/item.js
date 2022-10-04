const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item-controller.js');
const authenticationMiddleware = require('../middlewares/authentication').authenticationMiddleware;

router.post('/item/print-request', authenticationMiddleware, itemController.printRequest);
router.post('/item/field-defs', authenticationMiddleware, itemController.getItemFieldDefs);
router.post('/item/store', authenticationMiddleware, itemController.store);
router.post('/item/update', authenticationMiddleware, itemController.update);
router.post('/item/storeOrUpdate', authenticationMiddleware, itemController.storeOrUpdate);

module.exports = router;
