import React, { useRef, useEffect } from 'react'

export default function FileDisplay(props) {
    const { handleAudioReset, file, audioStream, handleFormSubmission } = props
    const audioRef = useRef()

    useEffect(() => {
        if (!file && !audioStream) { return }
        if (file) {
            console.log('HERE FILE', file)
            audioRef.current.src = URL.createObjectURL(file)
        } else {
            console.log('EHER AUDIO', audioStream)
            audioRef.current.src = URL.createObjectURL(audioStream)
        }
    }, [audioStream, file])

    return (
        <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 w-full max-w-prose mx-auto'>
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl text-green-400 drop-shadow-lg'>
                Your <span className='text-red-400 bold'>File</span>
            </h1>
            <div className='flex flex-col text-left my-4 bg-black bg-opacity-80 border border-green-500 border-opacity-30 rounded-lg p-4 shadow-lg'>
                <h3 className='font-semibold text-green-400'>Name</h3>
                <p className='truncate text-green-300'>{file ? file?.name : 'Custom audio'}</p>
            </div>
            <div className='flex flex-col mb-2'>
                <audio ref={audioRef} className='w-full border border-green-500 border-opacity-50 rounded-lg' controls>
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className='flex items-center justify-between gap-4'>
                <button onClick={handleAudioReset} className='text-green-600 hover:text-red-400 duration-200'>
                    Reset
                </button>
                <button onClick={handleFormSubmission} className='specialBtn px-3 p-2 rounded-lg text-green-400 flex items-center gap-2 font-medium border border-green-500 shadow-md shadow-green-500/20'>
                    <p>Transcribe</p>
                    <i className="fa-solid fa-microchip"></i>
                </button>
            </div>
        </main>
    )
}
