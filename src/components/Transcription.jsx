import React from 'react'

export default function Transcription(props) {
    const {textElement} = props;
    return (
        <div className='text-green-400 bg-black bg-opacity-60 border border-green-500 border-opacity-30 rounded-lg p-4 text-left shadow-inner'>
            {textElement}
        </div>
    )
}