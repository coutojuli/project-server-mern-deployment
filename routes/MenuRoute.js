const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
let Menu = require('../model/Menu');

const router = express.Router();

/* Crud: Read all menu items from db*/
router.get('/', async (req, res) => {
  try {
    const menu = await Menu.find();
    res.send(menu);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/* Crud: Read menu item by id from db*/
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).send('Menu item not found');
    }
    res.send(menuItem);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/* Crud: Insert menu item to db */
router.post(
  '/',
   auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('img', 'Image path is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      //Auth: TBA -> Add the req.user ref from the auth file to get the user obj id from the token used on header as a parameter
      let newMenuItem = '';
      newMenuItem = new Menu({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        img: req.body.img,
        ingredients: req.body.ingredients,
      });

      const result = await newMenuItem.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

/* Crud: Delete menu item from db */
router.delete('/',
auth,
 async (req, res) => {
    try {
    const menuItem = await Menu.findById(req.body.id);
    if (!menuItem) {
      return res.status(404).json({ msg: 'Menu Item not found' });
    }
    const result = await Menu.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


/* Crud: Update food item on db */
router.put('/',
auth,
 async (req, res) => {
    try {
    const menuItem = await Menu.findById(req.body.id);
    if (!menuItem) {
      return res.status(404).json({ msg: 'Menu Item not found' });
    }

    menuItem.name = req.body.name;
    menuItem.description = req.body.description;
    menuItem.category = req.body.category;
    menuItem.price = req.body.price;
    menuItem.img = req.body.img;
    menuItem.ingredients = req.body.ingredients;

    await menuItem.save();
    res.send(menuItem);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
