require("openssl")

const { Pool, Client } = require('pg');

const pool = new Pool()

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('select * from merchant_entries;', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
    })
  })

/*const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});*/

// const client = new Client({
//     user: 'bernardorodriguez',
//     host: 'localhost',
//     database: 'merchant',
//     password: '27december98',
//     port: 5432,
//  });
 

//client.connect();

/*
CREATE TABLE merchant_entries (shop_name VARCHAR(255) PRIMARY KEY, offline_token VARCHAR(255), online_token VARCHAR(225))
select * from information_schema.columns WHERE table_name = 'merchant_entries'
insert into merchant_entries values ('thisismyshop', 'offline12345678900987654321', 'online09876543211234567890')
select * from merchant_entries
*/


module.exports = {
    merchantAuth:  function(shop, accessToken) {
        pool.connect((err, client, release) => {
            if (err) {
              return console.error('Error acquiring client', err.stack)
            }
            client.query('select * from merchant_entries;', (err, result) => {
              release()
              if (err) {
                return console.error('Error executing query', err.stack)
              }
              console.log(result.rows)
            })
          })
        /*client.query("insert into merchant_entries (shop_name, offline_token) values ($1, $2) ON CONFLICT (shop_name) DO UPDATE SET offline_token = $2", [shop, accessToken], (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
                console.log(JSON.stringify(row));
            }
        });*/
    }
}