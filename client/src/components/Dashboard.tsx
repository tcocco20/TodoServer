import { useRef } from "react";
import AddTodo from "./AddTodo";
import ProtectedRoute from "./ProtectedRoute";
import TodoList from "./TodoList";
import { fetchTodos } from "../api";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      return await fetchTodos();
    },
  });
  
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <ProtectedRoute>
      <AddTodo ref={inputRef} />
      <TodoList todos={todos || []} onSelectAddTodo={handleFocusInput} />
    </ProtectedRoute>
  );
};

export default Dashboard;
