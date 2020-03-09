const dotenv = require('dotenv');
const crypto = require('crypto')
const axios = require('axios');
dotenv.config();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

module.exports = {
    validateSignature:  function(query) {
        var parameters = [];
        for (var key in query) {
            if (key != 'signature') {
                parameters.push(key + '=' + query[key])
            }
        }
        var message = parameters.sort().join('');
        var digest = crypto.createHmac('sha256', SHOPIFY_API_SECRET_KEY).update(message).digest('hex');
        return digest === query.signature && crypto.timingSafeEqual(Buffer.from(digest),Buffer.from(query.signature));
    },

    validateHMAC:  function(query) {
        console.log(SHOPIFY_API_SECRET_KEY)
        console.log(SHOPIFY_API_KEY)
        console.log(query)
        var parameters = [];
        for (var key in query) {
            if (key != 'hmac') {
                parameters.push(key + '=' + query[key])
            }
        }
        var message = parameters.join('&');
        var digest = crypto.createHmac('sha256', SHOPIFY_API_SECRET_KEY).update(message).digest('hex');
        return digest === query.hmac && crypto.timingSafeEqual(Buffer.from(digest),Buffer.from(query.hmac));
    },
    
    permanentAcessCode:  function(query) {
        console.log("thisisthecode")
        console.log(query.code)
        console.log("yeshereiam")
        
        axios.post("https://" + query.shop + '/admin/oauth/access_token', {
            client_id: SHOPIFY_API_KEY,
            client_secret: SHOPIFY_API_SECRET_KEY,
            code: query.code
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    requestCustomers:  function(shop, access_token) {
        console.log('request for customers');
        console.log(shop, access_token);

        axios.post("https://" + shop + '/admin/api/2020-01/customers.json', {
            headers: { 'X-Shopify-Access-Token': access_token }
        })
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return response;
        });

    }

};

