import axios from 'axios';
import React, { useEffect } from 'react'
import "./conversation.css"

function Conversation(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { conversation, currentUser } = props;
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const getDetailUser = async () => {
      const user = conversation.members.find(item => item !== currentUser._id);
      if (user) {
        const res = await axios.get('/users?userId=' + user);
        setUser(res.data);
      }  
    }

    getDetailUser()
    
  }, [conversation, currentUser])

  return (
    <div className="conversation">
      <img 
        className="conversationImg"
        src={ user ? user.profilePicture : PF+'person/noAvatar.png' }
        alt="Somethign special"
      />
      
      <div className="conversationName">{ user?.username }</div>
    </div>
  )
}

export default Conversation;