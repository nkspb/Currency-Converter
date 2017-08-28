var http = require('http');
var unirest = require('unirest');

var api = require('./api.json');

function printResult(result){
    if (result.body.from_amount == null || result.body.to_amount == null) {
        printError(new Error("Wrong arguments."));
        return;
    }
    console.log(result.body.from_amount + result.body.from + " is " + result.body.to_amount + result.body.to);
}

// Print out error message
function printError(error) {
    console.error(error.message);
}

function get(query) {
    const amount = query[0];
    const from = query[1];
    const to = query[2];
    // check if url is malformed
    try { 
        // connect to API
        // These code snippets use an open-source library. http://unirest.io/nodejs
        const request = unirest.get(`https://currencyconverter.p.mashape.com/?from=${from}&from_amount=${amount}&to=${to}`)
        .header("X-Mashape-Key", api.key)
        .header("Accept", "application/json")
        .end(function (response) {
            if (response.code === 200){
                // print result
                printResult(response)    
            } else {
                 // Status code error
                const statusCodeError = new Error(`There was an error getting the results. (${http.STATUS_CODES[response.code]})`);
                printError(statusCodeError);
            }
            
        });    
        request.on('error', printError);
    } catch (error) {
         printError(error);        
    }
}

module.exports.get = get;