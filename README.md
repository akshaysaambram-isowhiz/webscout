# Webscout

## Installation

1. **Install Node.js**

   - Download and install Node.js from the [official website](https://nodejs.org/).
   - Follow the installation instructions for your operating system.

2. **Configure the Database**

   - Modify the database credentials in `server/src/server.js`:

     ```js
     const client = new Client({
       host: "your-database-host",
       user: "your-database-user",
       password: "your-database-password",
       database: "your-database-name",
       port: "your-database-port",
     });
     ```

3. **Start the Application**
   - Navigate back to the root directory or ensure you are in the project folder.
   - Install the application dependencies:
     ```bash
     npm install
     ```
   - Start the application in development mode:
     ```bash
     npm run dev
     ```

## Project Structure

- `server`: Contains the server-side code.
- `src`: Contains the client-side application code.

## Technologies Used

- Node.js
- Express
- React
- Vite
