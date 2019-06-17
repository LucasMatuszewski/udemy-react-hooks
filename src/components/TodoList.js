import React, { useContext } from 'react';
import TodosContext from '../context';
import Axios from 'axios';

export default function TodoList() {
  // we destructure state, which is from <TodosContext.provider> (not from ../context.js)
  const { state, dispatch } = useContext(TodosContext);

  const header =
    state.todos.length > 0 ? `${state.todos.length} todos:` : 'No todos here';

  return (
    <div className="m-10 p-5 max-w-md border rounded text-center font-mono">
      <h1 className="font-bold text-xl mb-2">{header}</h1>
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id} className="flex m-5 items-centre">
            <span
              onDoubleClick={async () => {
                const response = await Axios.patch(
                  `https://hooks-api.lucasmatuszewski.now.sh/todos/${todo.id}`,
                  {
                    // ...todo, // with .patch we provide only data to change!
                    complete: !todo.complete
                  }
                );
                dispatch({ type: 'TOGGLE_TODO', payload: response.data });
              }}
              className={`cursor-pointer flex-1 ml-12${
                todo.complete ? ' line-through text-gray-500' : ''
              }`}
              id={todo.id}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: 'SELECT_TODO', payload: todo })}
            >
              <img
                src="https://icon.now.sh/edit/0050c5"
                alt="Edit icon"
                className="h-6"
              />
            </button>
            <button
              onClick={async () => {
                await Axios.delete(
                  `https://hooks-api.lucasmatuszewski.now.sh/todos/${todo.id}`
                );
                dispatch({ type: 'DELETE_TODO', payload: todo });
              }}
            >
              <img
                src="https://icon.now.sh/delete/8b0000"
                alt="Delete icon"
                className="h-6 ml-2"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
