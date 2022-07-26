# Form Validation Website

This project is a web form that has validated fields (name, surname, birth date, email and gender checkbox).

## Description

- The project is created with npx create-react-app.
- It has three required fields (name, surname and email).
- The email is validated with a real time async call.
- The name and surname are validated to have at least 3 characters.
- The user must be 18 years at least.
- It uses "react-loader-spinner" package during the asyn call.
- No styling framework is used (Bootstrap, formik, MUI).
- Implemented "CORS Anywhere" which is a NodeJS proxy that adds CORS headers to the proxied request to avoid “No Access-Control-Allow-Origin header” problems.

## Executing program

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Author

Abdulhameed Hameed
hameed.babba@gmail.com
