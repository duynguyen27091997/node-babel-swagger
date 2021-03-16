"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _data = _interopRequireDefault(require("../data"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var notificationRouter = _express["default"].Router();

notificationRouter.use(_bodyParser["default"].json()); // to use body object in requests

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Notification:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a notification
 *         userId:
 *           type: integer
 *           description: id of author
 *         title:
 *           type: string
 *           description: title of notification
 *         body:
 *           type: string
 *           description: content of notification *
 *       example:
 *         id: 1
 *         userId: 1
 *         title: my title
 *         body: my content
 *
 */

/**
 * @swagger
 *  tags:
 *  - name: Notifications
 *    description: Notifications of users
 */

/**
 * @swagger
 * /notifications:
 *   description: Returns pets based on ID
 *   summary: Find pets by ID
 *   operationId: getPetsById
 *   get:
 *     summary: Returns all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: the list of the notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */

notificationRouter.get("/", function (req, res) {
  res.send(_data["default"]);
});
/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: gets notifications by id
 *     tags: [Notifications]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of notification
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: notifications by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: notification can not be found
 */

notificationRouter.get("/:id", function (req, res) {
  var notification = _data["default"].find(function (notification) {
    return notification.id === +req.params.id;
  });

  if (!notification) {
    res.sendStatus(404);
  }

  res.send(notification);
});
/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: The notification was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Some server error
 */

notificationRouter.post("/", function (req, res) {
  try {
    var notification = _objectSpread(_objectSpread({}, req.body), {}, {
      id: _data["default"].length + 1
    });

    _data["default"].push(notification);

    res.send(notification);
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     summary: updates notifications by id
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: notification id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: The notification was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: notification was not found.
 *       500:
 *         description: Some errors happened.
 *
 */

notificationRouter.put("/:id", function (req, res) {
  try {
    var notification = _data["default"].find(function (notification) {
      return notification.id === +req.params.id;
    });

    notification.userId = req.body.userId;
    notification.title = req.body.title;
    notification.body = req.body.body;
    res.send(notification);
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * @swagger
 *  /notifications/{id}:
 *    delete:
 *      summary: removes notification from array
 *      tags: [Notifications]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: notification id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The notification was deleted
 *        404:
 *          description: The notification was not found
 *
 */

notificationRouter["delete"]("/:id", function (req, res) {
  var notification = _data["default"].find(function (notification) {
    return notification.id === +req.params.id;
  });

  var index = _data["default"].indexOf(notification);

  if (notification) {
    _data["default"].splice(index, 1);

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
var _default = notificationRouter;
exports["default"] = _default;