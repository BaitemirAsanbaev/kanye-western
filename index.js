//переменные

//прицел
let aim = document.createElement('div');
document.body.append(aim);
aim.className = 'gamePart'

//счёт
let score = 0;
let scr = document.querySelector('#score');
scr.className = 'gamePart';

//скорость появления врагов
let intervalTime = 2000;

//магазин
let magaz = 3;
let mag = document.querySelector('#magaz');


//патроны
let bullets = 10;
let bul = document.querySelector('#bullets')

//конец игры
let gameOver = false;



let scoreArray = [];




let loveIt = new Audio;
loveIt.src = "./audio/i-love-it.mp3";


//события


//стрельба (расход патронов и звук)
document.body.addEventListener('mousedown', () => {

    if(bullets > 0){
            bullets--;
            reload();
            let audio = new Audio();
            audio.preload = 'auto';
            audio.src = './audio/shot.mp3';
            audio.play();
    }else{
        let relAudio = new Audio();
        relAudio.preload ='auto';
        relAudio.src = './audio/empty.mp3';
        relAudio.play();
    }
    if(gameOver){
        bul.innerText = '';
    }
    
    if(gameOver){
        clearInterval(int);
    }
})

//прицел следует за мышкой
document.body.addEventListener('mousemove', function(event){
    aim.style.position = "absolute";
    aim.style.backgroundSize = 'contain';
    aim.style.backgroundImage = 'url(./imges/aim.png)';
    aim.style.width = '100px';
    aim.style.height = '100px';
    aim.style.top = (event.clientY - 50) + "px";
    aim.style.left = (event.clientX - 50) + "px";
    if(gameOver){
        aim.style.display = 'none';
    }
})

//функция перезарядки
function reload(){
    bul.innerHTML = "bullets: " + bullets + '/10';
}


//расход магазина и перезарядка
document.body.addEventListener('keydown', (event) =>{
    if(event.keyCode == 82){
        if( magaz > 0){
            
            let relAudio = new Audio();
            relAudio.preload ='auto';
            relAudio.src = './audio/reload.mp3';
            relAudio.play();

            magaz --;
            mag.innerHTML = 'magazine: ' + magaz;
            if( bullets >= 8){
                bullets = 10;
                reload();
            }else{
                bullets += 3;
                reload();
            }
        }
        if(gameOver){
            mag.innerText = '';
            bul.innerText = '';
            
        } 
    }
})



//интервал появления врагов
let int = setInterval(() => {    
    let screenWidth = window.innerWidth;
    let screenHight = window.innerHeight;
    let maxX = screenWidth - 100;
    let maxY =screenHight -100;
    let enemy = document.createElement('div');
    document.body.append(enemy);
    enemy.style.height = '100px';
    enemy.style.width = '100px';
    enemy.style.backgroundImage = 'url(./imges/kanye.png)'
    enemy.style.backgroundSize = 'contain'
    enemy.style.position = 'absolute';
    enemy.style.top = (Math.floor(Math.random() * (maxY - 100)) + 100) + 'px';
    enemy.style.left = (Math.floor(Math.random() * (maxX - 100)) + 100) + 'px';

    //при попадании исчезновение врагов
    enemy.addEventListener('mousedown', () => {
        if(bullets > 0){
            enemy.parentNode.removeChild(enemy);
            score ++;
            reload();
        }
        if(score >= 10 || score >=15){
            intervalTime -= 1000;
        }
        
        scr.innerHTML = "score: " + score;
        scoreArray.push(score);
    })

}, intervalTime);



//интервал появления нового магазина
let intMag = setInterval(() => {

    let plusMag = document.createElement('div');
    document.body.append(plusMag);
    plusMag.style.height = '100px';
    plusMag.style.width = '100px';
    plusMag.style.backgroundImage = 'url(./imges/plusMag.png)'
    plusMag.style.backgroundSize = 'contain'
    plusMag.style.position = 'absolute';
    plusMag.style.top = (Math.floor(Math.random() * (700 - 100)) + 100) + 'px';
    plusMag.style.left = (Math.floor(Math.random() * (1200 - 100)) + 100) + 'px';
    
    //при попадании исчезновение нового магазина
    plusMag.addEventListener('mousedown', () => {
        if(bullets > 0){
            plusMag.parentNode.removeChild(plusMag);
            magaz ++;
        }
        mag.innerHTML = "magazine: " + magaz;
    })
}, 9000);



let check = setInterval(() =>{
    if(magaz == 0 && bullets == 0){
        gameOver = true;
    }
    
    if(gameOver){
        let gamE = document.createElement('div');
        let gamH = document.createElement('h1');
        let evilKanye =document.createElement('div');
        document.body.append(gamE);
        gamE.append(gamH);
        gamE.append(evilKanye);
        evilKanye.className = ("evil-kanye");
        gamH.innerText = "Game Over";
        gamE.className = "game-o";
        gamH.className = 'game-h';
        bul.innerText = '';
        mag.innerText = '';
        clearInterval(intMag);
        clearInterval(int);
        loveIt.play();
    }
}, 2000)
//