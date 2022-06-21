const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
// Important: here host redis-server will be replaced by docker compose with actual
// http address of redis server running in a container
const client = redis.createClient({
  host: 'redis-server',
  port: 6379,
});
client.set('visits', 0);

app.get('/', (req, res) => {
  // make sure our server always shutdown when ever to get a request on / route
  // This piece of code is to demonstrate docker-compose restart policy
  process.exit(0);
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
