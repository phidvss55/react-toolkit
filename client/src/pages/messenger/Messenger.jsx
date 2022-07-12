import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import "./messenger.css";

const Messenger = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState('');
  const [arrivalMessage, setArrivalMessage] = React.useState(null)
  const socket = useRef();
  const scrollRef = useRef()

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', data => {
      setArrivalMessage({ 
        sender: data.senderId,
        text: data.text,
        createdAt: new Date().getTime(),
        _id: new Date().getTime()
      })
    })
  }, []);

  useEffect(() => {
    socket.current.emit('addUser', user._id)
    socket.current.on('getUsers', users => {
      console.log(users)
    })
  }, [user])

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages([...messages, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    const getMessages = async() => {
      const res = await axios.get("/messages/" + currentChat?._id);
      setMessages(res.data);
    };

    getMessages();
  }, [currentChat?._id])

  useEffect(() => {
    const getConversations = async () => {
      const res = await axios.get('/conversations/' + user._id);
      setConversations(res.data);
    }

    getConversations();
  }, [user._id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim().length > 0) {
      return;
    }
    const message = {
      sender: user._id,
      conversationId: currentChat?._id,
      text: newMessage
    };

    const receiverId = currentChat.members.find(member => member !== user._id);

    socket?.current.emit('sendMessage', {
      senderId: user._id, 
      receiverId,
      text: newMessage,
    })


    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" className="chatMenuInput" placeholder="Search for friends" />
            {conversations.map((conversation) => (
              <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
                <Conversation key={conversation._id} conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div key={message._id} ref={scrollRef}>
                      <Message key={message._id} message={message} own={message.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea 
                    placeholder="Write something ..." 
                    className="chatMessageInput" 
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        handleSubmit(event);
                      }
                    }}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                </div>
              </>
            ) : (
              <span className="noConversationText">Open a conversation to start a chat</span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
