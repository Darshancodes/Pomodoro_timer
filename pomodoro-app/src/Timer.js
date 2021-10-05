import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import { useState, useEffect, useRef } from "react";

const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {
  
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); // work/break/null
    const [secondsLeft, setSecondsLeft] = useState(0);
  
    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);
  
    function tick() {
      secondsLeftRef.current--;
      setSecondsLeft(secondsLeftRef.current);
    }
  
    useEffect(() => {
  
      function switchMode() {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
  
        setMode(nextMode);
        modeRef.current = nextMode;
  

      }
  
      secondsLeftRef.current =  60;
      setSecondsLeft(secondsLeftRef.current);
  
      const interval = setInterval(() => {
        if (isPausedRef.current) {
          return;
        }
        if (secondsLeftRef.current === 0) {
          return switchMode();
        }
  
        tick();
      },1000);
  
      return () => clearInterval(interval);
    }, );
  
    const percentage = Math.round(secondsLeft);
  
    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if(seconds < 10) seconds = '0'+seconds;
  
    return (
      <div>
        <CircularProgressbar
          value={percentage}
          text={minutes + ':' + seconds}
          styles={buildStyles({
          textColor:'#fff',
          pathColor:mode === 'work' ? red : green,
          tailColor:'rgba(255,255,255,.2)',
        })} />
        <div style={{marginTop:'20px'}}>
          {isPaused
            ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
            : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
        </div>
      </div>
    );
  }
  
  export default Timer;