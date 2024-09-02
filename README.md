# JOB-HUNTER

## Overview

"Job-hunter" is a Node.js Express application with MongoDB, utilizing the Mongoose ODM for efficient data management. The app offers RESTful APIs for creating, retrieving, and updating posts, along with features for liking, commenting, and managing user profiles.

The platform supports two roles: users and recruiters. Users can interact with posts and manage their profiles, while recruiters can post jobs, manage applications, and select candidates. Upon selection, candidates receive an email notification.

Key technologies include Zod for robust data validation, JWT for secure authentication, and bcryptjs for password hashing. User registration and login are required for access to the app's read, write, and update functionalities, ensuring a secure and efficient experience.

#### SERVER_URL : https://jobhunterserver.vercel.app/

#### FRONT_END_URL : https://jobhunterclient.vercel.app/

### API DOCUMENTATION LINK

- URL- https://documenter.getpostman.com/view/24264729/2sAXjM3r3B

## Technologies

```
  * Backend :
      - TypeScript, Node.js, Express.js, MongoDB, Mongoose, Zod, Bcrypt, JWT, nodemailer

  * Frontend :
      - TypeScript, Next.js, Redux, Tailwindcss, NextUI, Rtk query, sonner, react-hook-form
```

## Features

- Role-Based Access: Supports two user roles—users and recruiters—with specific functionalities for each, such as job posting and candidate selection.
- RESTful APIs: Provides APIs for creating, retrieving, and updating posts, as well as for managing likes, comments, and user profiles.
- Data Validation: Utilizes Zod for robust data validation to ensure the integrity of user inputs.
- Secure Authentication: Implements JWT for secure user authentication and bcryptjs for password hashing.
- Email Notifications: Sends automated email notifications to users selected for job roles.

## How to run

- First, clone the repo and install the dependencies using `npm install` command.
- Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL="mongodb://localhost:27017/job_hunter"
JWT_SECRET= <Your JWT Secret>
```

- then, build the project using `npm run build` command.
- at last, run the project using `npm run dev` command.

## Demo Login Credentials

```
* Recruiter:
  - Email: wipad52531@eixdeal.com
  - Password: Pa$$w0rd!
* User
  - Email: vicew79748@kwalah.com
  - Password: Pa$$w0rd!
```
