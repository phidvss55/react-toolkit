import React from 'react'
import "./message.css"
import * as timeago from 'timeago.js'

const Message = (props) => {
  const { own, message } = props
  return (
    <div className={ own ? 'message own' : 'message'}>
      <div className="messageTop">
        <img 
          className="conversationImg"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Somethign special"
        />
        <div className="messageText">{message.text}</div>
      </div>
      <div className="messageTop"><span>{ timeago.format(message.createdAt) }</span></div>
    </div>
  )
}

export default Message;