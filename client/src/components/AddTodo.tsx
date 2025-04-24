import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FormEvent, forwardRef, useState } from "react";

interface AddTodoProps {
  onAddTodo: (title: string) => void;
}

const AddTodo = forwardRef<HTMLInputElement, AddTodoProps>(
  ({ onAddTodo }: AddTodoProps, ref) => {
    const [title, setTitle] = useState<string>("");

    const handleAddTodo = (e: FormEvent) => {
      e.preventDefault();
      if (title) {
        onAddTodo(title);
        setTitle("");
      }
    };
    return (
      <aside className="mt-5 pt-5">
        <h3 className="text-center mb-3">Add New Todo</h3>
        <Form onSubmit={handleAddTodo}>
          <Row>
            <Form.Label column="lg" md={2}>
              Todo Title
            </Form.Label>
            <Col className="mb-3 mb-sm-0">
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                type="text"
                ref={ref}
                placeholder="Enter Title Of Todo"
              />
            </Col>
            <Col sm={4} md={3} lg={2}>
              <Button type="submit" className="w-100">
                Add New Todo
              </Button>
            </Col>
          </Row>
        </Form>
      </aside>
    );
  }
);

export default AddTodo;
