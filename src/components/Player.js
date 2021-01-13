import React from 'react'
import ReactPlayer from 'react-player'

const Player = ({ url }) => {
  return <ReactPlayer
  className='react-player'
  url={url}
  controls={true}
  width='100%'
  height='100%'
  />
}

export default Player