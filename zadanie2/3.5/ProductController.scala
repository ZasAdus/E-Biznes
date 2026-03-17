package controllers

import javax.inject._
import play.api.mvc._
import scala.collection.mutable.ListBuffer
import play.api.libs.json._
import play.api.libs.json.Json

case class Product(id: Int, name: String, price: Int)

object Product {
  implicit val productFormat = Json.format[Product]
}

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  val products = ListBuffer(
    Product(1, "Rower", 2000),
    Product(2, "Samochod", 150000),
    Product(3, "Komputer", 6000)
  )

  def index = Action {
    Ok(Json.toJson(products))
  }

  def getById(id: Int) = Action {
    products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound(s"Nie znaleziono produktu o id=$id")
    }
  }

  def add = Action(parse.json) { request =>
    request.body.validate[Product].fold(
      errors => BadRequest("Niepoprawny JSON"),
      product => {
        products += product
        Created(Json.toJson(product))
      }
    )
  }

  def update(id: Int) = Action(parse.json) { request =>
    request.body.validate[Product].fold(
      errors => BadRequest("Niepoprawny JSON"),
      updatedProduct => {
        products.indexWhere(_.id == id) match {
          case -1 => NotFound(s"Nie znaleziono produktu o id=$id")
          case index =>
            products.update(index, updatedProduct)
            Ok(Json.toJson(updatedProduct))
        }
      }
    )
  }
  
  def delete(id: Int) = Action {
    products.indexWhere(_.id == id) match {
      case -1 => NotFound(s"Nie znaleziono produktu o id=$id")
      case index =>
        products.remove(index)
        Ok(s"Usunięto produkt o id=$id")
    }
  }
}