#!/bin/bash

cd ~
sbt new playframework/play-scala-seed.g8 --name=sklep
cd sklep

cat > app/controllers/ProductController.scala << 'EOF'
package controllers

import javax.inject._
import play.api.mvc._

case class Product(id: Int, name: String, price: Int)

class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
   val products = List(
    Product(1, "Rower", 2000),
    Product(2, "Samochod", 150000),
    Product(3, "Komputer", 6000)
  )

  def index = Action {
    val result = products.map(p => s"${p.name}: ${p.price} zl").mkString("\n")
    Ok(result)
  }
}
EOF

printf "\nGET   /products   controllers.ProductController.index\n" >> conf/routes

sbt run