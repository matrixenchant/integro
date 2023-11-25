const express = require('express');
const { Router } = require('express');
const path = require('path');

const router = Router();

router.use('/', express.static(path.join(__dirname, './integro-app/dist')));
router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './integro-app/dist', 'index.html'));
});

module.exports = router;
