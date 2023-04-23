const express = require('express')
const fs = require('fs')
const router = express.Router()
const products = require('../data/products.json')

// Exportar productos a JSON
const exportProductsToJSON = (fileName) => {
  const productsJSON = JSON.stringify(products)
  const filePath = 'data/products.json'
  fs.truncate(filePath, 0, () => {
    fs.writeFile(filePath, productsJSON, (err) => {
      if (err) {
        throw new Error(`Error writing file ${err}`)
      } else {
        console.log(`Products have been successfully added to the file ${fileName}`)
      }
    })
  })
}

// Listado de todos los productos
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit)
  if (!limit) {
    res.json(products)
  } else {
    res.json(products.slice(0, limit))
  }
})

// Buscar producto por ID
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id)
  const product = products.find((product) => product.id === productId)

  if (!product) {
    res.status(404).send('Product not found')
  } else {
    res.json(product)
  }
})

// Crear nuevo producto
router.post('/', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
  }
  products.push(newProduct)
  res.status(201).json(newProduct)
  exportProductsToJSON('data/products.json')
})

// Actualizar producto existente
router.put('/:id', (req, res) => {
  const productId = parseInt(req.params.id)
  const productIndex = products.findIndex((product) => product.id === productId)

  if (productIndex === -1) {
    res.status(404).send('Product not found')
  } else {
    const updatedProduct = {
      id: productId,
      ...req.body
    }
    products[productIndex] = updatedProduct
    res.json(updatedProduct)
    exportProductsToJSON('data/products.json')
  }
})

// Eliminar producto existente
router.delete('/:id',
