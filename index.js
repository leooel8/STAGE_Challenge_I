// Require the client library packages

const Iota = require('@iota/core');
const Iota2 = require('@iota/converter');

// Create a new instance of the IOTA API object

// Use the 'provider' field to specify which node to connect to

const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

const depth = 3;

const minimumWeightMagnitude = 9;

const address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';

const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

const message = JSON.stringify({"message": "Hello world"});

const messageInTrytes = Iota2.asciiToTrytes(message);
console.log("Log de message in trytes : ",messageInTrytes);

const transfers = [
    {
        value: 0,
        address: address,
        message: messageInTrytes
    }
];

iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
    })
    .then(bundle => {
        console.log(bundle[0].hash)
    })
    .catch(err => {
        console.error(err)
    });