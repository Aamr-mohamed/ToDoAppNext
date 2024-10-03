import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");

  const filterCondition =
    filter === "completed"
      ? { completed: true }
      : filter === "not_completed"
        ? { completed: false }
        : {};

  const tasks = await prisma.task.findMany({
    where: filterCondition,
  });

  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsedData = TaskSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      { error: parsedData.error.issues },
      { status: 400 },
    );
  }

  const task = await prisma.task.create({
    data: parsedData.data,
  });
  return NextResponse.json(task);
}

// PUT (update task)
export async function PUT(request: Request) {
  try {
    const { id, title, description, completed } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 },
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, completed },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 },
    );
  }
}
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("id");

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 },
      );
    }

    const deletedTask = await prisma.task.delete({
      where: { id: Number(taskId) },
    });

    return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}
