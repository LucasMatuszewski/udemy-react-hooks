import React, { useContext, useEffect, useState, useReducer } from 'react';
import Axios from 'axios';

// We could make separate files for Context and Reducers:
import TodosContext from './context';
import TodosReducer from './reducer';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

// import user context created at index.js:
import { UserContext } from './index';

const initialCounterState = {
  count: 0
};

// CUSTOM HOOK (start with "useXXX" always, name is up to us):
// We can also use other hooks inside custom hook!
const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []); // empty array to getData only once on first render / app mount

  const getData = async () => {
    const response = await Axios.get(endpoint);
    setData(response.data);
  };

  return data;
};

// To MANAGE a global STATE we use functions called REDUCERS:
// they could be stored in our component on in separate files.
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1
      };
    case 'decrement':
      return {
        count: state.count - 1
      };
    case 'reset':
    default:
      return initialCounterState;
  }
}

export default function App() {
  // We can create new state also with useReducer:
  const [counterState, counterDispatch] = useReducer(
    counterReducer,
    initialCounterState
  );

  // With NEW HOOK we don't have to use Context.Consumer:
  const user = useContext(UserContext); // we just save context to a variable!

  // we can also use context from separate file (and use many contexts in one file):
  const initialState = useContext(TodosContext);

  // whe provide to hook reducer function and a state (could be local or global context)
  const [state, dispatch] = useReducer(TodosReducer, initialState);

  // CUSTOM HOOK (start with "useXXX" always, name is up to us):
  const savedTodos = useAPI('https://hooks-api.lucasmatuszewski.now.sh/todos');

  useEffect(() => {
    dispatch({
      type: 'GET_TODOS',
      payload: savedTodos
    });
  }, [savedTodos]);

  return (
    <>
      <div className="m-10 p-5 border rounded">
        <h1 className="font-bold text-xl mb-2">CRUD App with Hooks</h1>
        <p>
          hello {user}, you have clicked {counterState.count} times
        </p>
        <button
          onClick={() => counterDispatch({ type: 'increment' })}
          className="border p-1"
        >
          Increment
        </button>
        <button
          onClick={() => counterDispatch({ type: 'decrement' })}
          className="border p-1 mx-2"
        >
          decrement
        </button>
        <button
          onClick={() => counterDispatch({ type: 'reset' })}
          className="border p-1 mx-2"
        >
          Reset
        </button>
      </div>

      {/* We may provide context also in a components JSX directly.
      In this example we provide an object with state and dispatch function */}
      <TodosContext.Provider value={{ state, dispatch }}>
        <TodoList />
        <TodoForm />
      </TodosContext.Provider>
    </>

    /*
    // OLD WAY TO USE CONTEXT (ES5):
    <UserContext.Consumer>
      {value => (
        <div className="m-10 p-5 border rounded">
          <h1 className="font-bold text-xl mb-2">CRUDD App with Hooks</h1>
          <p>hello {value}</p>
        </div>
      )}
    </UserContext.Consumer> */
  );
}
