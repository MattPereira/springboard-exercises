const express = require("express");
const router = new express.Router();
const Message = require("../models/message");
const { ensureLoggedIn } = require("../middleware/auth");
const ExpressError = require("../expressError");

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get("/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    // the currently logged in user
    let username = req.user.username;
    // the message that will be viewed
    let msg = await Message.get(req.params.id);

    //checks if currently logged in user is either the to or from user
    if (
      msg.to_user.username !== username &&
      msg.from_user.username !== username
    ) {
      throw new ExpressError("Not allowed to read this message!", 401);
    }

    return res.json({ message: msg });
  } catch (e) {
    return next(e);
  }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post("/", ensureLoggedIn, async (req, res, next) => {
  try {
    let message = await Message.create({
      from_username: req.user.username,
      to_username: req.body.to_username,
      body: req.body.body,
    });

    return res.json(message);
  } catch (e) {
    return next(e);
  }
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post("/:id/read", ensureLoggedIn, async (req, res, next) => {
  try {
    let { id } = req.params;
    let recipient = req.user.username;
    let message = await Message.get(id);
    //only the recipient of a message can mark it as read
    if (recipient === message.to_user.username) {
      let readStatus = await Message.markRead(id);
      return res.json({ message: readStatus });
    } else {
      throw new ExpressError(
        "Only the recipient of a message can mark it as read!",
        401
      );
    }
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
