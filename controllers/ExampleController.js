const express = require("express"); //import express
const router = express.Router(); //get class router from express
const auth = require("../middleware/auth");

//Import Example Model
const Example = require("../models/Example");

// @route GET api/v1/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
    Example.find()
    .sort({ date: -1 })
    .then(items => {
      if (items.length === 0) {
        res.status(204).json({
          status: 204,
          message: "Items is Empty"
        });
      } else if (items === undefined) {
        res.status(404).json({
          status: 404,
          message: "Items not found"
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "Success get all items",
          data: items
        });
      }
    });
});

// @route GET api/v1/items/:id
// @desc Get Specific item by id
// @access Public
router.get("/:id", (req, res) => {
  Example.findById(req.params.id)
    .then(item =>
      res.status(200).json({
        status: 200,
        message: `Succes get data ${req.params.id}`,
        data: item,
        success: true
      })
    )
    .catch(err =>
      res.status(404).json({
        status: 404,
        message: `Failed get data ${req.params.id}. ${err}`,
        success: false
      })
    );
});

// @route GET api/v1/items/:id
// @desc Get Specific item by id
// @access Public
router.get("/", (req, res) => {
  Example.findOne({ name: req.query.name })
    .then(item =>
      res.status(200).json({
        status: 200,
        message: `Succes get data ${req.params.name}`,
        data: item,
        success: true
      })
    )
    .catch(err =>
      res.status(404).json({
        status: 404,
        message: `Failed get data ${req.params.id}. ${err}`,
        success: false
      })
    );
});

// @route POST api/v1/items
// @desc Add new item
// @access Private
router.post("/", auth, (req, res) => {
  if (req.body.name === "") {
    res.status(400).json({
      status: 400,
      message: "Name is empty",
      success: false
    });
  } else if (req.body.count === "") {
    res.status(400).json({
      status: 400,
      message: "Count is empty",
      success: false
    });
  } else {
    const newItem = new Item({
      name: req.body.name,
      count: parseInt(req.body.count)
    });
    newExample.save().then(item =>
      res.status(200).json({
        status: 200,
        message: "Succes add new item",
        data: item,
        success: true
      })
    );
  }
});

// @route DELETE api/v1/items/:id
// @desc Remove item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Example.findById(req.params.id)
    .then(item =>
      Example.remove().then(() =>
        res.status(200).json({
          status: 200,
          message: `Succes remove data ${req.params.id}`,
          success: true
        })
      )
    )
    .catch(err =>
      res.status(404).json({
        status: 404,
        message: `Failed remove data ${req.params.id}. ${err}`,
        success: false
      })
    );
});

module.exports = router;
