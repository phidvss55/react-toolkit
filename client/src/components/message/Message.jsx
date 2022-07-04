import React from 'react'
import "./message.css"

export default function Message(props) {
  const { own } = props
  return (
    <div className={ own ? 'message own' : 'message'}>
      <div className="messageTop">
        <img 
          className="conversationImg"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Somethign special"
        />
        <div className="messageText">Hello this is sample message</div>
      </div>
      <div className="messageTop">
        12:00
      </div>
    </div>
  )
}
