import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { Todo } from "../types/Todo";

interface ListSectionProps {
  title: string;
  completed?: boolean;
  todos: Todo[];
}

const ListSection = ({ title, todos, completed }: ListSectionProps) => {
  const renderTodos = () => {
    return todos.map((todo) => (
      <Card
        key={todo.id}
        bg={completed ? "success" : "secondary"}
        text="white"
        className="p-2 px-lg-3"
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5>{todo.title}</h5>
          <i
            className={`bi fs-4 ${completed ? "bi-check-circle" : "bi-circle"}`}
          ></i>
        </div>
      </Card>
    ));
  };
  return (
    <Col md={6}>
      <article>
        <h4 className="text-center mb-2 mb-lg-3">{title}</h4>
        <Stack gap={2}>{renderTodos()}</Stack>
      </article>
    </Col>
  );
};

export default ListSection;
