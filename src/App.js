import React, { Component, useEffect, useState } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import ParticleBackground from "./components/Particles/Particle";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import './App.css';
// import { ClarifaiStub, grpc } from 'clarifai-nodejs-grpc';

// const Clarifai = require( 'clarifai')
// import Clarifai from 'clarifai'
// import FaceRecApi from "./components/FaceRecApi/FaceRecApi";

// console.log(Clarifai);
// const app = new Clarifai.App({
//   apiKey:'9d0a34e1f8ba4f08b2ea3d16f2bf2c88'
// });

                        // class App extends Component {
                        //   constructor(){
                        //     super();
                        //     this.state = {
                        //       input: '',
                        //       imageUrl:'',
                        //       box:{},

                        //     };
                        //   }

  // function App(){
    
  //  var calculateFaceLocation = (data)=>{
  //     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  //     const image = document.getElementById('inputimage');
  //     const width = Number(image.width);
  //     const height = Number(image.height);
  //     console.log(width,height);
  //     return {
  //       leftCol: clarifaiFace.left_col * width,
  //       topRow: clarifaiFace.top_row * height,
  //       rightCol: width - (clarifaiFace.right_col * width),
  //       bottomRow: height - (clarifaiFace.bottom_row * height),
  //     }
  //   }

  //   var displayFaceBox = (box) =>{
  //     console.log(box);
  //     this.setState({box:box})
  //   }
    // const [input, setInput] = useState('');
    // const [imageUrl, setImageUrl] = useState('');

    // useEffect(()=>{
    //   const getImage = () => {
    //     const img = new Image();
    //     img.src = onInputChange();
    //     img.onload = () => {
    //       setImageUrl({
    //         url: img.src,
    //         width: img.width,
    //         height: img.height,
    //       });
    //     };
    //   }
    //   getImage();
    // },[]);

                        // onInputChange = (event) => {
                        //   this.setState({input:event.target.value})
                        // };
                        // onButtonSubmit = () => {
                        //   this.setState({imageUrl:this.state.input});
                        //   console.log(this.state.imageUrl);
                        // }

    // const onButtonSubmit = () => {
      // setimageUrl(input);
      // app.models.predict(
      //   'a403429f2ddf4b49b307e318f00e528b', // this should work
      //   // Clarifai.FACE_DETECT_MODEL,  // if this isn't
      //   // "http://sample.websitesforchildcare.com.au/uploads/images/kids-playing.jpg"
      //   this.state.input
      // ).then(response => 
      //   displayFaceBox(
      //   calculateFaceLocation(response))
      //   )
      //  .catch(err => console.log(err));
    

                    //     render() {
                    //       const { imageUrl, onButtonSubmit, onInputChange } = this.state
                    //        return (
                    //         <div className="App">
                    //           <div className="particles">
                    //             <ParticleBackground /></div>
                    //           <Navigation />
                    //           <Logo />
                    //           <ImageLinkForm
                    //            onInputChange={onInputChange} 
                    //            onButtonSubmit={onButtonSubmit}/>
                    //           {/* <FaceRecognition  imageUrl={imageUrl}/> */}
                    //           <FaceRecApi 
                    //           imageUrl={imageUrl} 
                    //           />
                    //         </div>
                    //       );
                    //     }
                    //   }
                    // export default App;

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////   v2   ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// function App () {

//   // const [ isLoading, setLoading ] = useState(false);
//   const [ input, setInput ] = useState('');
//   const [ imageUrl, setImageUrl ] = useState('');
  
//   const onInputChange = (event) => {
//     event.preventDefault();
//     setInput(event.target.value)
//   };
//   const onButtonSubmit = () => {
//     setImageUrl(input);
//   }

//   return (
//     <div className="App">
//       <div className="particles">
//         <ParticleBackground /></div>
//       <Navigation />
//       <Logo />
//       <ImageLinkForm
//         onInputChange={ onInputChange }
//         onButtonSubmit={ onButtonSubmit } 
//         /> 
//       <FaceRecognition  imageUrl={imageUrl}/>
//       {/* <FaceRecApi imageUrl={imageUrl} /> */}
//     </div>
//   );
// }
// export default App;

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////   v3   ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const initialState = {
  input : '',
  imageUrl : '',
  box : [],
  route : 'SignIn',
  isSignedIn : false,
  loading:false,
  user:{ // changes while Register.js
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}
class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }
  
  async componentDidMount(){
    await fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data=>console.log(data))
  }
  
  calculateFaceLocation = (data)=>{
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxData = data.outputs[0].data.regions;

    if(boxData){
      return boxData.map( face =>{
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height),
        }
      })
  } else {
    // no face detected
    console.log('no such face detected');
  }
}
  
  displayFaceBox = (box) =>{
    this.setState({box:box})
  }

  onInputChange = (event) => {
    event.preventDefault();
    this.setState({input:event.target.value})
  };

  onButtonSubmit = () => { 
    this.setState({ imageUrl : this.state.input})
    // LOADING STATE
    // if(this.state.input.length === 0){
    //   this.setState({loading: false})
    // }else{
    //   this.setState({loading: true})
    // }

    //TODO: fetch imgurl from server
    // fetch(`http://localhost :3000/profile/${this.state.user.id}/${this.state.imageUrl}`,{
      return  fetch('http://localhost:3000/profile/:id/imageUrl',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response=>response.json())
    .then(response=>{
      if(response.ok){
         fetch('http://localhost:3000/profile/:id/image',{
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(response=>response.json())
          .then(data=>{
            this.setState(Object.assign(this.state.user,{entries: data}))
          }).catch(err=>console.log('inside image data',err))
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      }).catch(err=>console.log('outside',err))

    // ............. end of update..............
    // app.models.predict(
    //     // 'a403429f2ddf4b49b307e318f00e528b', // this should work
    //     Clarifai.FACE_DETECT_MODEL,  //   if this isn't
    //     this.state.imageUrl
    //   ).then(response =>
    //     this.displayFaceBox(
    //     this.calculateFaceLocation(response))
    //     )
    //    .catch(err => console.log(err));
  }

  onRouteChange = ( route ) => {
    if( route === 'SignOut'){
      this.setState({ isSignedIn : false })
    }else if( route === 'Home'){
      this.setState({ isSignedIn : true })
    }
    this.setState({route:route})
  }

  // loading user for Register.js
  loadUser = (data)=>{
      this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }

  render(){
    const { isSignedIn, imageUrl, box, route, loading } = this.state;
    return (
      <div className="App">
        <div className="particles">
          <ParticleBackground /></div>
          <Navigation
          isSignedIn={ isSignedIn }
          onRouteChange={ this.onRouteChange }/>
          {/* { this.state.route === 'SignIn' ?  */}
          { route === 'Home' ? 
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={ this.onInputChange }
            onButtonSubmit={ this.onButtonSubmit } 
            />
          <FaceRecognition 
            // loading = { loading }
            box = {box}
            imageUrl={imageUrl}/>
        {/* <FaceRecApi imageUrl={imageUrl} /> */}
        </div>
        : (
          this.state.route === 'SignIn'?
          <SignIn 
          loadUser={this.loadUser}
          onRouteChange={this.onRouteChange}/>
          :<Register
           loadUser={this.loadUser}
           onRouteChange={this.onRouteChange} />
        )
      }
      </div>
    );
  }
}
export default App;