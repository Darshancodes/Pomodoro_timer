import './App.css';
import Timer from "./Timer";
import {useState} from "react";

function App() {

  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
        <Timer />
    </main>
  );
}

export default App;