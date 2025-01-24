// Create web server
const express = require('express');
const app = express();

// Set up body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Set up database
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('comments.db');

// Create table
db.run('CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, text TEXT)');

// Set up CORS
const cors = require('cors');
app.use(cors());

// Set up routes
app.get('/comments', (req, res) => {
  db.all('SELECT * FROM comments', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  db.run('INSERT INTO comments (text) VALUES (?)', [comment.text], function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      db.get('SELECT * FROM comments WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(row);
        }
      });
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started');
});
// End of comments.js