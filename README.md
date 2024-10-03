# To-Do App

## Introduction
This To-Do app is a full-stack application developed using Next.js, Prisma, and PostgreSQL, designed to help users manage their tasks efficiently. Users can create, read, update, and delete tasks, providing a straightforward and user-friendly interface. The application is deployed on Vercel, ensuring fast load times and easy scalability.

## Features
- **User Authentication:** Secure login and registration.
- **Task Management:** Create, edit, delete, and view tasks.
- **Pagination:** Efficiently navigate through a large number of tasks.

## Technologies Used
**Frontend:**
- Next.js
- React
- Mantine (for UI components)
- Prisma (for database interactions)

**Database:**
- PostgreSQL (hosted on Neon)

**Deployment:**
- Vercel

## Getting Started

### Prerequisites
- Node.js and npm installed
- PostgreSQL database (you can use Neon or any other hosted service)
- A Vercel account for deployment

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Aamr-mohamed/ToDoAppNext.git 
    cd ToDoAppNext
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables:
    Create a `.env` file in the root of the project and add the following:
    ```plaintext
    DATABASE_URL=your_database_url
    ```

4. Run the Prisma migrations:
    ```bash
    npx prisma migrate dev
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Deployment
To deploy the application on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, etc.).
2. Sign in to your Vercel account and create a new project.
3. Connect your repository and configure the environment variables in the Vercel dashboard.
4. Deploy the project and access it via the provided URL.

## Usage
After deploying, you can access the To-Do app through your Vercel URL. Users can register or log in to manage their tasks. The app provides an intuitive interface for adding, updating, and deleting tasks.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

