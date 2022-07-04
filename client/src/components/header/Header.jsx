import React from 'react'
import "./header.css"
import { useSelector } from 'react-redux';

export default function Header(props) {
  const setEdit = props.setEdit;
  const user = useSelector(state => state.user);


  const handleEdit = () => {
    setEdit(true);
  }


  return (
    <div>
      <header style={{
        backgroundColor: `${user.theme}`,
        backgroundImage: `linear-gradient(165deg, ${user.theme} 0%, ${user.theme} 50%, #BFD641 75%)`,
      }}>
        <div className="info-container">
          <div className="info-edit" onClick={handleEdit}>
            Edit
          </div>
          <img src={user.url} alt={user.name} className="info-ava" />
          <div className="info-username">{user.name}</div>
          <div className="info-age">{user.age} years old</div>
          <div className="info-about">{user.about}</div>
        </div>
      </header>
    </div>
  )
}
