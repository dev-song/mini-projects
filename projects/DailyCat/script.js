const randomCatImage = 'https://api.thecatapi.com/v1/images/search';
const catBreedInfo = 'https://api.thecatapi.com/v1/breeds/search?q=ben';

function getDataAJAX(url, callback) {
  const httpReq = new XMLHttpRequest();

  httpReq.onreadystatechange = function () {
    if (httpReq.readyState !== 4 || httpReq.status !== 200) return;
    console.log(`Response Text: ${this.responseText}`);

    try {
      const data = JSON.parse(this.responseText);
      callback(data);
    } catch (err) {
      console.log(`${err.message} in ${this.responseText}`);
      return;
    }
  }

  httpReq.open('GET', catBreedInfo);
  httpReq.send();
}