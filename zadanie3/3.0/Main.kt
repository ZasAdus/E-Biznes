package com.example

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.client.plugins.contentnegotiation.*
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class Body(
    val content: String? = null
)

val client = HttpClient(CIO) {
    install(ContentNegotiation) {
        json(Json{})
    }
}

suspend fun sendWebhook(url: String, body: Body) {
    client.post(url) {
        contentType(ContentType.Application.Json)
        setBody(body)
    }
}

fun main() = runBlocking {
    val webhook = System.getenv("WEBHOOK")
    val message = System.getenv("MESSAGE")
    sendWebhook(webhook, Body(content = message))
    client.close()
}
 