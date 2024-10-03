"use client";

import { useState } from "react";
import { Modal, Button, Input, Checkbox } from "@mantine/core";
import { createTask } from "../lib/actions";

export default function TaskModal() {
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask({
      title: formData.title,
      description: formData.description,
    });

    setError(null);
    setOpened(false);
    setFormData({ title: "", description: "", completed: false });
  };

  return (
    <div>
      <Button onClick={() => setOpened(true)}>Create Task</Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create Task"
      >
        <form onSubmit={handleSubmit} style={{}}>
          <Input.Wrapper label="Title">
            <Input
              style={{
                marginBottom: "10px",
                marginTop: "10px",
              }}
              type="text"
              name="title"
              placeholder="Task title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </Input.Wrapper>
          <Input.Wrapper label="Description">
            <Input
              style={{
                marginBottom: "10px",
                marginTop: "10px",
              }}
              name="description"
              placeholder="Task description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Input.Wrapper>

          <Checkbox
            style={{
              marginBottom: "10px",
              marginTop: "10px",
            }}
            label="Completed"
            checked={formData.completed}
            onChange={(e) =>
              setFormData({ ...formData, completed: e.target.checked })
            }
          />
          <Button type="submit">Add Task</Button>
          {error && <p>{error}</p>}
        </form>
      </Modal>
    </div>
  );
}
