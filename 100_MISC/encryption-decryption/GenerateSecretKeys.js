const crypto = require('crypto');


// Generate an RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // Key size in bits
  publicKeyEncoding: {
    type: 'spki', // Recommended for public key
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8', // Recommended for private key
    format: 'pem',
    cipher: 'aes-256-cbc', // Optional: encrypt private key
    passphrase: ''          // Provide passphrase if cipher is used
  }
});

console.log('Public Key:\n', publicKey);
console.log('Private Key:\n', privateKey);
