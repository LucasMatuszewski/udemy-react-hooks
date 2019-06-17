// on Udemy tutorial they used easiest method by generating unique UUID:
// import uuidv4 from 'uuidv4';
// id: uuidv4() // it generates new unique ID

export default function reducer(state, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload
      };
    case 'ADD_TODO':
      // WITH AXIOS API WE HAVE TO MOVE THIS VALIDATION TO TodoForm:
      // // do nothing if there is no text:
      // if (!action.payload.text) return state;

      // // do nothing if todo with the same text already exists:
      // if (state.todos.findIndex(todo => todo.text === action.payload.text) > -1)
      //   return state;

      // MOVED TO TodoForm.js with AXIOS to save to API
      // const nextId =
      //   1 +
      //   state.todos.reduce(
      //     (accumulator, current) =>
      //       accumulator.id > current.id ? accumulator.id : current.id,
      //     0
      //   );
      return {
        ...state,
        /* todos: state.todos.concat({
          id: nextId,
          text: action.payload,
          complete: false
        }) */
        // on Udemy they use easiest method with ES6 spread operator:
        todos: [...state.todos, action.payload]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id // ? { ...action.payload, complete: !action.payload.complete }
            ? action.payload // from API we get updated object
            : todo
        )
      };
    case 'SELECT_TODO':
      return {
        ...state,
        selectedTodo: action.payload
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: action.payload,
        selectedTodo: {}
      };

    // BENCHMARK (most times Map() method is faster):
    // http://jsben.ch/PhwdY

    // BUT in my private tests Slice() was always faster!!!
    // https://stackoverflow.com/questions/111368/how-do-you-performance-test-javascript-code

    // In both tests methods results are not drastically big
    case 'DELETE_TODO':
      const isSelectedTodo =
        state.selectedTodo.id === action.payload.id ? {} : state.selectedTodo;
      return {
        ...state,
        selectedTodo: isSelectedTodo,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    default:
      return state;
  }
}
