const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
let Cart = require('../model/Cart');

const router = express.Router();

/* Crud: Read all carts from db*/
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.send(carts);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/* Crud: Read single cart by id from db*/
router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    res.send(cart);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/* Crud: Insert cart to db */
router.post(
  '/',
   auth,
  [
    check('items', 'Items are required').not().isEmpty(),
    check('totalPrice', 'Total price is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newCart = new Cart({
        //user: req.body.user,
        items: req.body.items,
        totalPrice: req.body.totalPrice
      });

      const result = await newCart.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

/* Crud: Delete cart from db */
router.delete('/',
auth,
async (req, res) => {
    try {
      const cart = await Cart.findById(req.body.id);
      if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
      }
      const result = await Cart.findByIdAndDelete(req.body.id);
      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
});


/* Crud: Update cart on db */
router.put('/',
auth,
 async (req, res) => {
    try {
      const cart = await Cart.findById(req.body.id);
      if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
      }
      //cart.user = req.body.user;
      cart.items = [...req.body.items];
      cart.totalPrice = req.body.totalPrice;

      await cart.save();
      res.send(cart);
    } catch (err) {
      res.status(500).send('Server error');
    }
});

module.exports = router;
