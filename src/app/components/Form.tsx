"use client"
import {useState} from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';

const getButtonStyle = (isDisabled: boolean): string => 
    isDisabled ? 
        'text-white bg-blue-200 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center' : 
        'text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'

const Form = () => {
    const [text, setText] = useState('');
    const [code, setCode] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setCode(undefined);
        const result = await fetch('/type', {
            method: 'POST',
            body: JSON.stringify({text})
        });
        const json = await result.json();
        json.success && setCode(json.result);
        setIsLoading(false);
    }

    const isDisabled = text === '' || isLoading;

    return (
        <div className="flex w-full max-w-screen-md flex-col items-center">
            <textarea className='m-3 w-full border-blue-500 border-2 rounded-md' rows={10} value={text} onChange={e => setText(e.target.value)}/>
            <button type='button' className={getButtonStyle(isDisabled)} onClick={handleSubmit} disabled={isDisabled}>{isDisabled ? 'Type Something': 'Submit'}</button>
            {code ? <div className='mt-3 w-full rounded-md'>
            <SyntaxHighlighter language='typescript'>
                {code}
            </SyntaxHighlighter>
                </div> : null}
        </div>
    )
}

export default Form;