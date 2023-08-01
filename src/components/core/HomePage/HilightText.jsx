import React from 'react'

const HilightText = ({text}) => {
  return (
    <span className='font-bold text-transparent bg-clip-text bg-gradient-to-bl from-blue-750 via-blue-650 to-blue-550'>
        {text}
    </span>
  )
}

export default HilightText