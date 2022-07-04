import React from 'react'

const Input = (props) => {
  const { labelName, data, setData, isTextArea = false, classStyle = "input-about" } = props;
  return (
    <>
      <label htmlFor="">{labelName}</label>
      {isTextArea ? (
         <textarea placeholder="Enter your about" className={classStyle} value={data} onChange={(e) => setData(e.target.value)}/> 
      ) : (
        <input type="text" placeholder="" className={classStyle} value={data} onChange={(e) => setData(e.target.value)} />
      )}
    </>
  )
}

export default Input;