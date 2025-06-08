const { Router } = require('express');
const accountController = require('../../../controllers/accountController');
const accountValidation = require('../../../validations/accountValidation');
const validate = require('../../../middlewares/validateAccount');

const router = Router();
router.get('/', accountController.getAccounts);
router.get('/:id', validate(accountValidation.getAccountById),accountController.getAccountById);
router.post('/', validate(accountValidation.createAccount),accountController.createAccount);
router.put('/:id', validate(accountValidation.updateAccountById),accountController.updateAccountById);
router.delete('/:id', validate(accountValidation.deleteAccountById),accountController.deleteAccountById);

module.exports = router;