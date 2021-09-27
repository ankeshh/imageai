import React, {Component} from "react";
import Navigation from "./Navigation";
import Rank from "./Rank";
import Form from "./Form";
import Image from "./Image";
import Signin from "./Signin";
import Register from "./Register";
import './app.css';

const initialstate = {
  input: '',
  urlimg: '',
  box: {},
  route: 'signin',
  isSignedin: false,
  user: {
    id: '',
    name: '',
    email: '',
    count: 0,
    joined: ''
  },
}
class App extends Component {
  constructor(){
    super();
    this.state = initialstate;
  }

  loaduser = (data) => {
    const{id,name,email,count,joined} = data;
    this.setState({user: {
      id: id,
      name: name,
      email: email,
      count: count,
      joined: joined
    }})
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
    fetch('http://localhost:3000/image', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response = response.json())
      .then((response) => {
        if(response){
          fetch('http://localhost:3000/imagecount', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response=>response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {count: count}))
            })
            .catch(console.log);
          }
      this.facebox(this.faceboxCal(response))})  //response is sent by the server. Use that and create function
      .catch(err => console.log(err));
  }

  onrouteChange = (route) =>{
    if(route === 'signin'){
      this.setState(initialstate)
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
          <Signin loaduser={this.loaduser} onrouteChange={this.onrouteChange}/>
          :
          this.state.route === 'register' ? 
            <Register loaduser={this.loaduser} onrouteChange={this.onrouteChange}/>
            :
            <div>
              {/* <LogoU/> */}
              <Rank name={this.state.user.name} count={this.state.user.count}/>
              <Form inputchange={this.onInputchange} buttonClick={this.onbuttonClick}/>
              <Image box={this.state.box} imagee={this.state.urlimg}/>
            </div>      
        }
      </div>
    );
  }
}

export default App;
