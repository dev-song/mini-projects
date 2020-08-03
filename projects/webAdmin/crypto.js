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

function checkPassword(userId, userPw, storage) {
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
          console.log(`'${userPw}' is valid password!`);
        } else {
          console.log(`'${userPw}' is wrong password!`);
        }
      })
      break;
    }
  }
}

encrypt('dev-song', '12345678', encryptedAccountData);
setTimeout(() => {
  console.log(encryptedAccountData);
  checkPassword('dev-song', '12345678', encryptedAccountData);
  checkPassword('dev-song', '123456781234', encryptedAccountData);
}, 1000);