import React from 'react'

function Box({val,play,idx }) {
  return (
    <div onClick={(e)=>play(e,idx)}>{val}</div>
  )
}

export default Box