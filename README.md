# TalentPool

TalentPool is a platform that connects job seekers with hiring managers and small business owners. It enables job seekers to create and manage multiple CVs, increasing their chances of being hired. Employers can browse through potential candidates and connect with the right talent for their needs.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Structure
The repository consists of two main directories:

- `frontend/` - The React (Vite) application for the TalentPool platform.
- `backend/` - The Node.js and Express.js API that handles authentication, user data, and business logic.

## Features
- **Job Seekers:**
  - Create and manage multiple CVs.
  - Update profiles with relevant details.
  - Browse job opportunities.
- **Hiring Managers:**
  - Search and filter job seekers based on skills and experience.
  - Connect with potential candidates.
- **General Features:**
  - Secure authentication with JWT.
  - Image and document uploads using Cloudinary.
  - Real-time data fetching with React Query.

## Tech Stack
### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- React Query
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (for media storage)
- Multer (file uploads)

## Installation
Follow these steps to set up the project locally:

### 1. Clone the Repository
```sh
git clone https://github.com/franklinobiukwu/_talentPool.git
cd _talentPool
```

### 2. Backend Setup
```sh
cd backend
npm install
```
Create a `.env` file in the `backend/` directory and add the necessary environment variables (see [Environment Variables](#environment-variables)).

Start the backend server:
```sh
npm run dev
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
```
Start the frontend application:
```sh
npm run dev
```

## Usage
Once both the frontend and backend are running:
- Open `http://localhost:5173` in your browser to access the TalentPool frontend.
- The backend will be running on `http://localhost:5000` (or the port specified in the `.env` file).

## Environment Variables
Ensure you create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).


