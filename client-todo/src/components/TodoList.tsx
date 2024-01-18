import React from "react";
import Table from "react-bootstrap/Table";
import Row from "./Row";
import { TodoI, todoApi } from "../services/todos";
import { Button, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/useDispatchHook";
import { toggleModal } from "../redux/features/modalSlice";

const TodoList: React.FC = () => {
  const { data: todos } = todoApi.useGetTodosQuery();
  const dispatch = useAppDispatch();
  const { modalStatus } = useAppSelector((state) => state.modal);

  return (
    <Stack className="d-flex align-items-center">
      <Button
        variant="primary"
        onClick={() => dispatch(toggleModal({ modalStatus: !modalStatus }))}
        className="m-5"
      >
        Create New Job
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Description</th>
            <th>Toggle</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((todo: TodoI) => (
            <Row row={todo} key={todo._id} />
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};

export default TodoList;
