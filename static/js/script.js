
//background image
var backgroundImge = "../../static/images/worldanimal.jpg";

//puzzle image
var mainImge = "../../static/images/kaola.png";

// verify if win
function isWin() {
    for (i = 0, td = document.getElementsByTagName('td'); i < td.length; i++) {
        if (td[i].getAttribute('id') != td[i].className.slice(3)) {
            return false;
        }
    }
    return true;
}

// table
var td = [];
td = document.getElementsByTagName('td');
console.log("table")
console.log(td.length)
// row = td.insertCell(td._col)
// col = td.insertCell(td._col)
console.log("table")
console.log(td.length)

// margin value
var Margin = parseInt(document.getElementById('img').currentStyle ? parseInt(screen.availWidth) * 0.31 : window.getComputedStyle(document.getElementById("img"), null)['marginLeft']);
console.log("margin value")
console.log(Margin)

//alert(Margin);
var i;
var used = [];
var clock;
var flashClock;
var flashClock2;
var stop = 0;

var makeTD = {
    leftTop: 0,
    rightButton: 0
};
var makeTable = [];

// get random number
function get_Random(maxNum) {
    return Math.floor(Math.random() * maxNum);
}

// return current object value by key
function getCss(elementObj, key) {
    return elementObj.currentStyle ? elementObj.currentStyle[key] : window.getComputedStyle(elementObj, false)[key];
}


function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}


// create temperate object 
// if current overlay is over the half area of the target cell
// return target number
function getOverlay(_hover) {
    var _Hover = new Object();
    _Hover.middleX = parseInt(getCss(_hover, 'left')) + parseInt(getCss(_hover, 'width')) / 2;
    _Hover.middleY = parseInt(getCss(_hover, 'top')) + parseInt(getCss(_hover, 'height')) / 2;
    for (i = 0; i < makeTable.length; i++) {
        if ((makeTable[i].left < _Hover.middleX && _Hover.middleX < makeTable[i].right) && (makeTable[i].top < _Hover.middleY && _Hover.middleY < makeTable[i].bottom)) {
            return i;
        }
    }
}

function initTable(_col, _row) {
    //添加图片
    document.getElementsByTagName("body")[0].style.backgroundImage = "url(" + backgroundImge + ")";
    for (i = 0; i < td.length; i++) {
        td[i].style.backgroundImage = "url(" + mainImge + ")";
    }
    //
    _col = _col ? _col : 3;
    _row = _row ? _row : 3;
    var table_cellSpacing = parseInt(document.getElementsByTagName('table')[0].getAttribute('cellspacing'));
    //实现自定义数量，需要增加创建td,和*class数组
    for (i = 0, td = document.getElementsByTagName('td'); i < td.length; i++) {
        td[i].setAttribute('class', 'img' + i);
        td[i].setAttribute('id', i);
        td[i].style.height = "168px";
        td[i].style.width = "168px";
        td[i].style.position = "absolute";
        td[i].style.left = i % _row * (168 + table_cellSpacing) + (parseInt(i % _row / _row) + 1) * Margin + "px";
        td[i].style.top = parseInt(i / _col) * (168 + table_cellSpacing) + "px";
        // let trueId = td[i].getAttribute('trueId');
        // if (trueId){
        //     td[i].style.backgroundPosition = (-Math.abs((trueId % _row) - 0))*168 +'px ' + (-Math.abs(parseInt(trueId / _row) - 0))*168 + 'px';
        //     //确定td位置
        //     makeTable[i] = new Object();
        //     makeTable[i].left = parseInt(td[trueId].style.left);
        //     makeTable[i].top = parseInt(td[trueId].style.top);

        //     makeTable[i].right = parseInt(td[trueId].style.left) + parseInt(td[trueId].style.width);
        //     makeTable[i].bottom = parseInt(td[trueId].style.top) + parseInt(td[trueId].style.height);

        //     makeTable[i].middleX = (makeTable[i].left + makeTable[i].right) / 2;
        //     makeTable[i].middleY = (makeTable[i].top + makeTable[i].bottom) / 2;
        // }
        // else{
        //     td[i].style.backgroundPosition = (-Math.abs((i % _row) - 0))*168 +'px ' + (-Math.abs(parseInt(i / _row) - 0))*168 + 'px';
        //     makeTable[i] = new Object();
        //     makeTable[i].left = parseInt(td[i].style.left);
        //     makeTable[i].top = parseInt(td[i].style.top);

        //     makeTable[i].right = parseInt(td[i].style.left) + parseInt(td[i].style.width);
        //     makeTable[i].bottom = parseInt(td[i].style.top) + parseInt(td[i].style.height);

        //     makeTable[i].middleX = (makeTable[i].left + makeTable[i].right) / 2;
        //     makeTable[i].middleY = (makeTable[i].top + makeTable[i].bottom) / 2;

        // }
        makeTable[i] = new Object();
        makeTable[i].left = parseInt(td[i].style.left);
        makeTable[i].top = parseInt(td[i].style.top);

        makeTable[i].right = parseInt(td[i].style.left) + parseInt(td[i].style.width);
        makeTable[i].bottom = parseInt(td[i].style.top) + parseInt(td[i].style.height);

        makeTable[i].middleX = (makeTable[i].left + makeTable[i].right) / 2;
        makeTable[i].middleY = (makeTable[i].top + makeTable[i].bottom) / 2;

    }
}

// give each cell a current id location
function random_disorder() {
    initTable();
    used = [];
    for (i = 0, td = document.getElementsByTagName('td'); i < td.length; i++) {
        //打乱拼图块:设置td class（包含背景图定位），id为当前td位置，class，trueid为实际位置
        var class_id;
        do {

            class_id = get_Random(9);
            if (used.length == 9)
                break;
        }
        while (contains(used, class_id));

        td[i].setAttribute('class', 'img' + class_id);

        // td[i].getAttribute('id')
        td[i].setAttribute('trueId', class_id);

        used[i] = class_id;

    }
    if (stop >= 12) {
        clearInterval(clock);
        stop = 0;
    } else
        stop++;
}



function drag(obj, mouseX, mouseY, successAction) {
    // trueId = obj.getAttribute('trueId')
    // console.log(obj.getAttribute('trueId'))
    obj.style.zIndex = "2";
    obj.style.zIndex = "2";
    var templateObj = {
        left: getCss(obj, 'left'),
        top: getCss(obj, 'top'),
        currentX: mouseX,
        currentY: mouseY,
        flag: true
    };

    document.onmousemove = function(event) {
        var e = event ? event : window.event;
        if (templateObj.flag) {
            var nowX = e.clientX,
                nowY = e.clientY;
            var disX = nowX - templateObj.currentX,
                disY = nowY - templateObj.currentY;
            obj.style.left = parseInt(templateObj.left) + disX + "px";
            obj.style.top = parseInt(templateObj.top) + disY + "px";
            if (event.preventDefault) {
                event.preventDefault();
            }
            return false;
        }

        if (typeof callback == "function") {
            callback(parseInt(templateObj.left) + disX, parseInt(templateObj.top) + disY);
        }
    }

    for (i = 0; i < td.length; i++) {
        td[i].onmouseup = function() {
            obj.style.zindex = "0";
            obj.style.zIndex = "0";
            templateObj.flag = false;

            var oLI = getOverlay(obj);
            var OverLay = makeTable[oLI];

            if (getCss(obj, "left") !== "auto") {
                // locate table
                obj.style.left = makeTable[obj.id].left + "px";
                // locate picture
                var oldClass = obj.getAttribute('class');
                //alert(oLI);
                obj.setAttribute('class', document.getElementById(oLI.toString()).getAttribute('class'));
                document.getElementById(oLI).setAttribute('class', oldClass);

            }
            if (getCss(obj, "top") !== "auto") {
                // locate table
                obj.style.top = makeTable[obj.id].top + "px";
            }
            //addTitle();
            if (isWin()) {
                successAction();
            }
        };
    }

}

// Reset game
document.getElementById('restartGame').addEventListener('click', function() {
   location.reload(true);
});

// Start game
document.getElementById('startGame').addEventListener('click', function() {

    console.log("Start Game")
    
    // random divide
    clock = setInterval("random_disorder()", 40);

    //listen mouse event
    for (i = 0; i < td.length; i++) {
        td[i].addEventListener('mousedown', function() {
            //drag
            drag(event.target, event.clientX, event.clientY, successFunction);
        });

    }
});


// Congradulation message
var successFunction = function() {
    alert("Congradulations!");
};

initTable();

// function flashBack() {
//     var bodyDom = document.getElementsByTagName('body')[0];
//     bodyDom.style.backgroundImage = "url(image/kaola.png)";
// }

// function flash2() {
//     document.getElementsByTagName("body")[0].style.backgroundImage = "url(image/kaola.jpg)"
// }

// function flash() {
//     var bodyDom = document.getElementsByTagName('body')[0];
//     bodyDom.style.backgroundImage = "url(image/kaola.png)";
// }