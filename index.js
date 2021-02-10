// Require the client library packages
const Iota = require('@iota/core');
const Iota2 = require('@iota/converter');

// Creates a new instance of the IOTA API object
// Use the 'provider' field to specify which node to connect to
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});


//Defines the transactions parameters : 
//      depth : how many milestones in the past the node starts he tip selection (selection of trunk and branch)
//      minimumWeightMagnitude : amount of 'work' that will be done in the proof of work
//      address : sender's address, since it's a non-value transfer
//      seed : address of our seed (kind of a IOTA bank account)
const depth = 3;
const minimumWeightMagnitude = 9;
const address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

//Creates the message we want to transfer : 'Hello word'
//Encodes it into Trytes
const message = JSON.stringify({"message": "Hello world"});
const messageInTrytes = Iota2.asciiToTrytes(message);

//Creates the basic fields used for the transfer
const transfers = [
    {
        value: 0,
        address: address,
        message: messageInTrytes
    }
];

//Transaction
iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
    })
    .then(bundle => {
        console.log("Transaction is a success!")
        console.log("Transaction's infos : ")
        console.log("   Hash : ", bundle[0].hash)//Usefull to find the message in the Tangle
        console.log("   Address : ", bundle[0].address)//Non-value transfer -> address will be the sender's address
        console.log("   Value : ", bundle[0].value)//Value of the transfer
        console.log("   Timestamp : ", bundle[0].timestamp)//Used time to make the transfer since Jan 1. 1970 -> not enforced
        console.log("   Trunk transaction : ", bundle[0].trunkTransaction)//Transaction hash of the trunk transaction attached to ours
        console.log("   Branch Transaction : ", bundle[0].branchTransaction)//Transaction hash of the branch transaction attached to ours
    })
    .catch(err => {
        console.error(err)
    });