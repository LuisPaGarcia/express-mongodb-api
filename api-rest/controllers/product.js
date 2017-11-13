const Product = require('../modelos/products.js')


function getProducts(req, res){
  Product.find({}, (err,products)=>{
    if(err) return res.status(500).send({message:`Error al consultar el producto ${err}`})
    if(!products) return res.status(404).send({message:`No existen productos`})

    res.status(200).send({products})
  } )
}

function getProduct(req,res){

  let productId = req.params.productId

  if(!productId) return res.status(404).send({message:`No ha enviado un ID`})


      Product.findById(productId, (err,product)=>{
        if(err) return res.status(500).send({message:`Error al consultar el producto ${err}`})
        if(!product) return res.status(404).send({message:`El producto no existe`})

        res.status(200).send({product})
      })
}

function saveProduct(req,res){
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
}

function updateProduct(req,res){
  let productId = req.params.productId
  if(!productId) return res.status(404).send({message:`No ha enviado un ID`})

  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated)=>{
    if(err) return res.status(500).send({message:`Error al actualizar la medicina ${err}`})

    res.status(200).send({message: `Actualizado con exito`})
  } )
}

function deleteProduct(req,res){
  let productId = req.params.productId
  if(!productId) return res.status(404).send({message:`No ha enviado un ID`})

        Product.findById(productId, (err,product)=> {
          if(err) return res.status(500).send({message:`Error al borrar el producto ${err}`})

          product.remove(err=>{
            if(err) return res.status(500).send({message:`Error al borrar el producto ${err}`})
            res.status(200).send({message:`Se ha eliminado la medicina!`})
          })
        })
}

module.exports ={
  getProduct,
  getProducts,
  updateProduct,
  saveProduct,
  deleteProduct
}