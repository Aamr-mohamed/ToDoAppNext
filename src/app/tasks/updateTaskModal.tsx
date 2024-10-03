"use client";

import { Modal, Button, TextInput, Checkbox, Input } from "@mantine/core";
import { useState } from "react";
import { updateTask } from "../lib/actions";

type UpdateTaskModalProps = {
  task: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };
};

const UpdateTaskModal = ({ task }: UpdateTaskModalProps) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const handleSubmit = async () => {
    try {
      await updateTask(task.id, { title, description, completed });
      setOpened(false);
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>Edit</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Update Task"
      >
        <Input.Wrapper label="Title">
          <TextInput
            style={{ marginBottom: 10 }}
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </Input.Wrapper>

        <Input.Wrapper label="Description">
          <Input
            style={{ marginBottom: 10 }}
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </Input.Wrapper>
        <Checkbox
          style={{ marginBottom: 10 }}
          label="Completed"
          onChange={(e) => {
            setCompleted(e.currentTarget.checked);
          }}
          checked={completed}
        />
        <Button onClick={handleSubmit}>Update Task</Button>
      </Modal>
    </>
  );
};

export default UpdateTaskModal;
