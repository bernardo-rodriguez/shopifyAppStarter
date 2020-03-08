require("openssl")

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

client.connect();

/*
CREATE TABLE merchant_entries (shop_name VARCHAR(255) PRIMARY KEY, offline_token VARCHAR(255), online_token VARCHAR(225))
select * from information_schema.columns WHERE table_name = 'merchant_entries'
insert into merchant_entries values ('thisismyshop', 'offline12345678900987654321', 'online09876543211234567890')
select * from merchants
*/

module.exports = {
    Select1:  function(query) {
        client.query("insert into merchant_entries values ('hellofromheroku', 'offline12345678900987654321', 'online09876543211234567890')", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
                console.log(JSON.stringify(row));
            }
            client.end();
        });
    }
}