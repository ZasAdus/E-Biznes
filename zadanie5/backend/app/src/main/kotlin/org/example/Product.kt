package org.example

import jakarta.persistence.*

@Entity
@Table(name = "products")
class Product(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    var name: String = "",
    var price: Double = 0.0,
    var quantity: Int = 0
)