import { useState } from 'react'
import styles from '@/styles/Chat.module.css'

export default function Chat() {
  const [messages, setMessages] = useState([])

  const handleSendMessage = (event) => {
    event.preventDefault()
    const message = event.target.elements.message.value.trim()
    if (message) {
      setMessages([...messages, message])
      event.target.elements.message.value = ''
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.chat}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className={styles.form}>
        <input type="text" name="message" placeholder="Type a message..." className={styles.input} />
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </div>
  )
}
