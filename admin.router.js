const express = require('express');
const { Router } = require('express');
const path = require('path');

const router = Router();

router.use('/admin', express.static(path.join(__dirname, './integro-admin/dist')));
router.get('/admin/*', function (req, res) {
  res.sendFile(path.join(__dirname, './integro-admin/dist', 'index.html'));
});

module.exports = router;