const currency = require('./currency');
const query = process.argv.slice(2);

currency.get(query);