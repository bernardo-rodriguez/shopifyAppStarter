require("openssl")

const { Client } = require('pg');

const client = new Client({
    user: 'bernardorodriguez',
    host: 'localhost',
    database: 'merchants',
    password: '27december98',
    port: 5432,
    //ssl: false
});

client.connect();

/*
CREATE TABLE merchants (shop_name VARCHAR(255) PRIMARY KEY, offline_token VARCHAR(255), online_token VARCHAR(225))
select * from information_schema.columns WHERE table_name = 'merchants'
insert into merchants values ('thisismyshop', 'offline12345678900987654321', 'online09876543211234567890')
select * from merchants
*/


client.query("select * from merchants", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});