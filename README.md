# Ecowise Backend API

## Description

This repository contains the backend API for the Ecowise project. The backend is built using Express.js and provides several endpoints for user authentication and prediction data management. Additionally, the backend is deployed on Google Cloud Compute Engine, with PostgreSql as the database.

## Features

- Develop Backend API for Register, Login, Logout, Get Login User, Get Leaderboard and Update User's Profile using Express.js
- Create Backend API to Update User Points After Making Predictions and Retrieve Prediction Details using Express.js
- Perform API Testing with Postman
- Deploy Backend on Google Cloud Compute Engine
- Create a PostgreSQL database on Cloud SQL
- Create a Google Cloud Storage Bucket for loading machine learning models and handling POST and GET operations for user profile pictures
- Create firewall rules

## Getting Started

### Prerequisites

- Node.js
- Express.js
- PostgreSql
- Postman
- Google Cloud Account

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Capstone-Ecowise/CC-Ecowise.git
    ```
2. Install dependencies:
    ```sh
    cd CC-Ecowise
    npm install
    ```
3. Set up PostgreSql database on Google Cloud Compute Engine.

### Running the API

Start the server:
```sh
npm start
```

The backend API will be available at `35.219.100.138:3000`.

## API Endpoints

### User Authentication

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Logout**: `POST /api/auth/logout`
- **Get Login User**: `GET /api/user/profile`
- **Get Leaderboard**: `GET /api/user/leaderboard`
- **Update User's Profile**: `PUT /api/user/profile`

### Prediction Data

- **Store Prediction Data**: `POST /api/predict/model`

## Testing

Perform API testing using Postman:
1. Import the Postman collection provided in the repository.
2. Run the tests to ensure all endpoints are working correctly.

## Deployment

### Deploy Backend on Google Cloud Compute Engine

1. Set up a VM instance on Google Cloud Compute Engine.
2. SSH into the VM and clone the repository.
3. Install Node.js and other dependencies on the VM.
4. Configure and start the backend server on the VM.

### Deploy MySQL on Google Cloud Compute Engine

1. Set up a PostgreSql instance on Google Cloud Compute Engine.
2. Configure the database and update the backend API to connect to this instance.

### Create Firewall Rules

1. Create firewall rules to allow traffic on the required ports for your backend API and PostgreSql instance.

## Contributors

| Name                | ID               |
|---------------------|------------------|
| Fadhail Athaillah Bima  | C200B4KY1312 |
| Maulana Pasya Zefanya | C200B4KY2436   |

---

Feel free to reach out if you have any questions or need further assistance!
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance!
