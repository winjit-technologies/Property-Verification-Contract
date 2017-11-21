var express = require('express');
var code = require('../../config/constants');
var response = {};

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io"));
var abi = JSON.parse('[ { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getLandRegistryById", "outputs": [ { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "landId", "type": "uint256" }, { "name": "landinformation", "type": "string" } ], "name": "landregister", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]');
var VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
var contractInstance = VotingContract.at('0xBb8A63Ed9EB5456d8d5a51265f0a950AdCe8fd54');

