# PixelPlay — Video Streaming Platform

> A full-stack video streaming platform enabling seamless video upload, management, and real-time streaming with efficient bandwidth usage via HTTP Range Requests.

---

## Live Demo

[https://youtube-front-vmd1.vercel.app/](#)

---

## Overview

PixelPlay is a production-ready video streaming application built with the MERN stack. It leverages **HTTP Range Requests** for efficient partial content delivery, allowing users to seek through videos instantly without buffering the entire file. Media assets are managed through **Cloudinary**, while metadata is persisted in **MongoDB**.

This project demonstrates proficiency in full-stack development, RESTful API design, cloud storage integration, and media streaming architecture.

---

## Key Features

- **Video Upload & Management** — Upload videos with titles and descriptions; manage them via a clean dashboard
- **Efficient Streaming** — HTTP Range Request support enables instant seeking, reduced bandwidth consumption, and smooth playback
- **Cloud Storage** — Videos stored and delivered via Cloudinary's CDN for fast global access
- **Responsive UI** — Fully functional across desktop, tablet, and mobile
- **RESTful API** — Clean, well-structured endpoints for all operations

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Cloud / Media | Cloudinary |

---

## Architecture

```
Client (React)
    │
    │  HTTP Requests (JSON / Range Headers)
    ▼
Express.js Server
    ├── /upload      →  Cloudinary SDK  →  Cloudinary Storage
    ├── /videos      →  MongoDB (metadata read)
    └── /stream/:id  →  HTTP Range Response (partial content)
```

**How streaming works:**

1. User selects a video; client sends a `GET /stream/:id` request with a `Range` header
2. Server fetches the byte range from Cloudinary and pipes it to the client with a `206 Partial Content` response
3. Only the requested portion of the video is transferred — enabling seek-without-download

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/videos` | Retrieve all video metadata |
| `GET` | `/video/:id` | Get details for a specific video |
| `POST` | `/upload` | Upload a new video to Cloudinary |
| `GET` | `/stream/:id` | Stream video with range-request support |


---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account

### 1. Clone the Repository

### 2. Install Dependencies

### 3. Run the Application

```bash
# Start frontend dev server
 npm run dev
```

The app will be available at `http://localhost:5173` (frontend).

---

## Roadmap

| Feature | Status |
|---|---|
| User authentication (JWT) | Planned |
| Like & comment system | Planned |
| Video analytics dashboard | Planned |
| ML-based video recommendations | Planned |

---

## Author

**Amit Verma**
[https://github.com/GitCoder820 ](#)

---

*If you found this project useful, consider giving it a ⭐ on GitHub.