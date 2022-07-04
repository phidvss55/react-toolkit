import React from 'react'
import Input from '../Input/Input';
import "./post.css";
import { generateColor } from "../../utils"
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/postSlice.js';

const Post = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState('Please add a title');
  const [about, setAbout] = React.useState('Please add a description');
  const [selectedIndx, setSelectedIndx] = React.useState(0);
  const tags = useSelector(state => state.post.tags);

  const handlePost = () => {
    props.setIsOpenPost(false);
    const newPost = {
      title: title,
      description: about,
      tag: selectedIndx,
    }
    dispatch(createPost(newPost));
  }

  return (
    <div>
      <section className="makepost-container">
        <div className="makepost-navigation">
          <p className="makepost-save" onClick={handlePost}>Save</p>
        </div>
        <Input labelName="Add a title" data={title} setData={setTitle} isTextArea="true" classStyle="makepost-title" />
        <Input labelName="Add a description" data={about} setData={setAbout} isTextArea="true" classStyle="makepost-desc" />
        <label htmlFor="Tag">Tags</label>
        <div className="makepost-tags">
          {tags.map((tag, index) => {
            return (parseInt(index) === parseInt(selectedIndx)) ? (
              <button className="makepost-tags-selected" key={index}>{tag}</button>
            ) : (
              <button className="makepost-tags" style={{backgroundColor: generateColor()}} key={index} onClick={(e) => setSelectedIndx(index)}>{tag}</button>
            )
          })}
        </div>

      </section>
    </div>
  )
}

export default Post;