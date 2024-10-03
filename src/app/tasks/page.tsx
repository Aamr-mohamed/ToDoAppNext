import { Center, Title } from "@mantine/core";
import CreateTaskModal from "./createTaskModal";
import Todo from "../components/TaskList";
import { PrismaClient } from "@prisma/client";
import TodoFilters from "../components/Filter";
import Pagination from "../components/Pagination";

const prisma = new PrismaClient();

async function IndexPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filter = searchParams.filter;
  const currentPage = parseInt(searchParams.page as string) || 1; // Get the page number from the URL or default to 1
  const tasksPerPage = 8;
  const skip = (currentPage - 1) * tasksPerPage; // Skip tasks based on current page

  let whereClause;
  if (filter === "not_completed") {
    whereClause = { completed: false };
  } else if (filter === "completed") {
    whereClause = { completed: true };
  }

  // Fetch paginated tasks
  const tasks = await prisma.task.findMany({
    where: whereClause,
    skip: skip,
    take: tasksPerPage, // Limit the number of tasks per page
    orderBy: { id: "desc" },
  });

  const totalTasks = await prisma.task.count({ where: whereClause });
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
    <Center
      style={{ flexDirection: "column", padding: 10, minHeight: "100vh" }}
    >
      <Title>Todo app</Title>
      <CreateTaskModal />
      <TodoFilters />
      <Center style={{ gap: 5, marginTop: 10 }}>
        <div className="my-6 rounded border-b-2 border-gray-300 shadow">
          {tasks.map((task) => (
            <Todo key={task.id} task={task} />
          ))}
        </div>
      </Center>
      <Center style={{ marginTop: "auto", padding: "20px 0" }}>
        <Pagination totalPages={totalPages} />
      </Center>
    </Center>
  );
}

export default IndexPage;
