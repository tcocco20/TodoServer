import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Todo } from "../types/Todo";
import ListSection from "./ListSection";

interface TodoListProps {
  todos: Todo[];
  onSelectAddTodo: () => void;
}

const TodoList = ({ todos, onSelectAddTodo }: TodoListProps) => {
  const EmptyList = () => {
    return (
      <article className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
        <h3>You currently have no todos</h3>
        <p className="mb-2">Click the button below to add a new todo</p>
        <Button onClick={onSelectAddTodo}>Add New Todo</Button>
      </article>
    );
  };

  const renderTodos = () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    const uncompletedTodos = todos.filter((todo) => !todo.completed);
    return (
      <Row>
        <ListSection title="Uncompleted Todos" todos={uncompletedTodos} />
        <ListSection title="Completed Todos" todos={completedTodos} completed />
      </Row>
    );
  };

  return (
    <section className="flex-grow-1 py-3 d-flex flex-column">
      {!todos.length ? <EmptyList /> : renderTodos()}
    </section>
  );
};

export default TodoList;
