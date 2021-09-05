const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  res.sendStatus(200);
});

// add a new favorite
router.post('/', (req, res) => {
  let gif = req.body;
  console.log('gif me', gif)

  let query = `
    INSERT INTO "favorites"  ("embeded_url")
    VALUES ($1);
  `;
  pool.query(query, [gif.embed_url])
    .then(result => {
      res.sendStatus(201)
    }).catch(error => {
      console.log('Error at favorites ', error)
      res.sendStatus(500)
    });

  res.sendStatus(200);
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
