"use strict"

const env = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./modelos/products.js')

const app = express()
const port = process.env.PORT || 1200

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product',(req,res)=>{
  Product.find({}, (err,products)=>{
    if(err) return res.status(500).send({message:`Error al consultar el producto ${err}`})
    if(!products) return res.status(404).send({message:`No existen productos`})

    res.status(200).send({products})
  } )
})

app.get('/api/product/:productId',(req,res)=>{
  let productId = req.params.productId

    Product.findById(productId, (err,product)=>{
      if(err) return res.status(500).send({message:`Error al consultar el producto ${err}`})
      if(!product) return res.status(404).send({message:`El producto no existe`})

      res.status(200).send({product})
    })
})

app.post('/api/product',(req,res)=>{
  console.log(` POST /api/product `)
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err,productoGuardado)=>{
    if(err) res.status(500).send({message:`error al guardar en la base de datos ${err}`})

    res.status(200).send({product:productoGuardado})
  })
})

app.put('/api/product/:productId',(req,res)=>{
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated)=>{
    if(err) return res.status(500).send({message:`Error al actualizar la medicina ${err}`})

    res.status(200).send({message: `Actualizado con exito`})
  } )
})

app.delete('/api/product/:productId',(req,res)=> {
  let productId = req.params.productId

      Product.findById(productId, (err,product)=> {
        if(err) return res.status(500).send({message:`Error al borrar el producto ${err}`})

        product.remove(err=>{
          if(err) return res.status(500).send({message:`Error al borrar el producto ${err}`})
          res.status(200).send({message:`Se ha eliminado la medicina!`})
        })
      })
} )

mongoose.connect(`${process.env.MONGODB}`, (err,res)=>{
    if(err){
      console.log(`Error en la conexion a mongo ${err}`)
    }

    console.log('Conexion a mongo ok')

    app.listen(port, () => {
      console.log(`Corriendo en  el puerto ${port}`);
    })
})

