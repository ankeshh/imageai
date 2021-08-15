import React, {Component} from "react";
import Navigation from "./Navigation";
import Rank from "./Rank";
import LogoU from "./LogoU";
import Form from "./Form";
import Image from "./Image";
import Clarifai from 'clarifai';

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
    }
  }

  onInputchange = (event) =>{
    // console.log(event.target.value);
    this.setState({input: event.target.value})
  }

  onbuttonClick = () =>{
    this.setState({urlimg: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(
        function(response){
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err){
          console.log(err);
        }
      );
  }

  render(){
    return (
      <div className="App"> 
        <Navigation/>
        <LogoU/>
        <Rank/>
        <Form inputchange={this.onInputchange} buttonClick={this.onbuttonClick}/>
        <Image imagee={this.state.urlimg}/>
        
      </div>
    );
  }
}

export default App;
