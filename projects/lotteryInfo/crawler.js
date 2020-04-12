// 참고: Node.js에서 웹 크롤링하기
// https://velog.io/@yesdoing/Node.js-%EC%97%90%EC%84%9C-%EC%9B%B9-%ED%81%AC%EB%A1%A4%EB%A7%81%ED%95%98%EA%B8%B0-wtjugync1m

// 로또 6/45 당첨번호 확인 페이지
// https://dhlottery.co.kr/gameResult.do?method=byWin


const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const log = console.log;

const targetURL = "https://dhlottery.co.kr/gameResult.do?method=byWin";
const jsonFile = "drawData.json";

const getHtml = async (url) => {
    try {
        return await axios.get(url);
    } catch (err) {
        console.error(err);
    }
};

// n회차 만큼의 이전 결과 데이터를 불러오는 함수
    // async/await 문법을 활용한 것은 실패해서 setTimeout으로 지연시간 강제 부여
function getPrevData(n) {
    let delay = 3000;   // 매 회차별 데이터 조회 delay (단위: ms)

    for (let i = n, seq = 0; i > 0; i--, seq++) {
        let adjustedURL = targetURL + '&drwNo=' + i;
        log('drawNo: ' + i + ', sequence: ' + seq);
        setTimeout(getData, delay + seq * delay, adjustedURL);
    }
}

async function getData(url) {
    getHtml(url)
    .then(html => {
        let drawInfo = 0;
        let numList = [];
        const $ = cheerio.load(html.data);
        const $drawSection = $("div.win_result h4 strong");
        const $numberSection = $("div.nums div.win p").children("span.ball_645");
        const $bonusSection = $("div.nums div.bonus p span.ball_645");

        drawInfo = $drawSection.text();
        drawNo = parseInt(drawInfo.substring(0, drawInfo.length - 1));
        $numberSection.each(function(i, elm) {
            let ballNumber = $(this).text();
            numList[i] = parseInt(ballNumber);
        });
        bonusNum = parseInt($bonusSection.text());
    
        let drawDataEach = {
            draw: drawNo,
            balls: numList,
            bonus: bonusNum
        };
    
        fs.exists(jsonFile, exist => {
            if (exist) {
            //     log(jsonFile + " exists");
    
                fs.readFile(jsonFile, (err, data) => {
                    if (err) {
                        log(err);
                    } else {
                        let jsonSrc = JSON.parse(data);
    
                        // 불러온 json 파일의 길이가 0이거나, 첫 번째 원소의 draw 값이 불러온 drawNo와 일치하지 않으면 jsonSrc배열에 데이터를 추가
                        if (jsonSrc.length === 0 || jsonSrc[0].draw != drawNo) {
                            jsonSrc.push(drawDataEach);
                        }
    
                        // 새로 추가된 최근의 draw는 배열의 맨 뒤에 있으므로, sort()로 내림차순 정렬해줌
                        jsonSrc.sort((a, b) => b.draw - a.draw);
    
                        let jsonString = JSON.stringify(jsonSrc, null, 4);
                        fs.writeFile(jsonFile, jsonString, err => log(`{draw: ${drawDataEach.draw}, balls: [${drawDataEach.balls}], bonus: ${drawDataEach.bonus}} is successfully written!`));
    
                        return jsonSrc;
                    }
                })
            } else {
                log("Error: File does not exist");
            }
        })
    
        // return result;
    })
    // .then(res => log(res));
}

////////////////////////////////////////////////////////////////////////////////////
// 함수 실행 구역

getData(targetURL); // 최신 결과를 JSON에 추가
// getPrevData(906);   // param 회차까지의 이전 결과 내역을 받아서 JSON으로 저장

////////////////////////////////////////////////////////////////////////////////////
