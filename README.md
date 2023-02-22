**Lost in Translation**

Welcome to the Lost in Translation Application! This application is built using React and is designed to help users translate English words and short sentences into American Sign Language (ASL).

**Getting Started**

To get started with this project, follow these steps:

-   Clone the repository to your local machine.
-   Install the necessary dependencies by running **npm install** or **yarn install**.
-   Start the development server by running **npm start** or **yarn start**.
-   Navigate to **http://localhost:3000** in your web browser to see the application.

**Usage**

**Login Page**

To get started, you will need to log in to the application using your name. The login page will appear when you first launch the application. Once you enter your name, it will be saved to the Translation API. If you are already logged in, you will be redirected to the Translation page.

**Translation Page**

On the Translation page, you will see an input box where you can type the text you want to translate. Click on the "translate" button to trigger the translation. The translated text will appear in the box below. Please note that only the text will be stored in the API, not the sign language images.

The maximum length of input may be limited to 40 characters. Special characters and spaces may be ignored.

**Profile Page**

The profile page will display the last 10 translations for the current user. You will only see the text of the translation, not the sign language images. There is a button to clear the translations. Clicking on it will "delete" the records from the API, and they will no longer display on the profile page.

**Logout Button**

To log out, click on the "Logout" button. This will clear all the storage and return you to the start page.

**API**

This application uses the following API:

**https://fc1-assignment02-api-production.up.railway.app**

This API allows the application to store user information and translation history.

**Technologies Used**

This project was built using the following technologies:

-   React
-   CSS
-   Node.js

**Contribution**

Christos Giannikis https://github.com/ChrisGiannikis

Fotis Staikos https://github.com/NotFotis

**GitHub**

We made 3 branches to work with. The first thought was to have one branch for each of us to upload our changes at our own branch. However, during work, we decided to keep the Christos branch as a collective back-up branch, the Fotis branch as our initial branch and the default main branch, which is the final product of the assignment.

**URL**

The application is published with vercel hosting platform. The url is :

<https://lost-in-translation-fxjxfr8pr-chrisgiannikis.vercel.app>

**Conclusion**

Thank you for using the Sign Language Translator Application! We hope it helps you communicate more effectively with those who use American Sign Language.
