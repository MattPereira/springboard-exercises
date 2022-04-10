const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");

//get all items
router.get("/", (req, res) => {
  return res.json(items);
});

//post a new item
router.post("/", (req, res, next) => {
  try {
    if (!req.body.name || !req.body.price) {
      throw new ExpressError("Items must have name and price", 400);
    }
    let { name, price } = req.body;
    const newItem = { name: name, price: price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
  } catch (e) {
    return next(e);
  }
});

//show details for a particular item
router.get("/:name", (req, res) => {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError(`${req.params.name} not found in DB`, 404);
  }
  return res.json(foundItem);
});

//update price and/or name of a particular item
router.patch("/:name", (req, res) => {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found in DB", 404);
  }
  // check to see if price or name are in req.body before updating
  let { name, price } = req.body;
  if (name) foundItem.name = name;
  if (price) foundItem.price = price;

  return res.json({ updated: foundItem });
});

//delete a particiular item
router.delete("/:name", (req, res) => {
  const foundItemIdx = items.findIndex((item) => item.name === req.params.name);
  if (foundItemIdx === -1) {
    throw new ExpressError("Item not found in DB", 404);
  }
  items.splice(foundItemIdx, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
