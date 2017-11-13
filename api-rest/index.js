"use strict"

const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 1200


mongoose.connect(`${process.env.MONGODB}`, (err,res)=>{
    if(err){
      console.log(`Error en la conexion a mongo ${err}`)
    }

    console.log('Conexion a mongo ok')

    app.listen(port, () => {
      console.log(`Corriendo en  el puerto ${port}`);
    })
})

