# Blockchain-Based Educational Records Storage and Sharing
 **Overview:** 
 This project aims to provide a decentralized system for organizing and validating educational certificates and other relevant data using blockchain technology. It allows students, educational institutions, and employers to access a trusted and immutable record of educational achievements.

## Dependencies

**Global Dependencies:**

- Node.js and npm
- Truffle
- Ganache

**Project Dependencies:**

- web3
- React
- bootstrap

## Steps to Run

1. **Install Global Dependencies:**

   - Install Node.js from the [official website](https://nodejs.org/).
   - Install Truffle globally:

     ```bash
     npm install -g truffle
     ```

   - Install Ganache from the [official website](https://www.trufflesuite.com/ganache).

2. **Clone the Repository and Install Local Dependencies:**

   ```bash
   git clone https://github.com/Adhithi-S-naik/Blockchain-Education-Records.git
   cd Blockchain-Education-Records
   npm install
   truffle compile
   truffle migrate --network development
   cd client
   npm install
   npm start
