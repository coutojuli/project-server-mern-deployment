const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
let Inventory = require('../model/Inventory');

const router = express.Router();

/* Crud: Read inventory from db*/
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.send(inventory);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/* Crud: Read single item from inventory by id from db*/
router.get('/:id', async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.send(item);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/* Crud: Insert item to inventory */
router.post(
  '/',
   auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('quantity', 'Quantity is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newItem = new Inventory({
        // user: req.user.id,
        name: req.body.name,
        quantity: req.body.quantity,
        status:req.body.status,
      });

      const result = await newItem.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

/* Crud: Delete item from inventory */
router.delete('/',
auth,
async (req, res) => {
    try {
      const item = await Inventory.findById(req.body.id);
      if (!item) {
        return res.status(404).json({ msg: 'Item not found' });
      }
      const result = await Inventory.findByIdAndDelete(req.body.id);
      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
});

/* Crud: Update item on inventory */
router.put('/',
auth,
 async (req, res) => {
    try {
      const item = await Inventory.findById(req.body.id);
      console.log(item);
      if (!item) {
        return res.status(404).json({ msg: 'Item not found' });
      }
      //cart.user = req.body.user;
      item.name = req.body.name;
      item.quantity = req.body.quantity;
      item.status = req.body.status;

      await item.save();
      res.send(item);
    } catch (err) {
      res.status(500).send('Server error');
    }
});

module.exports = router;
