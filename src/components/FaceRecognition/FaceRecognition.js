import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box, loading}) =>{
    return(

    <div className="center inputimage-div">
        {/* { loading ? 
        <div>Loading</div>
        : */}
        <div className="center pa3" style={{position: "relative"}}>
            <img 
            className="center"
            id='inputimage'
            alt='faceImage' 
            src={imageUrl} 
            width='500px' 
            height='auto'/>
            {box && box.map( ibox =>
                <div 

                key= {`ibox${ibox.topRow}${ibox.rightCol}`}
                className="bounding-box" 
                // style={{top:box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                style={{top:ibox.topRow, right:ibox.rightCol, bottom: ibox.bottomRow, left: ibox.leftCol}}>
            </div>
            )}
        </div>
{/* } */}
    </div>
    )
}

export default FaceRecognition;

// const USER_ID = 'pats';
//     // Your PAT (Personal Access Token) can be found in the portal under Authentification
//     const PAT = '7fff50932b7e4bd7adeca71ae78175c8';
//     const APP_ID = 'face-recognition-app';
//     // Change these to whatever model and image URL you want to use
//     const MODEL_ID = 'general-image-recognition';
//     const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
//     const IMAGE_URL = 'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?cs=srgb&dl=pexels-adrienn-1537635.jpg&fm=jpg';

//     ///////////////////////////////////////////////////////////////////////////////////
//     // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
//     ///////////////////////////////////////////////////////////////////////////////////

//     const raw = JSON.stringify({
//         "user_app_id": {
//             "user_id": USER_ID,
//             "app_id": APP_ID
//         },
//         "inputs": [
//             {
//                 "data": {
//                     "image": {
//                         "url": IMAGE_URL
//                     }
//                 }
//             }
//         ]
//     });

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': 'Key ' + PAT
//         },
//         body: raw
//     };

//     // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
//     // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
//     // this will default to the latest version_id

//     fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
//         .then(response => response.text())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));