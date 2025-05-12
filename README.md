Webboard App

A full-stack webboard application built with Next.js (Frontend) and NestJS (Backend). 
Users can post and comment using a lightweight authentication system.

---

Features:

- Default login with just a username (password optional)
- Create posts and add comments
- Backend with MongoDB / unit tests

---

Tech Stack:

- Frontend: Next.js
- Backend: NestJS

---

Setup Instructions:

Frontend Setup (Next.js):

cd client
npm install
npm run dev

- Runs at http://localhost:3000

---

Backend Setup (NestJS):

cd server
npm install
npm run start:dev

- Runs at http://localhost:4000

To run tests:

npm run test

---

Authentication Notes:

- By default, users can log in with just a username.
- Optionally, the app also supports login with both username and password.

---

Environment Variables:

Backend (.env):
PORT=4000
MONGODB_URI=mongodb://localhost:27017/webboard

Frontend (.env.local):
NEXT_PUBLIC_API_URL=http://localhost:4000