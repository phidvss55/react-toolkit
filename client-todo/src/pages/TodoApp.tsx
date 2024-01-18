import React from "react";
import { Container } from "react-bootstrap";
import AppModal from "../components/AppModal";
import TodoList from "../components/TodoList";

const TodoApp: React.FC = () => {
  return (
    <Container>
      <AppModal />

      <TodoList />
    </Container>
  );
};

export default TodoApp;
