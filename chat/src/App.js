import React, { useState, useEffect } from 'react'

export default function App () {
    const [MessageList, setMessageList] = useState([]) // Список повідомлень
    const [text, setText] = useState('')
    const [socket, setSocket] = useState(null)

    // Встановлення WebSocket-з'єднання при зантаженні сторінки
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080') // Підключення до WebSocket-сервера
        setSocket(ws) // Зберігаємо інстанс сокету

        // Обробка отриманих повідомлень
        ws.onmessage = (socket) => {
            
            const data = JSON.parse(socket.data)
            setMessageList((sendedMsg) => [...sendedMsg, data]) 
        }
    }, [])

    // Відправка повідомлення
    const sendMessage = () => {
      if (!text.length > 0) return // Відхиляємо пусті повідомлення 
        socket.send(JSON.stringify({text})) // Відправляємо повідомлення через WebSocket
        setText('') // Завершуємо відправку і очищаємо текст з поля
    }

    return <div>
            <h1>SimpleChat</h1>
            {/* Відображення повідомлень */}
            <ul>
                {MessageList.map((msg, i) => ( <li key={i}>{msg.text}</li> ))}
            </ul>

            {/* Ввод користувача */}
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введіть повідомлення"
            />
            <button onClick={sendMessage}>Відправити</button>
    </div>
}
