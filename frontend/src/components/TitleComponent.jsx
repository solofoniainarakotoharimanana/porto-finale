import React from 'react'

const TitleComponent = ({ title }) => {
    return (
        <h1 className='text-center 
            bg-linear-to-b from-red-300
            to-pink-600 bg-clip-text text-transparent
            uppercase text-4xl font-bold my-6 text-shadow-2xs'>
            {title}
        </h1>
    )
}

export default TitleComponent
