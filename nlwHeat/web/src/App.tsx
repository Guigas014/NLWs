import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'

import styles from './App.module.scss'
import 'react-toastify/dist/ReactToastify.css'

import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import { SendMessageForm } from './components/SendMessageForm'
import { AuthContext } from './contexts/auth'


 export function App() {
  const { user } = useContext(AuthContext)


  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList />
      { !!user ? <SendMessageForm /> : <LoginBox /> }   
      <ToastContainer />
    </main>
  )
}

