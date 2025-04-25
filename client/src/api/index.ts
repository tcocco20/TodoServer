import axios from "axios";
import { type User } from "../store/authContext";
import { Todo } from "../types/Todo";

export const fetchUser = async () => {
  try {
    const response = await axios.get<User>("/api/current_user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

interface TodoResponse {
  id: string;
  title: string;
  completed: number;
  user_id: string;
}

function reshapeTodos(todos: TodoResponse[]): Todo[] {
  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    completed: !!todo.completed,
  })) as Todo[];
}

export const fetchTodos = async () => {
  try {
    const response = await axios.get<TodoResponse[]>("/api/todos");
    return reshapeTodos(response.data);
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const createTodo = async (title: string) => {
  try {
    const response = await axios.post<TodoResponse[]>("/api/todos", { title });
    return reshapeTodos(response.data);
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await axios.delete<TodoResponse[]>(`/api/todos/${id}`);
    return reshapeTodos(response.data);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export const updateTodo = async ({
  id,
  title,
  completed,
}: {
  id: string;
  title: string;
  completed: boolean;
}) => {
  const completedNumber = completed ? 1 : 0;
  try {
    const response = await axios.put<TodoResponse[]>(`/api/todos/${id}`, {
      title,
      completed: completedNumber,
    });
    return reshapeTodos(response.data);
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};
