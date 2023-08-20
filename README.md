# TABLENOW

Tablenow is a real-time online reservation network web app for fine restaurants from different cities in Canada (Montreal, Ottawa and Niagara Region).
It allows you to make online reservations and also read restaurant reviews from diners.

## Features and Advantages

### Features

* The web application implements a reservation and availability system based on the opening hours of each restaurant, on the one hand, and on the other, it takes into account, based on the number of the party size, the number of tables in each restaurant, as well as the number of seats at each table.
* The project has a search bar on the homepage that displays a list of restaurants based on city, town or region searched. In each list of restaurant results the user has the option to even filter them based on price (cheap, regular, expensive), cuisine (french, peruvian, mexican, italian, etc.) and region.
* The project has sign in and sign up components to manage users.
* Each restaurant card component has a link page that displays more information about it (description, photos, reviews, menu and reservation options).
* Any visitor to our web application can make a reservation to a specific restaurant, but only users who have made a reservation to this restaurant and are registered will be able to leave a review on it.

### Advantages

* Thanks to the reliability, scalability, stability, and security provided by a PostgreSQL database, the project can be easily upscaled to include other cities from different regions across different countries.
* After the successful payment, the admin user is going to receive the money immediately in his/her account.

## Technologies applied to this project

* **TypeScript** a strongly typed programming language that builds on JavaScript, which help us write more reliable and maintainable code by catching errors and bugs at compile time, rather than at runtime.
* **Next.js** a powerful full-stack React framework.
* **Tailwind CSS** a utility-first CSS framework for rapid UI development of modern websites and applications.
* **Material UI** to design a web application based on the best practices in UI and UX.
* **React Context** to manage the state of the application in a predictable way.
* **PostgreSQL** an advanced, enterprise class open source relational database that supports both SQL (relational) and JSON (non-relational) querying.
* **Supabase**  an excellent open-source tool for building secure and high-performance Postgres backends (authentication, real-time database, and storage) with minimal configuration.
* **Prisma.io** an open-source ORM (Object Relational Mapping), server-side library for Node.js and TypeScript that helps developers create data models (schemas)  and also read and write data to the database in an intuitive, efficient and safe way.
* **Bcrypt** to build a password security platform that uses an algorithm to hash passwords with a salt.
* **JSON Web Tokens (JWT)** to authenticate users.
* **Jose** a javascript module that supports JSON Web Tokens (JWT) and provides functionality for signing and verifying tokens, as well as their JWT Claims Set validation.
* **Cookies-next** a library for getting, setting and removing cookies with NEXT.JS.
* **Validator** a library of string validators and sanitizers.
* **React-Datepicker**  a simple and reusable datepicker component for React.
* **Date-fns** provides the most comprehensive, yet simple and consistent toolset
for manipulating JavaScript dates in a browser & Node.js.

## Demo Website

[TABLENOW - RENDER](https://tablenow-hihz.onrender.com)

[TABLENOW - VERCEL](https://tablenow-nine.vercel.app/)
