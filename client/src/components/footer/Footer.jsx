import React from 'react'
import "./footer.css"

const Footer = (props) => {
  const { isOpenPost, setIsOpenPost } = props;
  return (
    <footer>
      <div className="footer-title" onClick={(e) => setIsOpenPost(!isOpenPost)}>
        { isOpenPost ? 'Close' : 'Open' }
      </div>
    </footer>
  )
}

export default Footer;