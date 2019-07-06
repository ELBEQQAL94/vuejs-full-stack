const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MONGODB } = require('./config');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());


// cors prevent
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server runing at ${port}`))



