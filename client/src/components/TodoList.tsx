import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Todo } from "../types/Todo";
import ListSection from "./ListSection";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  const EmptyList = () => {
    return (
      <article className="text-center">
        <h3>You currently have no todos</h3>
        <p>Click the button below to add a new todo</p>
        <Button>Add New Todo</Button>
      </article>
    );
  };

  const renderTodos = () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    const uncompletedTodos = todos.filter((todo) => !todo.completed);
    return (
      <Row>
        <ListSection title="Uncompleted Todos" todos={uncompletedTodos} />
        <ListSection title="Completed Todos" todos={completedTodos} />
      </Row>
    );
  };

  return (
    <section className="py-3">
      {!todos.length ? <EmptyList /> : renderTodos()}
    </section>
  );
};

export default TodoList;
