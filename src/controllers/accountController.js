const accountService = require('../services/accountService');

const getAccountById = async (request, response) => {
  const result = await accountService.getAccountById(request.params.id);
  if (result) {
    response.status(200).json({success: true, account: mapToResponse(result)});
  } else {
    response.status(404).json({success: false, message: 'Account not found'});
  }
};

const getAllAccounts = async (request, response) => {
  const result = await accountService.getAllAccounts();
  response.status(200).json({success: true, account: result.map(acc => mapToResponse(acc))});
}

const createAccount = async (request, response) => {
  const {name, number, type, status} = request.body;
  const result = await accountService.createAccount(name, number, type, status);
  response.status(201).json({success: true, account: mapToResponse(result)})
}

const deleteAccountById = async (request, response) =>  {
  const isDeleted = await accountService.deleteAccountById(request.params.id);
  if (isDeleted) {
    response.status(204).json({success: true});
  } else {
    response.status(400).json({success: false, message: 'No valid data to delete'});
  }
}

const updateAccountById = async (request, response) => {
  const result = await accountService.updateAccountById(req.params.id, request.body);
  if (result.error) {
    switch (result.code) {
      case accountService.errorCodes.NO_VALID_DATA_TO_UPDATE:
        response.status(400).json({success: false, message: result.error});
        return;
      case accountService.errorCodes.INVALID_STATUS_CODE:
        response.status(400).json({success: false, message: 'Invalid status'});
        return;
      case accountService.errorCodes.INVALID_TYPE_CODE:
        response.status(400).json({success: false, message: 'Invalid type'});
        return;
      case accountService.errorCodes.INVALID_ACCOUNT:
        response.status(404).json({success: false, message: 'Account not found'});
        return;
      case accountService.errorCodes.INVALID_STATE_TRANSITION:
        response.status(400).json({success: false, message: result.error});
        return;
      case accountService.errorCodes.INVALID_TYPE_TRANSITION:
        response.status(400).json({success: false, message: result.error});
        return;
      default:
        response.status(500).json({success: false, message: 'Internal server error'});
        return;
    }
  }

  response.status(200).json({success: true, account: mapToResponse(result)});
}


function mapToResponse(account) {
  const { id, name, number, type, status } = account;
  return { id, name, number, type, status};
}

module.exports = {
  getAccountById,
  getAllAccounts,
  createAccount,
  deleteAccountById,
  updateAccountById,
};