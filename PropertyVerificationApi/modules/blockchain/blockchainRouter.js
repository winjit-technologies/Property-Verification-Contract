var path = require('path');
var api = require('./blockchainController');
var express = require('express');
var router = express.Router();

//Middle layer for User API

/**
 * @swagger
 * /landListingById:
 *   post:
 *     description: Get Land listing by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: landlistingId
 *         description: landlisting Id for getting details.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Receive Producer details 
 */

router.post('/getVerifiedLandById', api.getVerifiedLandById);

router.post('/writeVerifiedLandDetails', api.writeVerifiedLandDetails);

router.post('/createAccount', api.createAccount);

router.post('/getBalance', api.getBalance);

module.exports = router;