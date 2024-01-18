import React, { useCallback } from "react";
import { TodoI, todoApi } from "../services/todos";
import { Button, Stack } from "react-bootstrap";

type Props = {
  row: TodoI;
};

const Row: React.FC<Props> = ({ row }: Props) => {
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();

  const onToggle = useCallback(
    (row: TodoI) =>
      updateTodo({
        ...row,
        todoStatus: !row.todoStatus,
      }),
    [updateTodo]
  );

  const getStatus = (status: boolean) => {
    return status ? "Done" : "Not Done";
  };

  return (
    <tr>
      <td>{row._id}</td>
      <td>{row.description}</td>
      <td>
        <input
          type="checkbox"
          onChange={() => onToggle(row)}
          checked={row.todoStatus}
        />
      </td>
      <td>{getStatus(row.todoStatus)}</td>
      <td>
        <Stack direction="horizontal" gap={2}>
          <Button variant="primary">Edit</Button>
          <Button variant="danger" onClick={() => deleteTodo(row._id)}>
            Delete
          </Button>
        </Stack>
      </td>
    </tr>
  );
};

export default Row;
