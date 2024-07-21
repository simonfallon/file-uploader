# File Upload Application

This is a simple file upload application with a frontend built using Vue.js and a backend using Express.js. The application allows users to upload, view, and delete files.

## Project Structure

The project consists of two main folders:
- `frontend`: Contains the Vue.js frontend application.
- `backend`: Contains the Express.js backend server.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)

## Installation

Follow these steps to set up and run the application.

### 1. Clone the Repository

```bash
git clone https://github.com/simonfallon/file-uploader.git
cd file-uploader
```

### 2. Install Dependencies

#### For the Backend 

Navigate to the backend directory and install the backend dependencies.

```bash
cd backend
npm install
```

#### For the Frontend

Navigate to the frontend directory and install the frontend dependencies.

```bash
cd ../frontend
npm install
```

### 3. Run the Application

#### Start  the Backend

Navigate to the backend directory and start the server.

```bash
cd ../backend
npm start
```

The backend server will run on http://localhost:3000.

#### Start the Frontend

Navigate to the frontend directory and start the development server.

```bash
cd ../frontend
npm run serve
```

The frontend application will be available at http://localhost:8080.

### 4. Usage

- Open the frontend application in your browser (http://localhost:8080).
- Use the file upload form to upload files.
- View the list of uploaded files and delete them as needed.