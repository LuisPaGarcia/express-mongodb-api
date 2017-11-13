"use strict"

const mongoose = require('mongoose')
const User = require('../modelos/user')
const service = require('../services/index')

function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
  })

  user.save( (err)=>{
      if(err)  res.status(500).send({message:`Error al crear el nuevo usuario ${err}`})
  })

  return res.status(200).send({token: service.createToken(user)})
}

function signIn(req, res) {
  User.find({
    email: req.body,

  }, (err,user)=>{
    if(err) return res.status(500).send({message:err})
    if(!user) return res.status(404).send({message: "no se ha encontrado el usuario"})

    req.user = user
    res.status(200).send({
      message: "te has logueado correctamente",
      token: service.createToken(user)
    })
  })
}

module.exports = {
  signUp,
  signIn
}