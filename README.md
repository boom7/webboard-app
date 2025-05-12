# Webboard App

A full-stack webboard application built with **Next.js** (Frontend) and **NestJS** (Backend).  
Users can post and comment using a lightweight authentication system.

---

## Features

- Login with username (password optional)
- Create posts and add comments
- Backend powered by MongoDB
- Includes unit tests

---

## Setup Instructions

### Frontend (Next.js)

```bash
cd client
npm install
npm run dev
```

Runs at: [http://localhost:3000](http://localhost:3000)

---

### Backend (NestJS)

```bash
cd server
npm install
npm run start:dev
```

Runs at: [http://localhost:4000](http://localhost:4000)

To run tests:

```bash
npm run test
```

---

## Authentication

- Users can log in with just a username by default.
- Optionally supports login with both username and password.

---

## Environment Variables

### Backend (`.env`)
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/webboard
```

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```