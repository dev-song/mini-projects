const crypto = require('crypto');

exports.encryptPassword = (userId, userPw, callback) => {
  let data = {
    id: userId
  }

  crypto.randomBytes(64, (err, buf) => {
    if (err) {
      console.log(error);
      return;
    }

    const salt = buf.toString('base64');

    crypto.pbkdf2(userPw, salt, 138164, 64, 'sha512', (err, key) => {
      if (err) {
        console.log(error);
        return;
      }

      const password = key.toString('base64');
      data.salt = salt;
      data.password = password;

      callback(data);
    })
  });
}

exports.checkPassword = (userId, userPw, storage, validPwCallback, invalidPwCallback, invalidIdCallback) => {
  for (let i = 0, len = storage.length; i < len; i++) {
    const account = storage[i];
    if (userId === account.id) {
      crypto.pbkdf2(userPw, account.salt, 138164, 64, 'sha512', (err, key) => {
        if (err) {
          console.log(error);
          return;
        }

        const password = key.toString('base64');
        if (password === account.password) {
          validPwCallback();
        } else {
          invalidPwCallback();
        }
      })
      return;
    }
  }

  invalidIdCallback();
}