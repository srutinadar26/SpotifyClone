# 🎵 SpotifyClone

A full-stack Spotify Clone built with the **MERN stack** — allows users to register, log in, upload/stream music, and manage albums, with cloud-based file storage.

---

## 🚀 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- React Router

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file upload handling)
- ImageKit (cloud storage)
- dotenv

---

## 📁 Project Structure

```text
SpotifyClone/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .gitignore
│   │
│   └── src/
│       ├── app.js
│       ├── controllers/
│       │   ├── album.controller.js
│       │   ├── auth.controller.js
│       │   └── music.controller.js
│       ├── db/
│       │   └── db.js
│       ├── middleware/
│       │   ├── auth.middleware.js
│       │   └── multer.middleware.js
│       ├── models/
│       │   ├── album.model.js
│       │   ├── music.model.js
│       │   └── user.model.js
│       ├── routes/
│       │   ├── album.routes.js
│       │   ├── auth.routes.js
│       │   └── music.routes.js
│       └── services/
│           └── storage.services.js
│
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    │
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── components/
        ├── pages/
        ├── context/
        ├── services/
        └── assets/
```

---

## ⚙️ Features

**🔐 Authentication**
- User registration & login
- JWT-based authentication with protected routes
- Artist-specific authentication middleware

**🎵 Music**
- Upload, store, and stream music tracks
- Fetch and manage uploaded tracks

**💿 Albums**
- Create albums
- Fetch all albums or a single album by ID

**☁️ File Storage**
- Multer for handling multipart uploads
- ImageKit for cloud storage & delivery

**🖥️ Frontend**
- Responsive UI for browsing, playing, and uploading music
- Auth flows (login/register) wired to backend JWT
- Album and track views

---

## 🔌 API Reference

### Auth — `/api/auth`
| Method | Endpoint    | Description         |
|--------|-------------|----------------------|
| POST   | `/register` | Register a new user  |
| POST   | `/login`    | Log in a user        |

### Music — `/api/music`
| Method | Endpoint     | Description       |
|--------|--------------|--------------------|
| POST   | `/upload`    | Upload music       |
| POST   | `/album`     | Create an album    |
| GET    | `/albums`    | Get all albums     |
| GET    | `/album/:id` | Get album by ID    |

> Update the auth table above if your actual route names differ.

---

## 🛠️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd SpotifyClone
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Run the backend:

```bash
node server.js
```

Backend runs on `http://localhost:3000`.

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Run the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` (default Vite port).

> ⚠️ Never commit `.env` files to GitHub.

---

## ▶️ Running the Full App

Run backend and frontend in two separate terminals:

```bash
# Terminal 1
cd backend && node server.js

# Terminal 2
cd frontend && npm run dev
```

---

## 📌 Roadmap

- [x] Backend: server, DB, models, middleware, routes, controllers
- [x] Frontend: base UI, routing, auth pages
- [ ] Full API testing
- [ ] Frontend ↔ backend integration testing
- [ ] Music streaming (proper audio player)
- [ ] Playlists
- [ ] Likes & favorites
- [ ] Music search
- [ ] User profiles
- [ ] Artist dashboard
- [ ] Recently played tracks
- [ ] Deployment (frontend + backend)

---

## 🧑‍💻 Development

This is a monorepo containing both the client and server for the SpotifyClone project. Frontend and backend are developed and run independently but share the same repo.

---

### 🎧 Built with the MERN Stack (MongoDB, Express, React, Node.js)
