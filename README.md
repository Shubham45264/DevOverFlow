# DevOverflow Application

## Project Overview

DevOverflow is a **community-driven Q&A platform** inspired by Stack Overflow, designed to help developers ask questions, share knowledge, and build reputation through meaningful contributions.

The application emphasizes **clean architecture**, **secure authentication**, **scalable backend design**, and a **modern user experience**. It is built using **Next.js App Router** and **Appwrite**, and deployed in a production environment using **Vercel**.

---

## Key Features

### Authentication

* Email & password–based authentication
* Secure session handling using Appwrite

### Questions & Answers

* Ask and answer programming-related questions
* Browse latest and trending questions

### Reputation System

* Reputation increases based on user activity
* Dynamic reputation updates on user profiles

### User Profiles

* View questions asked and answers given
* Contribution and reputation statistics

### UI & UX

* Modern, clean interface with animations
* Fully responsive across devices

### Deployment

* Frontend deployed on Vercel
* Backend powered by Appwrite Cloud

---

## Tech Stack

### Frontend

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **State Management:** React Context / Custom Stores
* **UI Components:** Custom Components + Magic UI

### Backend

* **Backend-as-a-Service:** Appwrite
* **Authentication:** Appwrite Auth
* **Database:** Appwrite Databases
* **User Management:** Appwrite Users API

### Deployment

* **Frontend Hosting:** Vercel
* **Backend Hosting:** Appwrite Cloud

---

## Screenshots

### Home Page

<img src="https://github.com/user-attachments/assets/cf3e4bc9-af80-4174-b07d-c8d2c65f2c6d" alt="Home Page" />

### Login Page

<img src="https://github.com/user-attachments/assets/1d9d0fc7-8746-4201-a206-8b487ab1ca3d" alt="Login Page" />

### Register Page

<img src="https://github.com/user-attachments/assets/ef18926b-42d4-49a8-b53d-82cc7c8d5f05" alt="Register Page" />

### Ask Question

<img src="https://github.com/user-attachments/assets/ea759386-ff06-4f5f-9115-df1f69b500fc" alt="Ask Question Page" />

### Question Details & Answers

<img src="https://github.com/user-attachments/assets/d2ff8e30-0500-4400-9353-2ba064f89edd" alt="Question Details Page" />

### User Profile

<img src="https://github.com/user-attachments/assets/d7a445bf-d4e3-45d3-ba38-52a34146eab7" alt="User Profile Page" />

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Global layout
│   ├── login/
│   ├── register/
│   ├── questions/
│   ├── users/
│   └── api/
│
├── components/
│   ├── HeroSection.tsx
│   ├── Footer.tsx
│   ├── LatestQuestions.tsx
│   └── TopContributors.tsx
│
├── lib/
│   └── appwrite-client.ts    # Client-side Appwrite SDK
│
├── models/
│   └── server/               # Server-side Appwrite SDK
│
└── store/
    └── Auth.ts               # Authentication state
```

---

## Installation & Setup

### Prerequisites

* Node.js (v18+ recommended)
* Appwrite Cloud account

---

### Clone the Repository

```bash
git clone https://github.com/Shubham45264/dev-over-flow.git
cd dev-over-flow
```

---

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_QUESTION_COLLECTION_ID=questions
NEXT_PUBLIC_APPWRITE_ANSWER_COLLECTION_ID=answers
NEXT_PUBLIC_APPWRITE_VOTE_COLLECTION_ID=votes

APPWRITE_API_KEY=server_only_api_key
```

> Never expose `APPWRITE_API_KEY` on the client.

---

### Run Locally

```bash
npm install
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## Deployment

* Frontend deployed using **Vercel**
* Environment variables configured via Vercel dashboard
* Appwrite platform domains configured for secure authentication
* HTTPS-enabled production deployment

---

## Key Learnings

* Proper separation of client and server Appwrite SDKs
* Secure authentication handling in production
* Debugging CORS, platform domains, and session cookies
* Designing scalable App Router architecture
* Implementing reputation-based systems

---

## Future Enhancements

* Upvote / downvote system
* Advanced search and tag filtering
* Notifications and activity tracking
* OAuth authentication (GitHub, Google)
* Moderation tools

---

## License

This project is created for educational and portfolio purposes.

---
