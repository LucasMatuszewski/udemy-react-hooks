import { createContext } from 'react';

// we create context with default state:
const TodosContext = createContext({
  todos: [
    // { id: 1, text: 'Eat Breakfast', complete: false },
    // { id: 2, text: 'clean dishes', complete: false },
    // { id: 3, text: 'walk with a dog', complete: true }
  ],
  selectedTodo: {}
});

export default TodosContext;
