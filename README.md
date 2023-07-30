## Title and Description

REST NEWS API

API calls for fetching NEWS.

This API call is used to login, Register, Update prefernces, get data based on preferences. It has the local host 3000.Postman has to be installed for updations and login/Register. The URL is as shown-http://localhost:3000/. 

## Installation

Steps of installation.
1. Copy the folder to any path.
2. Open the folder in Visual Studio Code.
3. Once done Open Terminal in Visual Studio code and install all pre requisites.
4. npm install command in terminal
5. The Src will have all required codes.
6. Node has to be installed.
7. Run node Src/app.js
8. If you see Server and Database started you are ready to use.#/Screenshots/Screenshot1
9.Open the URL is browser. You will find Welcome message.

## API call Formats

All API calls
Implement a RESTful API with the following endpoints:

1. POST /signup: Register.--http://localhost:3000/signup - Register.
    {
    "fullName":"user",
    "email":"user@gmail.com",
    "password":"password",
    "Preferences":"business"//business','entertaiment','science'.
    }
    (The preferences are based on selected API's if required have to add another api's just in newsapi.js and promise.)
2. POST /signin: Login.--http://localhost:3000/signin - login.
    {
        "email":"user@gmail.com",
        "password":"password",
    }
    Token will be generated once logged in.
3. Get /news: Get news as per selected preference.--http://localhost:3000/news -need Curl or Postman.
   a.JWT token has to be added as authorization- JWT <token>.
4.  Get /preferences: To check the preference selected.--http://localhost:3000/preferences -need Curl or Postman.
   a.JWT token has to be added as authorization- JWT <token>.
5. PUT /preferences: To update the preference.--http://localhost:3000/preferences -need Curl or Postman.
   a.JWT token has to be added as authorization- JWT <token>.
   b.JSON as below
    {
    "preferences":"entertainment"
    }

It has validations for invalid inputs.
# News-API-with-Register-Login
