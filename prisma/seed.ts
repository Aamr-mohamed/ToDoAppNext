import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tasks = await prisma.task.createMany({
    data: [
      {
        title: 'First Title',
        description: 'good description that is long enough to be longer than the title',
        completed: false,
      },
      {
        title: 'Good stuff',
        description: 'Best description for the best reader',
        completed: true,
      },
      {
        title: 'Words',
        description: 'I am running out of words',
        completed: false,
      },
      {
        title: 'Task 4',
        description: 'Dont forget to do this',
        completed: true,
      },
    ],
  });

  console.log('Seeded tasks:', tasks);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
