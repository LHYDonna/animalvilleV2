var game_id = 0;
var animal_id = 0;
var startTime = 0;
var endTime = 0;
var money = 100;
var animalLife = 1;
var animal_hunger = 1;
let animal_eat = 1;

// set animal values
// get animal food from database
function initialAnimalValue(){

}

let cleaner = document.getElementById("cleaner");

function allowDrop(ev) {
    ev.preventDefault();
  }

function drag(ev){
    money = money - 10;
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("drag");
    console.log("=================");
    if (money >= 0){
        updateMoney(money);
    }
    else{
        alert("No money to spend! Go to puzzle mode to collect more money!");
        upDateDatabase();
    }
    if (ev.path[2].id == 'foodTable'){
        if (ev.path[0].id.slice(-1) == animal_eat){
            animal_hunger = animal_hunger + 0.1;
            this.setHunger(animal_hunger);
        }
    }
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("drop");
    // console.log(document.getElementById(data));

    var imgSet = document.getElementsByClassName('imgElem');
    for (var i = 0; i < imgSet.length; i++){
        let locX = parseInt(imgSet[i].style.left.slice(0,-2));
        let locY = parseInt(imgSet[i].style.top.slice(0,-2));
        // - document.getElementById("garden").offsetTop
        let picH = imgSet[i].offsetHeight;
        let picW = imgSet[i].offsetWidth;
        console.log('drag: ', ev.clientX,ev.clientY);
        console.log('X: ',locX-picW,locX+picW);
        console.log('H: ',imgSet[i].offsetHeight);
        console.log('Y: ',locY-picH,locY+picH);
        console.log('X,Y: ',locX,locY);
        console.log('div height: ', document.getElementById("garden").offsetTop);
        if (locX-picW <= ev.clientX && ev.clientX <= locX+picW && locY-picH <= ev.clientY && ev.clientY <= locY+picH){
            console.log('Delete1');
            document.getElementById("garden").removeChild(imgSet[i]);
            animalLife = animalLife + 0.1;
            this.setLife(animalLife);
        }
    }
    
}

// get last game id from database.
function getLastGame(){

}

// If game is over
function isGameOver(){
    if (this.animalLife <= 0 || this.animal_hunger <= 0){
        return true;
    }
    return false;
}

function overFunction() {
    alert("Game Over!");
};

// update database
function upDateDatabase(){
    endTime = Date.now();
    console.log(startTime);
    console.log(endTime);
    // game_id, start_time, end_time, user_id, animal_id, money
}

function startGame(){
    this.setInitial();
}

function setInitial(){
    this.setLife(animalLife);
    this.setHunger(animal_hunger);
    this.setFoodList();
    startTime = Date.now();
    loadAnimal();
}


// set FoodList
function setFoodList(){
    // get food images and food ids from database
    let foodList = ['image/food/fish.png','image/food/fruit.png','image/food/meat.png','image/food/insect.png','image/food/seed.png'];
    var table = document.getElementById('foodTable');
    for (var i = 0; i < foodList.length; i++){
        var td = document.createElement('td');
        var imgElem = document.createElement('img');
        imgElem.src = foodList[i];
        imgElem.draggable = 'true';
        imgElem.addEventListener('dragstart',function(event){
            drag(event);
            event.dataTransfer.setData("Text", event.target.id);
        });
        // imgElem.ondragstart = drag(imgElem);
        imgElem.setAttribute('id', 'imgFood' + i);
        td.appendChild(imgElem);
        table.appendChild(td);
    }
}

// load animal grow page
function loadAnimal(){
    // get animal picture using animal_id
    // let pic = getAnimalPic();
    let pic = "image/kaola2.png";
    var elem = document.createElement("img");
    document.getElementById("garden").appendChild(elem);
    elem.src = pic;
    elem.style.display = 'block';
    elem.style.marginLeft = '300px';
    elem.style.marginTop = '150px';
}

// reload blank page
function reloadPage(){
    animalLife = 1;
    animal_hunger = 1;
}

// set life process bar
function setLife(life){
    var elem = document.getElementById("lifeBar"); 
    elem.style.width = 152*life + "px";
    console.log("life: ", life);
    console.log("width: ", 152*life);
    if (152*life < 20){
        elem.style.backgroundColor = 'red';
    }
}

// set hunger process bar
function setHunger(hunger){
    var elem = document.getElementById("hungerBar"); 
    elem.style.width = 152*hunger + "px";
    if (152*hunger < 20){
        elem.style.backgroundColor = 'red';
    }
}

// get animal picture using animal_id
function getAnimalPic(){
    var pic;
    return pic;
}

var myVar = setInterval(myTimer, 5000);

function myTimer() {
    animalLife = animalLife - 0.1;
    animal_hunger = animal_hunger - 0.1;
    setLife(animalLife);
    setHunger(animal_hunger);
    setPlastic();
    setAir();
    // if (animalLife == 0.9){
    //     myStopFunction();
    // }
    if (isGameOver()){
        overFunction();
        reloadPage();
        upDateDatabase();
        myStopFunction();
    }
}

function myStopFunction() {
  clearInterval(myVar);
}


// set air pullution
var airPollution = 0;
function setAir(){
    // console.log('sky', document.getElementById('sky').style.opacity);
    airPollution = airPollution + 0.05;
    document.getElementById('sky').style.opacity = airPollution;
}

// set white pollution
function setPlastic(){
    let garden = document.getElementById("garden");
    let pic = "image/pollution/bag.png";
    var imgElem = document.createElement("img");
    
    imgElem.src = pic;
    imgElem.style.position = 'absolute';

    // console.log(garden.offsetWidth)
    imgElem.setAttribute('class','imgElem');
    imgElem.style.top = Math.round(Math.random() * garden.offsetHeight) - 2*imgElem.clientHeight + garden.offsetTop + "px";
    imgElem.style.left = Math.round(Math.random() * garden.offsetWidth) - 2*imgElem.clientWidth + garden.offsetLeft + "px";
    document.getElementById("garden").appendChild(imgElem);
    console.log(imgElem);
}

// update money display
function updateMoney(fund){
    document.getElementById('score').innerHTML = fund;
}

startGame();