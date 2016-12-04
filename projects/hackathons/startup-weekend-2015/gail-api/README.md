# Startup Weekend 2015, Team Gail
For Startup Weekend 2015 at SJSU, I was the backend developer for our startup Gail. I implemented document based system that our CEO envisioned and made into a RESTful API using [Node.js](http://nodejs.org/) as an [Express](http://expressjs.com/) app.

# Getting Set Up
Firstly, run

```
npm install
```

to install the app dependencies. After, ensure you override the values in the `config.json` file. The file looks like this:

```
{
    "user": "user",
    "pass": "pass",
    "host": "host",
    "port": "port",
    "db": "db",
    "saltConstant": number
}
```

This file specifies the connection settings for connecting to a MongoDB database in which the documents will be stored. 

The server uses basic HTTP authentication and stores the passwords as hashes. The `saltConstant` value is used to create a salt constant that is used to hash strings. Make sure you change this value and keep it **constant**.

To run the server, you also need to have [Babel](https://babeljs.io/) installed, so run

```
npm -g i babel
```

or 

```
sudo npm -g i babel
```

if you're on Linux or Mac or something.

To run the server, run

```
babel-node lib/app
```

or

```
npm start
```

or if you have the [Heroku toolbelt](https://toolbelt.heroku.com/) installed

```
foreman start web
```

# Database Schema
The database will have two collections: `documents` and `employees`. The `employees` collection will simply contain a collection of people that are employees of the hospital/clinic. Adding employees should be done with an internal tool using [Bcryptjs](https://www.npmjs.com/package/bcryptjs) and the same salt constant in the `config.json` file.

An employee has the following schema:
```
{
    _id: String, // A v4 UUID
    name: String,
    passHash: String,
    title: String // Doctor or Nurse 
}
```

And here's the document schema:
```
{
    _id: Number, // A numerical representation of the date of creation
    dateOfCreation: Date,

    // Nurse fields
    name: String,
    age: Number,
    dob: Date,
    height: Number,
    weight: Number,
    bloodPressure: {
        dystol: Number,
        systol: Number
    },
    temperature: Number,
    symptoms: String,
    currentMedication: String,
    allergies: String,

    // Doctor fields
    diagnosis: String,
    perscription: String,
    followUp: Date,

    // Assigned people by UUID
    assignedNurse: String,
    assignedDoctor: String
}
```