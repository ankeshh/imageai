import React from "react";
import Navigation from "./Navigation";
import Rank from "./Rank";
import LogoU from "./LogoU";
import Form from "./Form";
import Image from "./Image";

function App() {
  return (
    <div className="App"> 
      <Navigation/>
      <Rank/>
      <LogoU/>
      <Form>
        <Image/>
      </Form>
    </div>
  );
}

export default App;
