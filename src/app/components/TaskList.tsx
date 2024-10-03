"use client";

import { Button } from "@mantine/core";
import UpdateTaskModal from "../tasks/updateTaskModal";
import { deleteTask } from "../lib/actions";

type TaskListProps = {
  task: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };
};

const Todo: React.FC<TaskListProps> = ({ task }: TaskListProps) => {
  return (
    <div className="border-b-2 border-gray-300 bg-white p-4 ">
      <div
        key={task.id}
        style={{
          display: "flex",
          gap: 15,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <h1>
          <span style={{ color: "red" }}>Title</span>: {task.title}
        </h1>
        <span style={{ color: "red" }}>Description</span>:{" "}
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "gray" : "inherit",
          }}
        >
          {task.description}
        </span>
        <div
          style={{ display: "flex", gap: 5, justifyContent: "end" }}
          className="ml-auto"
        >
          <Button
            className="ml-auto"
            variant="outline"
            onClick={async () => deleteTask(task.id)}
          >
            X
          </Button>
          <UpdateTaskModal task={task} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
