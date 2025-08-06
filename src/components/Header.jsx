import React from 'react'

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 gap-4 border-b border-green-500 border-opacity-20">
            <a href='/'>
                <h1 className="font-medium text-green-400 text-shadow-sm">
                    <span>Transcribe</span>
                </h1>
            </a>
            <div className='gap-4 flex items-center'>
                <a href='/' className="flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-green-400 text-small">
                    <p>New</p>
                    <i className="fa-regular fa-plus"></i>
                </a>
            </div>
        </header>
    )
}
