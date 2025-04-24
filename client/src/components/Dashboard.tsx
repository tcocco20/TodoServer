import { useState } from "react";
import AddTodo from "./AddTodo";
import ProtectedRoute from "./ProtectedRoute";
import TodoList from "./TodoList";
import { Todo } from "../types/Todo";

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <ProtectedRoute>
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </ProtectedRoute>
  );
};

export default Dashboard;
