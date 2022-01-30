import React, { useState } from 'react'
import { View, TextInput, Alert, Keyboard } from 'react-native'
import { api } from '../../services/api'

import { Button } from '../Button'
import { COLORS } from '../../theme'

import { styles } from './styles'  


export function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)


  async function handleMessageSubmit() {
    const messageFormatted = message.trim()

    if (messageFormatted.length > 0) {
      setSendingMessage(true)
      await api.post('/messages', { message: messageFormatted }) 

      setMessage('')
      Keyboard.dismiss()
      setSendingMessage(false)
      Alert.alert('Mensagem enviada com sucesso!')
    } 
    else {
      Alert.alert('Mensagem em branco. Por favor escreva uma mensagem!')
    }
  }


  return(
    <View style={styles.container}>
  
      <TextInput 
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />
      
      <Button 
        title="ENVIAR MENSAGEM" 
        backgroundColor={COLORS.PINK} 
        color={COLORS.WHITE} 
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />

    </View>
  )
}

