import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { io } from 'socket.io-client'

import { api } from '../../services/api'
import { Message, MessageProps } from '../Message'

import { styles } from './styles'  


let messageQueue: MessageProps[] = []

const socket = io(String(api.defaults.baseURL))
socket.on('new_message', (newMessage) => {
  messageQueue.push(newMessage)
})


export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([])
  
  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>('/messages/last3')
      setCurrentMessages(messagesResponse.data)
    }

    fetchMessages()
  }, [])

  // socket.io
  useEffect(() => {
    const timer = setInterval(() => {
      if (messageQueue.length > 0) {
        setCurrentMessages(prevState => [
          messageQueue[0], 
          prevState[0], 
          prevState[1],
        ].filter(Boolean))
        messageQueue.shift()
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [])


  return(
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) => <Message key={message.id} data={message} />)}

    </ScrollView>
  )
}

