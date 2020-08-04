const fs = require('fs');

exports.utilizeData = (json, callback) => {
  fs.exists(json, (exist) => {
    if (exist) {
      fs.readFile(json, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const parsed = JSON.parse(data);
          callback(parsed);
        }
      });
    }
  });
}

exports.addData = (json, dataObj) => {
  fs.exists(json, (exist) => {
    if (exist) {
      fs.readFile(json, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let originalData = JSON.parse(data);
          if (!originalData) {
            originalData = [];
          }

          originalData.push(dataObj);
          const newData = JSON.stringify(originalData, null, 2);
          fs.writeFile(json, newData, err => {
            if (err) {
              console.log(err);
            }
            console.log('Data is newly added: ', dataObj);
          })
        }
      });
    }
  });
}