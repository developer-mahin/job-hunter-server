# JOB-HUNTER

## Technology Stack:

- TypeScript for programming language
- Express.js for the web framework
- MongoDB and mongoose for ODB
- JWT for authentication

## Uses Technology:

Job-hunter is a basic Node.js Express application with mongoDB database with popular ODM ( Object Data Mapping) Mongoose uses in this project. It provides RESTful APIs for creating, retrieving, updating posts and giving access to provide likes and comments and user can visit profile and update as their expectation.
In this project I have use Zod for data validation. Authentication and authorization using jwt , and bcryptjs used for password hashing.
Authentication:
Users are required to register and log in to access to Read, Write, And Updating features. JSON Web Tokens (JWT) are used for authentication.

#### SERVER_URL : https://jobhunterserver.vercel.app/

#### FRONT_END_URL : https://jobhunterclient.vercel.app/

### API DOCUMENTATION LINK

- URL- https://documenter.getpostman.com/view/24264729/2sA2r824DT

# Functionality:

## AUTH Management:

### CRUD Operations:

- User Registration
- Login User
- Change Password
- Forgot Password
- Reset Password
- Refresh Token

## USER Management:

### CRUD Operations:

- Retrieve All User
- Retrieve A Single User
- Get My Profile
- Update My Profile Information

## Post Management

### CRUD Operations:

- Create Post
- Retrieve All Posts
- Retrieve A Single Post
- Retrieve My Posts
- Retrieve Another User Posts
- Update Post
- Delete Post
- Access To Provide Likes Or Unlike
- Retrieve All Liked Users
- Create Comments
- Update Comment
- Delete Comment

### Install Dependencies / Dependencies that i have used

1. express // for server creation
   - npm install express
2. mongoDB // Mongoose ODM for connection building with MongoDB
   - npm install mongodb
   - npm install mongoose
3. zod // For validation users data
   - npm install zod
4. cors // helps you handle CORS-related issues when making requests from different domains
   - npm install cors
5. dotenv // For env variables
   - npm install dotenv
6. bcryptjs // for secure password
   - npm install bcryptjs
7. JWT or jsonwebtoken // for authentication and authorization
   - npm install jsonwebtoken
8. nodemailer // for email verification
   - npm install nodemailer

## How to run

- First, clone the repo and install the dependencies using `npm install` command.
- Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL="mongodb://localhost:27017/job_hunter"
JWT_SECRET= <Your JWT Secret>
```

- then, build the project using `npm run build` command.
- at last, run the project using `npm run dev` command.
