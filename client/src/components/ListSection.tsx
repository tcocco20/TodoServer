import Col from "react-bootstrap/Col";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { Todo } from "../types/Todo";
import { deleteTodo, updateTodo } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ListSectionProps {
  title: string;
  completed?: boolean;
  todos: Todo[];
}

const ListSection = ({ title, todos, completed }: ListSectionProps) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const renderTodos = () => {
    return todos.map((todo) => (
      <Card
        key={todo.id}
        bg={completed ? "success" : "secondary"}
        text="white"
        className="p-2 px-lg-3"
      >
        <div className="d-flex justify-content-between align-items-center">
          <CloseButton
            variant={completed ? "white" : "dark"}
            onClick={(e) => {
              e.stopPropagation();
              deleteMutation.mutate(todo.id);
            }}
          />
          <h5 className="flex-grow-1 text-center">{todo.title}</h5>
          <i
            onClick={() => {
              updateMutation.mutate({ ...todo, completed: !todo.completed });
            }}
            className={`bi fs-4 pointer ${
              completed ? "bi-check-circle" : "bi-circle"
            }`}
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
