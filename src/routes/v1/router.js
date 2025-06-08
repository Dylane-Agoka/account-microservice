const { Router } = require('express');
const accountRouter = require('./accounts/accountRouter');

const router = Router();
router.use('/accounts', accountRouter);

module.exports = router;