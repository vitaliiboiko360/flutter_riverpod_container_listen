package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

const HOST_ADDR = "0.0.0.0:3003"

func main() {
	r := gin.Default()

	channel := make(chan string)

	r.GET("/account", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": "true",
		})
	})

	r.POST("/account", func(c *gin.Context) {
		accountName := c.PostForm("accountName")
		accountWebsite := c.PostForm("accountWebsite")
		accountPhone := c.PostForm("accountPhone")

		fmt.Printf("ACCOUNT: name: %s; website: %s; phone: %s", accountName, accountWebsite, accountPhone)

		requestData := accountMessage{
			Name:    accountName,
			Website: accountWebsite,
			Phone:   accountPhone,
		}
		requestJson, error := json.Marshal(requestData)
		fmt.Println("requestJson == %s", string(requestJson[:]))
		if error == nil {
			channel <- string(requestJson[:])
		}

		c.JSON(http.StatusOK, gin.H{
			"success": "true",
		})
	})

	r.POST("/deal", func(c *gin.Context) {
		dealName := c.PostForm("dealName")
		dealStage := c.PostForm("dealStage")

		fmt.Printf("DEAL: name: %s; stage: %s", dealName, dealStage)
		c.JSON(http.StatusOK, gin.H{
			"success": "true",
		})
	})

	go startIpcServer(channel)

	r.Run(HOST_ADDR) // listen and serve on 0.0.0.0:3003
}
