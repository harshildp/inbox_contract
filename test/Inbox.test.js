const assert = require('assert');
const ganache = require('ganache-cli');
const provider = ganache.provider(); // local network provider with fake accounts to use
const Web3 = require('web3');
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox

beforeEach(async () => { // we want to redeploy a fresh contract for every test
    // Get accounts
    accounts = await web3.eth.getAccounts();
    
    // Use accounts to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode, 
            arguments: ['Hello there!']
        })
        .send({ from: accounts[0], gas: '1000000' });
    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hello there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('New message :)').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();        
        assert.equal(message, 'New message :)');
    });
});
