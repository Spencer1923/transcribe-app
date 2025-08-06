import React from 'react'
import {LANGUAGES} from '../utils/presets'

export default function Translation(props) {
    const { textElement, toLanguage, translating, setToLanguage, generateTranslation } = props;
    return (
        <div className='flex flex-col gap-2 max-w-[400px] w-full mx-auto'>
            {!translating && (
                <div className='flex flex-col gap-1'>
                    <p className='text-xs sm:text-sm font-medium text-green-600 mr-auto'>To language</p>
                    <div className='flex items-stretch gap-2'>
                        <select className='flex-1 outline-none bg-black border border-green-500 border-opacity-50 hover:border-green-400 duration-200 p-2 rounded text-green-400' value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
                            <option value='Select language'>Select language</option>
                            {Object.entries(LANGUAGES).map(([key,value]) =>{
                                return (
                                    <option key={key} value={value}>{key}</option>
                                )
                            })}
                        </select>
                        <button onClick={generateTranslation} className='specialBtn px-3 py-2 rounded-lg text-green-400 hover:text-red-400 duration-200 border border-green-500'>
                            Translate
                        </button>
                    </div>
                </div>
            )}
            {textElement && !translating && (
                <div className='text-green-400 bg-black bg-opacity-60 border border-green-500 border-opacity-30 rounded-lg p-4 text-left shadow-inner'>
                    <p>{textElement}</p>
                </div>
            )}
            {translating && (
                <div className='grid place-items-center bg-black bg-opacity-60 border border-green-500 border-opacity-30 rounded-lg p-8'>
                    <i className="fa-light fa-language animate-spin text-green-400 text-xl"></i>
                </div>
            )}
        </div>
    )
}