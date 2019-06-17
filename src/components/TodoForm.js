import React, { useState, useContext, useEffect } from 'react';
import TodosContext from '../context';
import Axios from 'axios';

export default function TodoForm() {
  const { state, dispatch } = useContext(TodosContext);
  // const {
  //   state: { selectedTodo = {} },
  //   dispatch
  // } = useContext(TodosContext);
  const [todoInputText, setTodoInputText] = useState('');
  const { selectedTodo = {} } = state;

  useEffect(() => {
    if (selectedTodo.id) {
      setTodoInputText(selectedTodo.text);
    } else {
      setTodoInputText('');
    }
  }, [selectedTodo.id, selectedTodo.text]);

  const addNewTodo = async () => {
    const nextId =
      1 +
      state.todos.reduce(
        (accumulator, current) =>
          accumulator.id > current.id ? accumulator.id : current.id,
        0
      );
    // we could save new Todo to variable and then dispatch it directly:
    // const newTodo = {
    //   id: nextId,
    //   text: todoInputText,
    //   complete: false
    // };

    // OR we could get new Todo from Axios response and dispatch response.data:
    const response = await Axios.post(
      'https://hooks-api.lucasmatuszewski.now.sh/todos',
      {
        id: nextId,
        text: todoInputText,
        complete: false
      }
    );
    dispatch({ type: 'ADD_TODO', payload: response.data });
  };

  const updateTodo = async () => {
    const response = await Axios.patch(
      `https://hooks-api.lucasmatuszewski.now.sh/todos/${
        state.selectedTodo.id
      }`,
      {
        //...state.selectedTodo, // with .patch we provide only data to change!
        text: todoInputText
      }
    );
    /*
      // MY METHOD WITH MAP() LIKE WITH TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === state.selectedTodo.id
            ? { ...state.selectedTodo, text: action.payload }
            : todo
        ),
        selectedTodo: {}
      }; */

    // Alternative method from UDEMY with Slice():
    const selectedTodoIndex = state.todos.findIndex(
      todo => todo.id === state.selectedTodo.id
    );
    const updatedTodos = [
      ...state.todos.slice(0, selectedTodoIndex),
      // { ...state.selectedTodo, text: todoInputText },
      response.data,
      ...state.todos.slice(selectedTodoIndex + 1)
    ];

    dispatch({ type: 'UPDATE_TODO', payload: updatedTodos });
  };

  const handleSubmit = event => {
    event.preventDefault();

    // do nothing if there is no text:
    if (!todoInputText) return null;

    // do nothing if todo with the same text already exists:
    if (state.todos.findIndex(todo => todo.text === todoInputText) > -1)
      return null;

    if (selectedTodo.id) {
      updateTodo();
    } else {
      addNewTodo();
    }

    // dispatch({
    //   type: selectedTodo.id ? 'UPDATE_TODO' : 'ADD_TODO',
    //   payload: todoInputText
    // });

    setTodoInputText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodoInputText(event.target.value)}
        value={todoInputText}
        required
      />
      <button type="submit" className="ml-5">
        {selectedTodo.id ? 'Edit todo' : 'Add new todo'}
      </button>
    </form>
  );
}
