Delegation Checker
==================

A simple web app where users can login/signup and check their delegations both on [Matic/Polygon](https://polygon.technology/) and [Solana](https://solana.com/) blockchain.

Development & Installation
--------------------------

## Backend 

### Overview

Backend is written using [LoopBack](https://loopback.io/).

* [LoopBack JWT authentication](https://www.npmjs.com/package/@loopback/authentication)
* [MySQL database](https://www.mysql.com/)
* [Solana JavaScript API](https://solana-labs.github.io/solana-web3.js/)
* [Matic Staking API](https://sentinel.matic.network/swagger/)

### Installation

```bash
git clone https://github.com/euj1n0ng/delegation-checker.git
cd delegation-checker/backend
npm install

# run this to migrate database, please make sure that your mysql server is running
npm run migrate

# run this to launch backend locally
npm run start
```

Once backend has been launched, you can explore the API documentation via [Swagger UI](http://localhost:3000/explorer/).

## Frontend

### Overview

Frontend is written using [React](https://reactjs.org/) (with [create-react-app](https://create-react-app.dev/)).

### Installation

```bash
cd delegation-checker/frontend
yarn install
yarn start
```
Please note that you should configure `.env` file to avoid duplicated port with backend server (local environment test) and setup the API base url. Just follow `/frontend/.env.example`.

Creator Notes
-------------
Due to big differences of the delegated staking architecture between Matic/Polygon and Solana, this app currently provides only basic delegation info. Representatively, whereas an exclusive and disposal stake account is assigned to whenever a staking get started in Solana (in other words, stake accounts are created and managed differently than a traditional wallet address), in Matic/Polygon one account can be linked to multiple validators.
These obstacles can be managed properly for sure and this app just works as a prototype.
