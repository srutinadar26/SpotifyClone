# Spotify Clone Backend

Backend API for a Spotify Clone built with **Node.js, Express.js, MongoDB, JWT Authentication and ImageKit**.

Handles authentication, music uploads, albums, database operations, and file storage.

---

## Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Backend framework
- **MongoDB** + **Mongoose** – Database & ODM
- **JWT** – Authentication
- **Multer** – File upload handling
- **ImageKit** – Cloud storage
- **dotenv** – Environment variables

---

## Project Structure

````text
backend/
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
│
└── src/
    ├── app.js
    │
    ├── controllers/
    │   ├── album.controller.js
    │   ├── auth.controller.js
    │   └── music.controller.js
    │
    ├── db/
    │   └── db.js
    │
    ├── middleware/
    │   ├── auth.middleware.js
    │   └── multer.middleware.js
    │
    ├── models/
    │   ├── album.model.js
    │   ├── music.model.js
    │   └── user.model.js
    │
    ├── routes/
    │   ├── album.routes.js
    │   ├── auth.routes.js
    │   └── music.routes.js
    │
    └── services/
        └── storage.services.js
````

---

## Features

**Authentication**
- User registration & login
- JWT-based auth with protected routes
- Artist authentication middleware

**Music**
- Upload, store, and fetch music tracks

**Albums**
- Create and fetch albums (individually or all)

**File Storage**
- Multer for uploads, ImageKit for cloud storage

---

## API Reference

### Auth — `/api/auth`
Registration, login, and authentication.

### Music — `/api/music`

| Method | Endpoint     | Description      |
|--------|--------------|-------------------|
| POST   | `/upload`    | Upload music      |
| POST   | `/album`     | Create an album   |
| GET    | `/albums`    | Get all albums    |
| GET    | `/album/:id` | Get album by ID   |

---

## Installation

````bash
git clone <your-repository-url>
cd backend
npm install
````

---

## Environment Variables

Create a `.env` file inside `backend/`:

````env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
````

> ⚠️ Never commit your `.env` file to GitHub.

---

## Run the Server

````bash
node server.js
````

Runs on `http://localhost:3000`.

---

## Roadmap

- [x] Server, DB, models, middleware, routes, controllers
- [ ] Full API testing
- [ ] Frontend integration
- [ ] Music streaming
- [ ] Playlists, likes/favorites, search
- [ ] User profiles & artist dashboard
- [ ] Recently played
- [ ] Deployment

---

## Monorepo Layout

````text
SpotifyClone/
├── backend/
└── frontend/
````
