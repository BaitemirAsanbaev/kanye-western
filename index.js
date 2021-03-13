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
let intervalTime = 3000;

//магазин
let magaz = 3;
let mag = document.querySelector('#magaz');


//патроны
let bullets = 10;
let bul = document.querySelector('#bullets')

//конец игры
let gameOver = false;




//события
let check = setInterval(() =>{
    if(magaz == 0 && bullets == 0){
        gameOver = true;
    }
    
    if(gameOver){
        let gamE = document.createElement('h1')
        document.body.append(gamE);
        gamE.style.position = "absolute";
        gamE.style.top = "50%";
        gamE.style.left = "50%";
        gamE.innerText = "Game Over"
        bul.innerText = '';
        mag.innerText = '';
    
    }
    if(gameOver){
        clearInterval(intMag);
    }
}, 2000)

//стрельба (расход патронов и звук)
document.body.addEventListener('mousedown', () => {

    if(bullets >= 0){
        reload();
    }
    if(bullets > 0){
            bullets--;
            let audio = new Audio();
            audio.preload = 'auto';
            audio.src = './shot.mp3';
            audio.play();
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
    aim.style.backgroundImage = 'url(./aim.png)';
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
            magaz --;
            mag.innerHTML = 'magazine: ' + magaz;
            if( bullets > 9){
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

//цикл ускорения появления врагов
while(score % 10 == 0){
    intervalTime -= 1000;
    if(score == 0){
        break
    }
}

//интервал появления врагов
let int = setInterval(() => {

    let enemy = document.createElement('div');
    document.body.append(enemy);
    enemy.style.height = '100px';
    enemy.style.width = '100px';
    enemy.style.backgroundImage = 'url(./imges/kanye.png)'
    enemy.style.backgroundSize = 'contain'
    enemy.style.position = 'absolute';
    enemy.style.top = (Math.floor(Math.random() * (700 - 100)) + 100) + 'px';
    enemy.style.left = (Math.floor(Math.random() * (1200 - 100)) + 100) + 'px';

    //при попадании исчезновение врагов
    enemy.addEventListener('mousedown', () => {
        if(bullets > 0){
            enemy.style.display = 'none';
            score ++;
        }
        scr.innerHTML = "score: " + score;
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
            plusMag.style.display = 'none';
            magaz ++;
        }
        mag.innerHTML = "magazine: " + magaz;
    })
}, 6000);




//