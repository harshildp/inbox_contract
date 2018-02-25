const path = require('path');
const fs = require('fs');
const solc = require('solc'); // solidity compiler

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// requires location, number of contracts and contract names in an array
module.exports = solc.compile(source, 1).contracts[':Inbox'];




