/***
 * Function Component with Hooks:
 */

import React, { useState, useEffect } from 'react';

// function App() { // function declaration
// https://medium.com/@mandeep1012/function-declarations-vs-function-expressions-b43646042052

// we can set initial state and reuse it (e.g to reset state):
const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
};

// function expression:
const App = () => {
  // With useState hook we don't have to create new state, we just use it on a top of Component:
  const [count, setCount] = useState(0); // like setState({count: 0});
  // count = name of our state value, setCount = our name for function do set this one state
  const [isOn, setIsOn] = useState(false);

  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  // navigator = information about user browser, eg. language, version, or if it is onLine)
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // location - we save here a browser info about our location:
  // const [location, setLocation] = useState(initialLocationState);
  // REFACTOR with destructuring from location:
  const [{ latitude, longitude, speed }, setLocation] = useState(
    initialLocationState
  );

  // getCurrentPosition don't have any method to stop eventListener, so we use our own flag:
  let mounted = true; //default "state" of our component.

  // useEffect - is for Side Effects (all interactions with things outside our app), like interacting with API, data fetching, setting subscription, browser API
  useEffect(() => {
    // by default useEffect is executed AFTER every render, eg. on mount & after state change.
    // in Class components we use ComponentDidMount & componentDidUpdate LCM for the same effect.
    document.title = `You have clicked ${count} times!`;

    window.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOnline);

    // navigator gets user location info from a browser:
    navigator.geolocation.getCurrentPosition(handleGeoLocation);
    // navigator can also watch location changes (and returns watchId used to stop watcher):
    const watchId = navigator.geolocation.watchPosition(handleGeoLocation);

    // CLEANUP FUNCTION:
    // To terminate eventListener on Component Unmount AND before every new render, we return a function from useEffect. OTHERWISE WE WILL CREATE MULTIPLE EVENT LISTENERS ON EVERY RENDER!!!
    return () => {
      // everything here will be done on the end of useEffect, before new render:
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOnline);
      // remove watchPosition listener:
      navigator.geolocation.clearWatch(watchId);
      mounted = false; // after first render we change a flag to false to stop getCurrentPosition
    };
  }, [count]); // If second argument (dependency array) is present, effect will only activate if the values in the list change (if we would not use [count] the title would not change)

  const handleGeoLocation = event => {
    //set location only on the first mount of this component:
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      });
    }
  };

  const handleOnline = event => {
    console.log('event.OnLine:', event.online);
    console.log('event.offLine:', event.offline);
    console.log('navigator.onLine:', navigator.onLine);

    setIsOnline(navigator.onLine);
  };

  const handleMouseMove = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    });
  };

  const incrementCount = () => {
    // its not a method of a class so we use "const"
    // setCount(count + 1); // it use count from current state
    setCount(prevCount => prevCount + 1); // to use count from previous state
    // the same like: setState(prevState => { count: prevState.count + 1 })
  };

  const toggleLight = () => {
    // setIsOn(prevIsOn => !prevIsOn) // to use previous state
    setIsOn(!isOn);
  };
  return (
    <>
      <h2>Counter</h2>
      <button onClick={incrementCount}>I was clicked {count} times</button>

      <h2>Toggle Light</h2>
      <div
        style={{
          width: '50px',
          height: '50px',
          background: isOn ? 'grey' : 'yellow'
        }}
        onClick={toggleLight}
      />

      <h2>Mouse position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      {/* <p>X: {mousePosition.x}</p>
      <p>Y: {mousePosition.y}</p> */}

      <h2>is browser Online? {`${isOnline}`}</h2>

      <h2>Geolocation</h2>
      {/* destructuring from location.latitude */}
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>Your speed is: {speed ? speed : 'unknown'}</p>
    </>
  );
};

export default App;
