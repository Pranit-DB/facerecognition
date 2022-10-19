import React from 'react';
// import {useState, useEffect} from "react";

import './ImageLinkForm.css';

const ImageLinkForm = (
    { onInputChange, onButtonSubmit }
    )=>{
        // const [ input, setInput ] = useState('');
    
        // const [ imageUrl, setImageUrl ] = useState('');
    
        // const inputEvent = (e)=>{
        //     e.preventDefault();
        //     gettingInput(e.target.value) 
        // };

        // // Button to add todo
        // const gettingInput = ( input ) => {
        //     setInput({ input });
        // }
        // const settingUrl = () => {
        //     let newImageUrl = Object.values(input)[0];
        //     setImageUrl( newImageUrl );
        //     // console.log(imageUrl);
        // }

    // Takes callback() as input and every time the component changes
    //  it'll always render.
        // useEffect(() => {
            // console.log('use Effect in action ',Object.values(input)[0]);
        // },[]) // only runs when todo's changes

        // useEffect(() => {
        //     console.log('use Effect in url ', imageUrl);
        // },[imageUrl])// only runs when count changes
    
    return(
        <div>
            <p className="f3">
                {'Face Recognition App is the app that detects faces from pictures. Give it a Try'}
            </p>
            <div className="toCenter">
                <div className="form pa4 br3 shadow-5 ">
                    <input className="f4 pa2 w-70 center" type='text'
                     onChange={onInputChange}
                    //  onChange={ (e)=> setImageUrl(e.target.value) }
                    //  onChange={ inputEvent }
                        // (e)=>gettingInput(e.target.value) 
                     />
                    <button 
                    className="w-30 grow f4 link ph3 pv2 dib white bg-dark-blue"
                    onClick={ onButtonSubmit }
                    // onClick={settingUrl}
                    >Detect </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;