const crypto = require('crypto');
const { b, a } = require('./keys');

// send encrypted data from A to B

const A2B = (data) => {
    const encryptedData = crypto.publicEncrypt(
        b.public_key,
        Buffer.from(data)
    );

    return encryptedData.toString('base64');
}
const B2A = (data) => {
    const encryptedData = crypto.publicEncrypt(
        a.public_key,
        Buffer.from(data)
    );

    return encryptedData.toString('base64');
}



const decryptA2B = (encryptedData) => {
    const decryptedData = crypto.privateDecrypt(
        {
            key: b.private_key,
            passphrase: '', // Empty if no encryption on private key
        },
        Buffer.from(encryptedData, 'base64')
    );
    return decryptedData.toString()
}
const decryptB2A = (encryptedData) => {
    const decryptedData = crypto.privateDecrypt(
        {
            key: b.private_key,
            passphrase: '', // Empty if no encryption on private key
        },
        Buffer.from(encryptedData, 'base64')
    );
    return decryptedData.toString()
}

const text = "This is encrypted data from A."

const encryptedData = A2B(text);

const decryptedData = decryptA2B(encryptedData);
console.log(decryptedData)
