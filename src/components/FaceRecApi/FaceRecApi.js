import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js"
import './FaceRecApi.css'
import 'tachyons'

const FaceRecApi = ({imageUrl}) =>{
  const imgRef = useRef();
  const canvasRef = useRef();
  const handleImage = async () =>{
      const detections = 
      await faceapi.detectAllFaces(imgRef.current,
                new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();
      console.log(detections.length)

      // draws a canvas around face's on the image
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
      
      faceapi.matchDimensions(canvasRef.current, {
          width: 940, height:650,
      })
      const resized = faceapi.resizeResults(detections,{
          width: 940, height:650,
      })

      faceapi.draw.drawDetections(canvasRef.current ,resized);
      // faceapi.draw.drawFaceLandmarks(canvasRef.current ,resized);
      // faceapi.draw.drawFaceExpressions(canvasRef.current ,resized);
  }

  // FaceApi.js content
  useEffect(() => {
    const loadModels = () =>{
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
        faceapi.nets.faceExpressionNet.loadFromUri("./models")
      ])
      .then(
        handleImage)
      //   setTimeout(()=>{
      //   imageUrl.length>0 ? handleImage() : console.log('loading...');
      //   if(imageUrl){ return handleImage }
      //   else{
      //     console.log('loading...',imageUrl);
      //    }
      // },5000))
      .catch((e)=>console.log(e,'here is the trouble'))
    };
    imgRef.current && loadModels();
    console.log(imgRef, imgRef.current, imageUrl)

    }, [])
    console.log('i am here',imageUrl);
    return(
        <div className="App">
            <div className="box imgWrap">
              <img 
                className="imageFit"
                crossOrigin="anonymous"
                width='500px' 
                height='auto'
                ref={imgRef}
                src="https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?cs=srgb&dl=pexels-adrienn-1537635.jpg&fm=jpg"
                // src={imgRef.current.currentSrc}
                // src={imageUrl}
                alt='faceDetectionImage'
                />
                <canvas ref={canvasRef} className="imageFit"/>
            </div>
        </div>
    )
}

export default FaceRecApi;