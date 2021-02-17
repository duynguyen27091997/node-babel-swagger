import express from "express";
import data from "../data";
import bodyParser from "body-parser";

const notificationRouter = express.Router();
notificationRouter.use(bodyParser.json()); // to use body object in requests

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

notificationRouter.get("/", (req, res) => {
    res.send(data);
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

notificationRouter.get("/:id", (req, res) => {
    const notification = data.find((notification) => notification.id === +req.params.id);

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

notificationRouter.post("/", (req, res) => {
    try {
        const notification = {
            ...req.body,
            id: data.length + 1,
        };

        data.push(notification);

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

notificationRouter.put("/:id", (req, res) => {
    try {
        let notification = data.find((notification) => notification.id === +req.params.id);
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

notificationRouter.delete("/:id", (req, res) => {
    let notification = data.find((notification) => notification.id === +req.params.id);
    const index = data.indexOf(notification);

    if (notification) {
        data.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

export default notificationRouter;
