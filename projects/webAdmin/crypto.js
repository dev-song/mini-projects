const crypto = require('crypto');

let encryptedAccountData = [];

function encrypt(userId, userPw, storage) {
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

      storage.push(data);
    })
  });
}

encrypt('dev-song', '12345678', encryptedAccountData);
setTimeout(() => console.log(encryptedAccountData), 1000);