# ConnVerse

This is the official repository for CS253 Course Project - ConnVerse from Team MahaDevS. ConnVerse is the Connect and Converse App set up for IITK Community where we are bringing students and alumni on the same table where people can have formal conversations about Research, Academia, Projects and Opportunities.

Addressing the prevalent networking challenges in our college, our team introduces "ConnVerse - Connect and Converse" – a one-stop solution for all our connection problems. Students can create profiles with details like department, year, responsibilities, and courses taken. For instance, someone seeking advice on a course can search ConnVerse for individuals who have taken it and connect with them. Privacy is our top priority, and we will facilitate direct messaging as well. Alumni, verified by our team, can share motivational content and job/internship opportunities through posts and blogs. Our vision is to build a LinkedIn-like platform, creating a "bridge" between all the current students and alums, ensuring seamless use and privacy protection.

# Deployed Website

- https://conn-verse.vercel.app/

# Installation

- clone the repository using : `git clone <repository_link>` OR Download the ZIP file for the same.
- Go to the Project direcotry : `cd ConnVerse`
- Go to the code implementation : `cd CodeImplementation`

## Frontend

- Frontend is created using React.JS framework
- Node version 20.\* is required. Node installtion guide: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
- Go to the frontend : `cd frontend`
- build command :
  - ` npm install --legacy-peer-deps`
- run command :
  - `npm run start`

## Backend

- Backend is created in Golang using go-gin library.
- - Go to the frontend : `cd backend`
- Go installation guide : https://go.dev/doc/install
- Build and run guide : https://go.dev/doc/tutorial/compile-install
- build command :
  - ` go build -o ./app`
- run command ( On linux and Mac ) :
  - `./app`
- run command ( On Windows ) :
  - `app.exe`
- `.env` file:

```
PORT=<PORT_NUMBER_FOR_BACKEND>
SECRET=<JWT_SECRET>
EMAIL_ID=<EMAIL_ID_TO_SEND_OTP
EMAIL_PASS=<EMAIL_APP_PASSWORD>
MONGO_URI=<YOUR_MONGODB_URI>
```

## Chat Service

- We have implemented a microsevice for chat using Node.JS + Express.JS
- Go to the frontend : `cd chat_service`
- build command :
  - ` npm install --legacy-peer-deps`
- run command :
  - `npm run start`
- `.env` file:

```
PORT=<PORT_NUMBER_FOR-CHAT>
SECRET=<JWT_SECRET>
MONGO_URI=<YOUR_MONGODB_URI>
```

## Database Initialization:

- There is a python script that assist you to initialize database.
- Go to the frontend : `cd DatabaseInitialization`
- Installation of python : https://docs.python.org/3/using/index.html
- Installation of pip : https://packaging.python.org/en/latest/tutorials/installing-packages/
- Install requirements :
  - ` pip install pymongo`
- Initialize database :
  - ` python initDB.py`

## Important Notes:

- One must initialize the database.
- Make sure that backend and chat_service are working at same time to work app properly.
- If you change the backend(also chat_service) port or url, do not forget to change the API requests in the frontend.

- MahaDevS
