package org.example

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["http://localhost:3000"])
class ApplicationControler(
    private val productRepository: ProductRepository
) {

    @GetMapping("/products")
    fun getProducts(): List<Product> {
        return productRepository.findAll()
    }


    @PostMapping("/payments")
    fun buy(@RequestBody request: BuyRequest): Product {
        val product = productRepository.findById(request.productId)
            .orElseThrow { RuntimeException("Product not found") }

        if (product.quantity < request.quantity) {
            throw RuntimeException("Not enough stock")
        }

        product.quantity -= request.quantity

        return productRepository.save(product)
    }

    data class BuyRequest(
        val productId: Long,
        val quantity: Int
    )
}