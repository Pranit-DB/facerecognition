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
