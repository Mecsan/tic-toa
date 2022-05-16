
import Game from "./game";
import Form from "./form";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';







function App() {

  let [online, setonline] = useState(false);
  let [offline, setoffline] = useState(false);
  let [name, setname] = useState("");

  let [p1, setp1] = useState("");
  let [p2, setp2] = useState("");
  let [so, setio] = useState("");
  let [room, setroom] = useState("");


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Form
          p1={[p1, setp1]}
          p2={[p2, setp2]}
          soi={[so, setio]}
          ro={[room, setroom]}
          on={[online, setonline]}
          off={[offline, setoffline]}
          na={[name, setname]}
        />} />
        <Route exact path="/play" element={<Game 
        p1={p1} p2={p2} name={name} room={room} online={online}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

