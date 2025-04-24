import { useRef, useState } from "react";
import AddTodo from "./AddTodo";
import ProtectedRoute from "./ProtectedRoute";
import TodoList from "./TodoList";
import { Todo } from "../types/Todo";

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: true,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <ProtectedRoute>
      <AddTodo onAddTodo={handleAddTodo} ref={inputRef} />
      <TodoList todos={todos} onSelectAddTodo={handleFocusInput} />
    </ProtectedRoute>
  );
};

export default Dashboard;
