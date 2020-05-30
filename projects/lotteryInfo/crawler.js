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
    // lastRecord가 있을 경우 lastRecord 이후부터 end까지 실행
    // async/await 문법을 활용한 것은 실패해서 setTimeout으로 지연시간 강제 부여
function getPrevData(end, lastRecord = 0) {
    let delay = 3000;   // 매 회차별 데이터 조회 delay (단위: ms)

    for (let i = lastRecord + 1, seq = 0; i <= end; i++, seq++) {
        let adjustedURL = targetURL + '&drwNo=' + i;
        log('drawNo: ' + i + ', sequence: ' + seq);
        setTimeout(getData, delay + seq * delay, adjustedURL);
    }
}

// 결과 표시 홈페이지에 접속해, 가장 최근의 당첨회차가 몇인지 파악
function checkLastDraw(url) {
    getHtml(url)
        .then(html => {
            const $ = cheerio.load(html.data);
            const currentDraw = parseInt($("div.win_result h4 strong").text());

            console.log(currentDraw);
        })
}

// 현재 json 파일의 최신 회차가 몇 회차인지 파악
function checkLastRecord(jsonFile) {
    fs.exists(jsonFile, exist => {
        if (exist) {
            fs.readFile(jsonFile, (err, data) => {
                if (err) log(err);
                else {
                    let fileData = JSON.parse(data);
                    if (fileData.length != 0) {
                        log(fileData[0].draw);
                        return fileData[0].draw;
                    }
                }
            })
        }
    })
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
    
                fs.readFile(jsonFile, (err, data) => {
                    if (err) {
                        log(err);
                    } else {
                        let jsonSrc = JSON.parse(data);
    
                        // 불러온 json 파일의 길이가 0이거나, 첫 번째 원소의 draw 값이 불러온 drawNo와 일치하지 않으면 jsonSrc배열에 데이터를 추가
                        if (jsonSrc.length === 0 || jsonSrc[0].draw != drawNo) {
                            jsonSrc.unshift(drawDataEach);
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

/////////////////////////////////////////////////////////////////////////////////
// 함수 실행 구역

// getData(targetURL); // 최신 결과를 JSON에 추가
// checkLastDraw(targetURL);
// checkLastRecord(jsonFile);
// getPrevData(913, 910);   // param 회차까지의 이전 결과 내역을 받아서 JSON으로 저장

/////////////////////////////////////////////////////////////////////////////////
