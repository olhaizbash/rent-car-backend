const {
  checkContactId,
  checkIsExist,
  checkIsExistUpdate,
  checkFavoriteUpdate,
} = require("./contactMiddlewares");

const {
  checkSignupData,
  authenticate,
  loginData,
  uploadUserPhoto,
  upload,
  emailData,
} = require("./authMiddlewares");

module.exports = {
  checkContactId,
  checkIsExist,
  checkIsExistUpdate,
  checkFavoriteUpdate,
  checkSignupData,
  authenticate,
  loginData,
  uploadUserPhoto,
  upload,
  emailData,
};
