# Job-Vault

A job application tracker that keeps career searches concise and simple, as it should be.

## Overview

Job-Vault is my answer to the very relatable struggle that comes from searching for a co-op or internship. Scattered applications to hundreds of companies that you can't seem to manage is a nightmare! The obvious solution: creating a personalized dashboard for storing job applications that is user friendly and easy to query. Now finding and updating a specific job or group of applications is a breeze, giving you more time to focus on the skills that led you to apply in the first place.

## Features

- Upload information about a specific job application, including a specific resume or notes about a particular posting
- Edit and keep track of existing applications as your job search changes
- Enter the app through an intuitive authorization workflow that also supports registration/login via Google O-Auth
- Querying applications becomes easy with the use of filters and search tags on existing applications
- Storage is gracefully handled via PostgreSQL for relational data and AWS S3 for targeted object storage of resumes

## Tech Stack

**Frontend:**

- React
- React Router
- Vite
- Tailwind CSS
- Ant-Design

**Backend:**

- Node.js
- Express
- Express-session
- Express-rate-limit
- PostgreSQL relational data
- AWS / Amazon Web Services S3 (Resume Storage)

## Deployment

**Frontend:** Vercel  
**Backend:** Railway  
**Database:** Railway PostgreSQL

Currently live and accessible at: [Job-Vault](https://job-application-tracker-eta-livid.vercel.app/)

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database deployment
- AWS S3/IAM configuration
- Google Cloud Console OAuth configuration

### Installation

**Frontend:**

```bash
cd frontend/jobAppTracker-frontEnd
npm install
```

**Backend:**

```bash
cd backend
npm install
```

## Environment Setup

Included in the ".env.example" files in the frontend and backend

## Project Structure

```
jobAppTracker/
├── frontend/
│   └── jobAppTracker-frontEnd/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── App.jsx
│       ├── package.json
│       └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── server.js
│   │   └── postgresClient.js
│   └── package.json
└── README.md
```


## Learning Outcomes

This project provided hands-on experience in:
- **Full-stack Development:** Building a cohesive web application that communicates from frontend to backend with database integration
- **Authentication & Security:** Implementing large scale authentication via hashing and sessions, with support for ease of access with Google OAuth
- **Database Design** Migrating from SQLite in development to PostgreSQL taught me a lot about storage tradeoffs and SQL querying
- **Frontend Best Practices:** React hooks, state management, responsive design with Tailwind CSS and Ant Design
- **Cloud Services:** The use of AWS S3 helped enrich my understanding of cloud services and storage best practices for large scale applications

## Planned Features

- Email notifications for upcoming application deadlines or inactivity
- Integration of a context-driven chatbot that provides feedback and suggestions on job applications
## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request with any improvements.


## Connect With Me

If you have any suggestions or thoughts about Job-Vault, please let me know:

- **LinkedIn:** [Arjun Mandair](https://www.linkedin.com/in/arjun-mandair-9b4a70378)
- **GitHub:** [arjunMandair17](https://github.com/arjunMandair17)
