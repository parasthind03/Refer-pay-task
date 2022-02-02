const appRouter = require('express').Router()
const userController = require('./controllers/userController')

appRouter.post('/createUser', userController.createUser)
appRouter.post('/referUser/:referId', userController.referUser)
appRouter.post('/pay', userController.pay)

module.exports = appRouter