import React from 'react'

export const modules = {
  toolbar: {
    container: '#toolbar',
  },
}

export const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'link',
  'list',
  'blockquote',
  'code-block',
]

const CustomToolbar = () => {
  const buttonStyle = {
    height: '100%', // Set the button height to match the toolbar height
    marginRight: '5px', // Add some spacing between buttons
  }

  return (
    <div id='toolbar'>
      <select
        className='ql-header'
        defaultValue=''
        onChange={(e) => e.persist()}
      >
        <option value='1'>Heading 1</option>
        <option value='2'>Heading 2</option>
        <option value='3'>Heading 3</option>
        <option value=''>Normal</option>
      </select>
      <button className='ql-bold' style={buttonStyle}>
        Bold
      </button>
      <button className='ql-italic' style={buttonStyle}>
        Italic
      </button>
      <button className='ql-underline' style={buttonStyle}>
        Underline
      </button>
      <button className='ql-link' style={buttonStyle}>
        Link
      </button>
      <button className='ql-list' value='ordered' style={buttonStyle}>
        Ordered List
      </button>
      <button className='ql-list' value='bullet' style={buttonStyle}>
        Bullet List
      </button>
      <button className='ql-blockquote' style={buttonStyle}>
        Blockquote
      </button>
      <button className='ql-code-block' style={buttonStyle}>
        Code Block
      </button>
    </div>
  )
}

export default CustomToolbar
