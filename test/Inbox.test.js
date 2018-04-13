const ganache = require('ganache-cli');
const assert = require('assert');
const Web3  = require('web3');
const web3  = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inboxContract

beforeEach(async () => {
  // Get a list of all accounts.
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contact
  inboxContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
  it('deploys a contact', () => {
    assert.ok(inboxContract.options.address);
  })
});
