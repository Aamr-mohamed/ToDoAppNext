"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createTask(data: { title: string; description: string , completed: boolean }) {
  try {
    await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        completed: false,
      },
    });
    revalidatePath("/tasks");
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
}

export async function deleteTask(taskId: number) {
  try {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    revalidatePath("/tasks");
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
}

export async function getFiltered(filter: string) {
  const filterCondition =
    filter === "completed"
      ? { completed: true }
      : filter === "not_completed"
        ? { completed: false }
        : filter === "all"
          ? {}
          : undefined;

  await prisma.task.findMany({
    where: filterCondition,
  });
  revalidatePath("/tasks");
}

export async function updateTask(
  taskId: number,
  data: { title: string; description: string; completed: boolean },
) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        title: data.title,
        description: data.description,
        completed: data.completed,
      },
    });
    revalidatePath("/tasks");
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
}
