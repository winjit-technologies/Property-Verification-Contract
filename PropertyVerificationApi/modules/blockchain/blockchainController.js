var express = require('express');
var code = require('../../config/constants');
var response = {};

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io"));
var abi = JSON.parse('[ { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getLandRegistryById", "outputs": [ { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "landId", "type": "uint256" }, { "name": "landinformation", "type": "string" } ], "name": "landregister", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]');
var VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
var contractInstance = VotingContract.at('0xBb8A63Ed9EB5456d8d5a51265f0a950AdCe8fd54');

/**
 * API to read data for Verified land from blockchain 
 * @param {*} req (land Id)
 * @param {*} res (json with success/failure)
 */
exports.getVerifiedLandById = function (req, res) {
    try
    {
        contractInstance.getUser(req.body.data.landId, function(err, data) {
            response.status = { "code": code.SUCCESS, "message": code.SUCCESS_MSG };
            response.result = data;
            res.status(200).json(response);
            return;
        });
    }
    catch(e)
    {
        response.status = { "code": code.INVALID_DETAILS, "message": code.INVALID_DETAILS_MSG };
        response.result = {};
        var data = encryptdecrypt.encryptData(response);
        res.status(200).json(data);
        return;
    }
        
};

/**
 * API to read data for Verified land from blockchain 
 * @param {*} req (land Id)
 * @param {*} res (json with success/failure)
 */
exports.writeVerifiedLandDetails = function (req, res) {
    
        var landinfo = '{"landId": "' + req.body.landId +'", "producerId": "' + req.body.producerId +'", "clientId": "' + req.body.clientId +'", "transId": "' + req.body.transId +'", "landSize": "' + req.body.landSize +'", "addr": "' + req.body.addr +'", "suburb": "' + req.body.suburb +'", "city": "' + req.body.city +'", "country": "' + req.body.country +'", "postcode": "' + req.body.postcode +'", "lat": "' + req.body.lat +'", "lng": "' + req.body.lng +'", "titleType": "' + req.body.titleType +'"}';
        console.log(landinfo);
        contractInstance.landregister(req.body.landId, landinfo, "0x7B4c9E18287D2C2FDc0ffeb2f3AfD445a89201D5", function(err, data) {
            console.log(data);
            console.log(err);
            response.status = { "code": code.SUCCESS, "message": code.SUCCESS_MSG };
            response.result = data;
            res.status(200).json(response);
            return;
        });    
};

/**
 * API to create ETH Accounts 
 * @param {*} req ()
 * @param {*} res (json with success/failure)
 */
exports.createAccount = function (req, res) {
    try
    {
        var Accounts = require('web3-eth-accounts');
        var accounts = new Accounts(new Web3.providers.HttpProvider("https://rinkeby.infura.io"));
        var accountInfo = accounts.create();
        response.status = { "code": code.SUCCESS, "message": code.SUCCESS_MSG };
        response.result = accountInfo;
        res.status(200).json(response);
        return;
    }
    catch(e)
    {
        response.status = { "code": code.INVALID_DETAILS, "message": code.INVALID_DETAILS_MSG };
        response.result = {};
        res.status(200).json(response);
        return;
    }
};

/**
 * API to create ETH Accounts 
 * @param {*} req ()
 * @param {*} res (json with success/failure)
 */
exports.getBalance = function (req, res) {
    try
    {
        if(req.body.walletAddress)
        {
            var balanceInfo = web3.fromWei(web3.eth.getBalance(req.body.walletAddress));
            response.status = { "code": code.SUCCESS, "message": code.SUCCESS_MSG };
            response.result = balanceInfo;
            res.status(200).json(response);
            return;
        }
        else
        {
            response.status = { "code": code.INVALID_DETAILS, "message": "Wallet Address Required" };
            response.result = {};
            res.status(200).json(response);
            return;
        }
    }
    catch(e)
    {
        response.status = { "code": code.INVALID_DETAILS, "message": "Wallet Address Required" };
        response.result = {};
        res.status(200).json(response);
        return;
    }
};