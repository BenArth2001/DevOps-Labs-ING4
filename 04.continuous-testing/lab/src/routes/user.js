const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - firstname
 *         - lastname
 *       properties:
 *         username:
 *           type: string
 *           description: The user's unique username
 *         firstname:
 *           type: string
 *           description: The user's first name
 *         lastname:
 *           type: string
 *           description: The user's last name
 *       example:
 *         username: sergkudinov
 *         firstname: Sergei
 *         lastname: Kudinov
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request - missing parameters
 */
userRouter
  .post('/', (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })
  /**
   * @swagger
   * /user/{username}:
   *   get:
   *     summary: Get a user by username
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: username
   *         schema:
   *           type: string
   *         required: true
   *         description: The user's username
   *     responses:
   *       200:
   *         description: User found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   */
  .get('/:username', (req, resp) => {
    const username = req.params.username
    userController.get(username, (err, res) => {
      let respObj
      if (err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(404).json(respObj)
      }
      respObj = {
        status: "success",
        data: res
      }
      resp.status(200).json(respObj)
    })
  })

module.exports = userRouter
