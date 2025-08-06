import React, { useState, useEffect, useRef } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {
    const { output, finished } = props;
    const [tab, setTab] = useState('transcription');
    const [translation, setTranslation] = useState(null);
    const [toLanguage, setToLanguage] = useState('Select language');
    const [translating, setTranslating] = useState(null);
    console.log(output);

    const worker = useRef();

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
                type: 'module'
            })
        }

        const onMessageReceived = async (e) => {
            switch (e.data.status) {
                case 'initiate':
                    console.log('DOWNLOADING');
                    break;
                case 'progress':
                    console.log('LOADING');
                    break;
                case 'update':
                    setTranslation(e.data.output);
                    console.log(e.data.output);
                    break;
                case 'complete':
                    setTranslating(false);
                    console.log("DONE");
                    break;
            }
        }

        worker.current.addEventListener('message', onMessageReceived);

        return () => worker.current.removeEventListener('message', onMessageReceived);
    })

    const textElement = tab === 'transcription' ? output.map(val => val.text) : translation || ''

    function handleCopy() {
        navigator.clipboard.writeText(textElement);
    }

    function handleDownload() {
        const element = document.createElement("a");
        const file = new Blob([textElement], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Transcribe_${new Date().toString()}.txt`;
        document.body.appendChild(element);
        element.click();
    }

    function generateTranslation() {
        if (translating || toLanguage === 'Select language') {
            return;
        }

        setTranslating(true);

        worker.current.postMessage({
            text: output.map(val => val.text),
            src_lang: 'eng_Latn',
            tgt_lang: toLanguage
        });
    }

    return (
       <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 max-w-prose w-full mx-auto min-h-screen bg-gradient-to-br from-black via-green-900/20 to-black'>
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap text-green-400 drop-shadow-lg'>
                Your <span className='text-red-400 bold'>Transcription</span>
            </h1>

            <div className='grid grid-cols-2 sm:mx-auto bg-black rounded overflow-hidden items-center p-1 border-2 border-green-500 shadow-lg shadow-green-500/20'>
                <button onClick={() => setTab('transcription')} className={'px-4 rounded duration-200 py-1 ' + (tab === 'transcription' ? ' bg-green-500 bg-opacity-20 text-green-400 shadow-inner' : ' text-green-600 hover:text-green-400')}>
                    Transcription
                </button>
                <button onClick={() => setTab('translation')} className={'px-4 rounded duration-200 py-1  ' + (tab === 'translation' ? ' bg-green-500 bg-opacity-20 text-green-400 shadow-inner' : ' text-green-600 hover:text-green-400')}>
                    Translation
                </button>
            </div>
            <div className='my-8 flex flex-col-reverse max-w-prose w-full mx-auto gap-4'>
                {(!finished || translating) && (
                    <div className='grid place-items-center'>
                        <i className="fa-solid fa-microchip animate-spin text-green-400 text-xl"></i>
                    </div>
                )}
                {tab === 'transcription' ? (
                    <Transcription {...props} textElement={textElement} />
                ) : (
                    <Translation {...props} toLanguage={toLanguage} translating={translating} textElement={textElement} setTranslating={setTranslating} setTranslation={setTranslation} setToLanguage={setToLanguage} generateTranslation={generateTranslation} />
                )}
            </div>
            <div className='flex items-center gap-4 mx-auto'>
                <button onClick={handleCopy} title="Copy" className='bg-black border border-green-500 hover:text-red-400 duration-200 text-green-400 px-2 aspect-square grid place-items-center rounded shadow-md shadow-green-500/20'>
                   <i className="fa-regular fa-copy"></i>
                </button>
                <button onClick={handleDownload} title="Download" className='bg-black border border-green-500 hover:text-red-400 duration-200 text-green-400 px-2 aspect-square grid place-items-center rounded shadow-md shadow-green-500/20'>
                    <i className="fa-regular fa-download"></i>
                </button>
            </div>
        </main>
    )
}