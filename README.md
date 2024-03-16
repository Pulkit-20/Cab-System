# Cab System

Cab System is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application implements Dijkstra's algorithm for finding the shortest path between locations.

## Features
- Admin can book cabs for customers.
- Dijkstra's algorithm is used to find the shortest path between locations.
- Admin can track cabs.
- Admin can edit cab details.

## Technologies Used
- MongoDB: NoSQL database for storing cab and booking information.
- Express.js: Backend framework for handling HTTP requests and routes.
- React.js: Frontend library for building user interfaces.
- Node.js: JavaScript runtime environment for executing server-side code.
- Mongoose: MongoDB object modeling for Node.js.
- Material-UI: React component library for UI design.
- Dijkstra's Algorithm: Used for finding the shortest path between locations.

## Getting Started
1. Clone the repository: `git clone https://github.com/Pulkit-20/Cab-System.git`
2. Navigate to the project directory: `cd Cab-System`
3. Install dependencies:
   - Backend: `npm install`
   - Frontend: `cd frontend && npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory and define environment variables like MongoDB connection URI and port.
5. Start the development server:
   - Backend: `npm start` or `npm run dev` for development with nodemon
   - Frontend: `npm start`
6. Access the application at `http://localhost:3000` in your browser.

## Contributing
Contributions to Cab System are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
