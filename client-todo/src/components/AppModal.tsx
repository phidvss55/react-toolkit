import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../hooks/useDispatchHook";
import { toggleModal } from "../redux/features/modalSlice";
import { Form } from "react-bootstrap";
import { todoApi } from "../services/todos";

const AppModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modalStatus } = useAppSelector((state) => state.modal);
  // const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [createTodo] = todoApi.useCreateTodoMutation();
  const [job, setJob] = useState<string>("");

  const handleClose = () => {
    setJob("");
    dispatch(toggleModal({ modalStatus: !modalStatus }));
  };

  const handleSubmit = () => {
    console.log("set job", job);
    createTodo({ description: job, todoStatus: false });
    handleClose();
  };

  return (
    <Modal show={modalStatus} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Job management</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
            <Form.Text className="text-danger tw-hidden">
              Please enter a description
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppModal;
