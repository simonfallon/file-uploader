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

```
npm build
```

### 3. Set up .env files and DB

Configure .env files in each folder as described in their README. 
Set up DB as described in backend/README.md

### 4. Run the Application

```
npm start
```
 
### 5. Usage

- Open the frontend application [in your browser](http://localhost:3000).
- Use the file upload form to upload files.
- View the list of uploaded files to delete or download them as needed.