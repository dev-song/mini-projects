// 글자데이터를 다루는 dataController, 화면에 나타내는 UIController, 앱 전체의 기능을 담당하는 appController로 구분

var playing;


// 배열 내 무작위 항목을 선택하는 함수
var getRndElem = function(arr) {
    var rndElem;
    rndElem = arr[Math.floor(Math.random() * arr.length)];

    return rndElem;
};

var dataController = (function() {
    
    // 글자들의 전체 집합을 설정
    var characters = ["길", "벼", "흐", "오", "랖", "オ", "サ", "ホ", "モ", "ヤ", "b", "m", "Q", "R", "y", "δ", "ε", "θ", "ψ", "η", "Б", "Ж", "Л", "Ю", "Я", "ठ", "त", "थ", "म", "ह", "խ", "ծ", "ջ", "տ", "ֆ", "ᚠ", "ᚱ", "ᛉ", "ᛒ", "ᛗ"];

    return {
        // Characters 배열을 return하는 함수
        getCharacters: function() {
            return characters;
        },

        // 길이 n의 난수 배열 생성 (최소값 min, 최대값 max, 단위 unit)
        getRndNumArray: function(n, min, max, unit) {
            var rndNumbers = [];

            // 인접한 값은 동일하지 않아야 함
            for (var i = 0; i < n; i++) {
                var rndNum = Math.round(Math.random() * (max / unit) + (min / unit)) * unit;

                while (rndNum === rndNumbers[i - 1]) {
                    rndNum = Math.round(Math.random() * (max / unit) + (min / unit)) * unit;
                }
                rndNumbers.push(rndNum);
            }

            // console.log(rndNumbers);
            return rndNumbers;
        },
        
        // arr 배열에서 무작위 글자를 obj.columns개 추출해 이어붙인 문장을 obj.rows 줄만큼 추가
        getCharacterMatrix: function(arr, obj) {
            for (var i = 0; i < obj.rows; i++) {
                var divClass = ' class="rows row_' + (i + 1);
                var html = '<div' + divClass + '">';

                for (var j = 0; j < obj.columns; j++) {
                    var rndElem = getRndElem(arr);
                    var spanClass = ' class="characters column_' + (j + 1) + '"';
                    var spanId = ' id="r' + (i + 1) + 'c' + (j + 1);

                    html += '<span' + spanClass + spanId + '">' + rndElem + '</span>';
                }
                html += '</div>';

                // 'body' selector의 'beforeend' position에 html 삽입
                document.querySelector('.wrapper').insertAdjacentHTML('beforeend', html);
            }
        },

        // obj에서 무작위 요소를 선택하고 textContent를 arr의 무작위 내용으로 바꿈
        changeRndChar: function(arr, obj) {
            var rndRow = Math.floor(Math.random() * obj.rows + 1);
            var rndCol = Math.floor(Math.random() * obj.columns + 1);
            var rndChar = getRndElem(arr);

            var rndId = 'r' + rndRow + 'c' + rndCol;
            document.getElementById(rndId).textContent = rndChar;
            // console.log('Element id ' + rndId + ' is changed to character ' + rndChar);

            return rndId;
        }
    }
})();

var UIController = (function() {

    var DOMStrings = {
        
    };

    return {
        // event 지점에 pulse를 delay 간격으로 count 개만큼 생성
        // CSS style과 병행
        // 참고: https://www.youtube.com/watch?v=0ShtNG7JrR8
        makeMultiPulseEffect: function(count, delay) {

            var makePulse = function(delay) {
                var eventX = event.pageX;
                var eventY = event.pageY;
                
                setTimeout(function() {
                    var pulse = document.createElement('div');
                    pulse.setAttribute('class', 'pulse');
                    document.body.appendChild(pulse);
        
                    pulse.style.top = eventY + 'px';
                    pulse.style.left = eventX + 'px';
            
                    setTimeout(function() {
                        document.body.removeChild(pulse);
                    }, delay + 2000);
                }, delay)
            };

            for (var i = 0; i < count; i++) {
                makePulse(0 + delay * i);
            };
        },

        // obj의 모든 column별로 무작위 row에 .highlight 클래스 추가
        setInitialHighlight: function(obj) {
            // id = r#c1, r#c2, ..., r#c16 (#: 무작위 행 번호)
            for (var i = 1; i <= obj.columns; i++) {
                var rndRow = Math.floor(Math.random() * obj.rows + 1);
                var rndId = 'r' + rndRow + 'c' + i;

                document.getElementById(rndId).classList.add('highlighted');

                // console.log(rndId + ' element is highlighted')
            }
        },

        // 특정 column의 highlight를 현재 element의 아래 element로 지정
        displayNewHighlight: function(obj, col, hlRow) {
            var previousHighlightId = 'r' + hlRow + 'c' + col;
            var newHighlightId;

            if (hlRow < obj.rows) {
                newHighlightId = 'r' + (hlRow + 1) + 'c' + col;
            } else if (hlRow === obj.rows) {
                newHighlightId = 'r' + 1 + 'c' + col;
            }
            
            document.getElementById(previousHighlightId).classList.remove('highlighted');
            document.getElementById(newHighlightId).classList.add('highlighted');
        },

        // 특정 열에서 Highlight된 row와의 간격에 따라 opacity을 조절하는 함수
        ctrlColumnOpacity: function(obj, col, hlRow, tailLength) {
            for (var i = 1; i <= obj.rows; i++) {
                var targetId = 'r' + i + 'c' + col;
                var targetDOM = document.getElementById(targetId);

                // 현재 element가 changed 상태가 아닌 경우 opacity 조절
                    // 각 row와 highlight의 간격, 글자들의 길이(tailLength)를 계산하여 opacity에 반영
                if(!targetDOM.classList.contains('changed')) {
                    if (hlRow < tailLength && i > obj.rows + hlRow - tailLength) {
                        targetDOM.style.opacity = Math.max(0, 1 - (obj.rows + hlRow - i) * (1 / tailLength));
                    } else if (i - hlRow <= 0) {
                        targetDOM.style.opacity = Math.max(0, 1 - (hlRow - i) * (1 / tailLength));
                    } else {
                        targetDOM.style.opacity = 0;
                    }
                }
            }
        }    
    }
})();

var appController = (function(dataCtrl, UICtrl) {

    var playing = false;

    var characters = dataCtrl.getCharacters();
    var characterMatrix = {
        rows: 24,
        columns: 24
    }

    // 무작위 글자의 내용을 바꾸고, 해당 글자를 일정 시간 동안 강조 표시함
    var updateRndChar;

    // 갱신 rate
    var updateCharRate = 150;
    var changeFocusTime = 1200;

    // 이어지는 글자들의 길이
    var tailLength = 12;

    var setEventListeners = function() {
        // playing 변수를 조절하는 event listener를 Play/stop 버튼에 할당
        document.getElementById('btn_play-stop').addEventListener('click', changePlayStatus);

        document.querySelector('.wrapper').addEventListener('click', function() {
            UICtrl.makeMultiPulseEffect(3, 200);
        });
    };

    // 현재 client의 width를 기준으로 columns를 결정하고, height와의 비율을 반영해 rows를 결정
    var adjustCharMatrix = function(obj) {
        w = window.innerWidth;
        h = window.innerHeight;

        if (w <= 480) {
            obj.columns = 12;
        } else if (w <= 1200 && w > 480) {
            obj.columns = 24;
        } else {
            obj.columns = 40;
        }

        obj.rows = Math.floor(obj.columns * (h / w));
    }

    // playing 변수를 조절하고 setIntervals를 멈추며, Play/stop 버튼의 style을 바꾸는 함수
    var changePlayStatus = function() {
        if (playing) {      // play 중 버튼을 누를 경우
            playing = false;

            // 현재 설정된 모든 setInterval들을 멈춤
            intervalArr.forEach(function(cur) {
                clearInterval(cur);
            });

            // Play/stop 버튼 글자 및 스타일 변경
            document.getElementById('btn_play-stop').textContent = 'Play';
            document.getElementById('btn_play-stop').classList.remove('status-playing');
            document.getElementById('btn_play-stop').classList.add('status-stop');

        } else {    // play가 멈춘 상태에서 버튼을 누를 경우
            playing = true;

            document.querySelector('.wrapper').style.display = 'block'

            // 새로이 setInterval을 설정
            updateHighlight(characterMatrix);
            updateRndChar(characters, characterMatrix, updateCharRate, changeFocusTime)

            // Play/stop 버튼 글자 및 스타일 변경
            document.getElementById('btn_play-stop').textContent = 'Stop';
            document.getElementById('btn_play-stop').classList.remove('status-initial');
            document.getElementById('btn_play-stop').classList.remove('status-stop');
            document.getElementById('btn_play-stop').classList.add('status-playing');

            // 본문 글자 스타일 변경
            document.querySelector('.page-introduction').style.opacity = 0.01;
            document.querySelector('.button-instruction').style.opacity = 0.01;
        }
        // console.log('Play status changed. Now playing status is ' + playing);
    };

    // 특정 열의 Highlight된 row를 찾는 함수
    var findColHighlightRow = function(obj, col) {
        var colHighlightRow;

        for (var i = 1; i <= obj.rows; i++) {
            var targetId = 'r' + i + 'c' + col;
            var targetDOM = document.getElementById(targetId);

            if (targetDOM.classList.contains('highlighted')) {
                colHighlightRow = i;
            }
        }

        return colHighlightRow;
    };

    // 각 column별로 생성될 setInterval을 일괄적으로 관리할 배열 생성
    intervalArr = [];

    // obj의 모든 column을 서로 다른 주기로 update
    var updateHighlight = function(obj) {
        document.querySelector('body').style.color = '#99ffbb'

        // column 별 update time에 쓰일 난수 배열 생성
        columnUpdateRates = dataCtrl.getRndNumArray(obj.columns, 120, 400, 40);
        // console.log('Array contains intervals\' ID: \n');
        // console.log(intervalArr);

        for (var i = 1; i <= obj.columns; i++) {
            updateColumnHighlight(obj, i, columnUpdateRates[i - 1]);
        }
    };

    // 한 column의 highlight 클래스를 다음 row로 옮기고, highlight되지 않은 row의 색상을 일정 주기(time)로 update
    var updateColumnHighlight = function(obj, col, time) {
        intervalArr[col - 1] = setInterval(function() {
            var hlRow = findColHighlightRow(obj, col);
            UICtrl.displayNewHighlight(obj, col, hlRow);
            // highlight를 갱신했으므로 hlRow 변수를 재설정
            hlRow = findColHighlightRow(obj, col);
            UICtrl.ctrlColumnOpacity(obj, col, hlRow, tailLength);
        }, time);
    };

    // obj의 무작위 글자를 charArr 중 한 글자로 일정 주기(updateRate)마다 교체하고, 일정 시간(duration) 동안 강조 표시함
    var updateRndChar = function(charArr, obj, rate, duration) {
        intervalArr[intervalArr.length] = setInterval(function() {
            var rndId = dataCtrl.changeRndChar(charArr, obj);
            document.getElementById(rndId).classList.add('changed');

            setTimeout(function() {
                document.getElementById(rndId).classList.remove('changed');
            }, duration);
        }, rate);
    };

    return {
        init: function() {
            adjustCharMatrix(characterMatrix);
            dataCtrl.getCharacterMatrix(characters, characterMatrix);
            UICtrl.setInitialHighlight(characterMatrix);

            // Play 버튼을 누르기 전까지는 본문이 보이지 않게 함
            document.querySelector('.wrapper').style.display = 'none';

            setEventListeners();
        }
    };
})(dataController, UIController);

appController.init();