import React, {Component} from "react";
import Navigation from "./Navigation";
import Rank from "./Rank";
import LogoU from "./LogoU";
import Form from "./Form";
import Image from "./Image";
import Signin from "./Signin";
import Clarifai from 'clarifai';
import Register from "./Register";
import './app.css';


const app = new Clarifai.App({
  apiKey: '3fef8537306e4c018585ac391a663284'
});
class App extends Component {
  constructor(){
    super();
    this.state={
      input: '',
      urlimg: '',
      box: {},
      route: 'signin',
      isSignedin: false,
    }
  }

  faceboxCal =(data) =>{
    const faceloc = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: faceloc.left_col * width,
      topRow: faceloc.top_row * height,
      rightCol: width - (faceloc.right_col * width),
      bottomRow: height - (faceloc.bottom_row * height)
    }
  }
  
  facebox = (calval) =>{
    this.setState({box: calval})
  }

  onInputchange = (event) =>{
    this.setState({input: event.target.value})
  }

  onbuttonClick = () =>{
    this.setState({urlimg: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then((response) => this.facebox(this.faceboxCal(response)))  //response is sent by the server. Use that and create function
    .catch(err => console.log(err));
  }

  onrouteChange = (route) =>{
    if(route === 'signin'){
      this.setState({isSignedin: false})
    }
    else if(route ==='home'){
      this.setState({isSignedin: true})
    }
    this.setState({route: route});
  }

  render(){
    return (
      <div className="App"> 
        <Navigation isSignedin={this.state.isSignedin} onrouteChange={this.onrouteChange}/>
        {this.state.route === 'signin' ? 
          <Signin onrouteChange={this.onrouteChange}/>
          :
          this.state.route === 'register' ? 
            <Register onrouteChange={this.onrouteChange}/>
            :
            <div>
              <LogoU/>
              <Rank/>
              <Form inputchange={this.onInputchange} buttonClick={this.onbuttonClick}/>
              <Image box={this.state.box} imagee={this.state.urlimg}/>
            </div>      
        }
      </div>
    );
  }
}

export default App;
