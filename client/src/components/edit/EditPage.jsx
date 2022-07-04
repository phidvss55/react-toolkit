import React from 'react'
import Input from '../Input/Input';
import "./edit.css"
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/apiRequest';

const EditPage = (props) => {
  const dispatch = useDispatch();
  const { setEdit } = props;
  const avaUrl = [
    'https://api.lorem.space/image/movie?w=150&h=220',
    'https://api.lorem.space/image/game?w=150&h=220',
    'https://api.lorem.space/image/album?w=150&h=150',
    'https://api.lorem.space/image/book?w=150&h=220',
    'https://api.lorem.space/image/face?w=150&h=150',
    'https://api.lorem.space/image/fashion?w=150&h=150',
    'https://picsum.photos/200/300?random', 
  ];

  const user = useSelector(state => state.user);
  const [url, setUrl] = React.useState(user.url);
  const [name, setName] = React.useState(user.name);
  const [age, setAge] = React.useState(user.age);
  const [about, setAbout] = React.useState(user.about);
  const [theme, setTheme] = React.useState(user.theme);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false)
    const newUser = { 
      url: url,
      name: name,
      age: age,
      about: about,
      theme: theme,
    }
    updateUser(newUser, dispatch)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="edit-container">
          <button className="close"> Save </button>
          
          <div className="edit-profile">Edit Profile</div>
          <div className="input-container">
            <Input labelName="Display Name" data={name} setData={setName} isTextArea={false} />
            <Input labelName="Age" data={age} setData={setAge} isTextArea={false} />
            <Input labelName="About" data={about} setData={setAbout} isTextArea={true} />

            <label> Profile Picture</label>
            <div className="input-image-container">
              {avaUrl.map((url, index) => (
                <img key={index} src={url} alt="" className="input-image" onClick={(e) => setUrl(e.target.src)} />
              ))}
            </div>

            <div className="theme-container">
              <label htmlFor="Theme">Theme</label>
              <input type="color" className="theme-color" value={theme} onChange={(e) => setTheme(e.target.value)} />
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export default EditPage;