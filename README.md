# Travel Booking Web Application

This is a web application for booking trains, hotels, and cars. It offers users the ability to search for, book, and manage their travel plans. The application features secure authentication using JWT tokens, email notifications after successful bookings, and user-friendly login and signup pages.

## Features

- **JWT Authentication**: Users can securely sign up, log in, and manage sessions with JSON Web Tokens (JWT).
- **Booking System**: Users can book trains, hotels, and cars and receive a confirmation email upon successful booking.
- **Email Notifications**: Automated email notifications are sent to users after a successful booking.
- **Login and Signup Pages**: User-friendly login and signup pages for easy access.
- **Responsive Design**: The frontend is responsive and mobile-friendly.

## Technologies Used

### Frontend:
- **React JS**: For building the user interface.
- **CSS/Bootstrap**: For responsive design and layout.
- **Axios**: For making HTTP requests to the backend API.

### Backend:
- **Node.js**: For the backend server.
- **Express.js**: For routing and handling API requests.
- **JWT (JSON Web Tokens)**: For secure user authentication and session management.
- **Nodemailer**: For sending confirmation emails to users after bookings.
- **MongoDB**: For storing user data, booking information, and more.
  
## Setup

### Prerequisites:
- [Node.js](https://nodejs.org/) installed
- MongoDB installed or use a cloud-based MongoDB service like MongoDB Atlas

### Installation:

1. Clone the repository:
    ```bash
    git clone https://github.com/vinayganta10/JourneyEase.git
    cd JourneyEase
    ```

2. Install the backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Install the frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

4. Set up environment variables for the backend:
    Create a `.env` file in the `backend` directory with the following details:
    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE=your_email_service
    EMAIL_USERNAME=your_email_username
    EMAIL_PASSWORD=your_email_password
    ```

5. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

6. Start the frontend server:
    ```bash
    cd ../frontend
    npm start
    ```
## Contributing

Contributions are welcome! Please fork the repository and create a pull request.
