package main

import (
	"fmt"
	"log"

	ipc "github.com/james-barrow/golang-ipc"
)

const Connected = "3"
const IPC_SOCKET_NAME = "zohoCrm"

func startIpcClient() {

	cli, err := ipc.StartClient(IPC_SOCKET_NAME, nil)
	if err != nil {
		log.Println(err)
		return
	}

	for {

		message, err := cli.Read()

		if err == nil {

			if message.MsgType == -1 {

				log.Println("client status", cli.Status())

				if message.Status == "Reconnecting" {
					cli.Close()
					return
				}

			} else {

				fmt.Printf("Client received: "+string(message.Data)+" - Message type: ", message.MsgType)
				cli.Write(5, []byte("GOLANG: Message from GO"))

			}

		} else {
			log.Println(err)
			break
		}
	}

	defer cli.Close()

}

func startIpcServer(c <-chan string) {
	s, err := ipc.StartServer(IPC_SOCKET_NAME, nil)
	if err != nil {
		log.Println("server error", err)
		return
	}

	log.Println("server status", s.Status())

	go func(s *ipc.Server) {
		for {
			messageToSend := <-c
			fmt.Println("About to send: %s", messageToSend)
			s.Write(1, []byte(messageToSend))
		}
	}(s)

	for {

		message, err := s.Read()
		if err == nil {

			if message.MsgType == -1 {

				if message.Status == "Connected" {

					log.Println("server status", s.Status())

				}

			} else {

				fmt.Printf("GO SRV received: "+string(message.Data)+" - Message type: %s \n", message.MsgType)

			}

		} else {
			break
		}
	}

	defer s.Close()
}
