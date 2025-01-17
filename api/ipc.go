package main

import (
	"log"

	ipc "github.com/james-barrow/golang-ipc"
)

const IPC_SOCKET_NAME = "zohoCrm"

func startIpcClient() {

	c, err := ipc.StartClient(IPC_SOCKET_NAME, nil)
	if err != nil {
		log.Println(err)
		return
	}

	for {

		message, err := c.Read()

		if err == nil {

			if message.MsgType == -1 {

				log.Println("client status", c.Status())

				if message.Status == "Reconnecting" {
					c.Close()
					return
				}

			} else {

				log.Println("Client received: "+string(message.Data)+" - Message type: ", message.MsgType)
				c.Write(5, []byte("GOLANG: Message from GO"))

			}

		} else {
			log.Println(err)
			break
		}
	}

	defer c.Close()

}

func startIpcServer() {
	s, err := ipc.StartServer(IPC_SOCKET_NAME, nil)
	if err != nil {
		log.Println("server error", err)
		return
	}

	log.Println("server status", s.Status())

	for {

		message, err := s.Read()

		if err == nil {

			if message.MsgType == -1 {

				if message.Status == "Connected" {

					log.Println("server status", s.Status())

					s.Write(1, []byte("GO SERVER - STARTED"))

				}

			} else {

				log.Println("GO SRV received: "+string(message.Data)+" - Message type: ", message.MsgType)

			}

		} else {
			break
		}
	}

	defer s.Close()
}
