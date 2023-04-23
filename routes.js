const express = require('express')
const router = express.Router()
const productsRouter = require('./products')
const cartsRouter = require('./carts')

router.use('/products', productsRouter)
router.use('/carts', cartsRouter)

module.exports = router
