import { useContext, useEffect, useState, FormEvent } from 'react'
import { VscSignOut, VscGithubInverted } from 'react-icons/vsc'
import { toast } from 'react-toastify'

import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api'

import styles from './styles.module.scss'

import seal from '../../assets/seal.svg'


export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext)
  const [ message, setMessage ] = useState('')


  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      toast("Campo Mensagem em braco!", {
        type: 'warning',
        theme: 'colored',
      })

      return; 
    }

    await api.post('messages', { message })

    setMessage('')

    toast("Mensagem enviada com sucesso!", {
      type: 'success',
      theme: 'colored',
    })
 }


  return (

    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut}  className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>  

      <img src={seal} alt="Selo Rocktseat" className={styles.seal} />
      
      <span className={styles.success}>Mensagem enviada com sucesso!</span>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url}  alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea 
          id="message" 
          name="message"
          placeholder="Qual é sua expectativa para o evento?"
          onChange={event => setMessage(event.target.value)}
          value={message}
        />
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}
