import React from 'react'
import { useSelector } from 'react-redux';
import { generateColor } from '../../utils';

const PostListing = () => {
  const posts = useSelector(state => state.post.posts);
  const tags = useSelector(state => state.post.tags);

  return (
    <div>
      <section className="post-container">
        {posts.map((post, index) => {
          return (
            <div key={index} className="posts">
              <div className="posts-title">{post.title}</div>
              <div className="posts-description">{post.description}</div>
              <div className="posts-tags" style={{ backgroundColor: generateColor() }}>{tags[post.tag]}</div>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default PostListing;