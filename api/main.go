package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

const ADDRESS = "0.0.0.0:3003"

func main() {
	r := gin.Default()

	r.GET("/account", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": "true",
		})
	})

	r.POST("/account", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": "true",
		})
	})

	r.POST("/deal", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": "true",
		})
	})

	r.Run(ADDRESS) // listen and serve on 0.0.0.0:3003
}
