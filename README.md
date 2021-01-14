Lokoko 
=========

## A Kijiji Clone

A multi-page web app modelled after the Kijiji buy/sell service. This project is a group effort between Irena Podgurski, Simon Huang, and Ryan MacFarlane as part of our week-six (midterm) studies with the Web Development Bootcamp at Lighthouse Labs.


## Features

1. Browse user-generated listings to shop for services or goods new and used
2. Post a listing of your own - find a buyer!
3. Explore the nine built-in user profiles (similarities to real persons or events is purely coincidental)
4. Want to build your own buy/sell app? Clone this repo and use it as a template!

## Final Product

!["Browse listings from your area!"](https://github.com/rjlmacfarlane/lokoko/blob/master/docs/latest-listings.png)

!["Browse listings from your area!"](https://github.com/rjlmacfarlane/lokoko/blob/master/docs/post-new-ad.png)

!["Browse listings from your area!"](https://github.com/rjlmacfarlane/lokoko/blob/master/docs/user-profile.png)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
6. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
7. Visit `http://localhost:8080/login/1`

## Tips

- To test the message feature, visit https://ethereal.email/create to create a temporary account, adding the given host/user/pwd information to `.env`
- Navigate to `http://localhost:8080/login/` + any integer up to 9 to explore different user profiles 

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- Body-parser 1.19 or above
- Chalk 2.4.2 or above
- Cookie-session 1.4.0 or above
- Dotenv 2.0.0 or above
- EJS 2.6.2 or above
- Express 4.17.1 or above
- Moment 2.29.1 or above
- Nodemailer 6.4.17 or above
- PG 6.4.2 or above
