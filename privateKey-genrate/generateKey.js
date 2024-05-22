const Wallet = require('ethereumjs-wallet').default;

// Generate a new wallet
const wallet = Wallet.generate();

// Get the private key as a hex string
const privateKey = wallet.getPrivateKeyString();

// Print the private key to the terminal
console.log('Private Key:', privateKey);
