package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.POST("/products", add)
	e.GET("/products", getAll)
	e.GET("/products/:id", get)
	e.PUT("/products/:id", update)
	e.DELETE("/products/:id", delete_)
	e.Logger.Fatal(e.Start(":8080"))
}

type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

var products = map[int]Product{
	1: {ID: 1, Name: "apple", Price: 2},
	2: {ID: 2, Name: "bannana", Price: 3},
	3: {ID: 3, Name: "pineapple", Price: 7},
}
var nextID = 4

func add(c echo.Context) error {
	var p Product
	if err := c.Bind(&p); err != nil {
		return c.JSON(http.StatusBadRequest, "Wrong JSON")
	}
	p.ID = nextID
	nextID++
	products[p.ID] = p
	return c.JSON(http.StatusCreated, p)
}

func getAll(c echo.Context) error {
	list := make([]Product, 0, len(products))
	for _, p := range products {
		list = append(list, p)
	}
	return c.JSON(http.StatusOK, list)
}

func get(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID")
	}

	p, exists := products[id]
	if !exists {
		return c.JSON(http.StatusNotFound, "Invalid ID")
	}

	return c.JSON(http.StatusOK, p)
}

func update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID")
	}

	if _, exists := products[id]; !exists {
		return c.JSON(http.StatusNotFound, "Invalid ID")
	}

	var updated Product
	if err := c.Bind(&updated); err != nil {
		return c.JSON(http.StatusBadRequest, "Wrong JSON")
	}

	updated.ID = id
	products[id] = updated

	return c.JSON(http.StatusOK, updated)
}

func delete_(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID")
	}

	if _, exists := products[id]; !exists {
		return c.JSON(http.StatusNotFound, "Invalid ID")
	}

	delete(products, id)
	return c.JSON(http.StatusOK, "Product deleted")
}
