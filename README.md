<!-- Please update value in the {}  -->

<h1 align="center">{devchanllenges}</h1>

<div align="center">
   Solution for a challenge from  <a href="https://investondaba.notion.site/Fullstack-Intermediate-Test-2-c911eab2a18446d4a87eb5ca938f13ad" target="_blank">daba full stack intermediate coding exercise</a>.
</div>

<div align="center">
  <h3>
    <a href="https://{your-demo-link.your-domain}">
      Demo
    </a>
    <span> | </span>
    <a href="https://{your-url-to-the-solution}">
      Solution
    </a>
    <span> | </span>
    <a href="https://investondaba.notion.site/Fullstack-Intermediate-Test-2-c911eab2a18446d4a87eb5ca938f13ad">
      Exercise
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![Videos]->(https://drive.google.com/file/d/1QBGmQTqy0dNKX-ecODz-fvaMh__ayAEM/view?usp=sharing), (https://drive.google.com/file/d/1IaN749h_c8UXEUwRBL2EFFdM4x_9DFdq/view?usp=sharing)

An Authentication app that allows users to create an account and manage their personal info.
Only Authenticated users can view and edit their personal info


- Where can I see your demo?
 https://dabatech-client.vercel.app/

- What was your experience building it.
This is my first time deploying a typescript app on my own.


### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Apollo Graphql](https://www.apollographql.com/docs/react)
- [TypeGrapQL](https://typegraphql.com/)
- [Prisma](https://www.prisma.io/client)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

What features did you develop?
- SignUp
- SignIn
- Edit user's info
- Verify user's token when they make a request
- Hash user's before storing it into the database

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/gideonokyere/datatech.git

$ cd dabatech

It contains two folders which are frontend and backend

#Frontend Setup.
$ cd frontend

$ npm install

#Run the app
npm start

The frontend is connected to the production server by default. You can change it by editing src/index.js on line 12

# Backend Setup
$ cd backend

create a .env file inside the root directory and add this tow variables. DATABASE_URL=Your_postgres_database_url, JWT_SIGNATURE=Your_JWT_secret

$ npm install

#Generate database tables
$ npx prisma db push

# Run the app
$ npm run dev
```