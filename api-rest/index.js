"use strict"

const env = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 1200

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product',(req,res)=>{
  res.status(200).send({message:[]})
})

app.get('/api/product/:productId',(req,res)=>{

})

app.post('/api/product',(req,res)=>{
  console.log(req.body)
  res.status(200).send({message:"El producto se ha recibido"})
})

app.put('/api/product/:productId',(req,res)=>{

} )

app.delete('/api/product/:productId',(req,res)=>{

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

