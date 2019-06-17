import React from 'react';
import ReactDOM from 'react-dom';
// import App from './AppFunction';
// import App from './AppClass';
// import App from './Login';
// import App from './Register';
// import App from './AppAPI'; //useRef() i useEffect()
import App from './AppContextReducer';

import * as serviceWorker from './serviceWorker';

// Set React Context (export it to use in useContext / Consumer):
export const UserContext = React.createContext();
const userName = 'Lucas';

/****
 * useCONTEXT + createContext ==> use and pass global State in our App
 * useREDUCER ==> MANAGE global State in our App (like Redux)
 *
 * useReducer works very similar like Redux.
 */

// Use PROVIDER to provide Context to components down the tree:
// it could be provided in render() function or in the component.
ReactDOM.render(
  <UserContext.Provider value={userName}>
    <App />
  </UserContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
