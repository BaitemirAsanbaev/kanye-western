let aim = document.createElement('div');
document.body.append(aim);

document.body.addEventListener('mousemove', function(event){
    aim.style.position = "absolute";
    aim.style.backgroundSize = 'contain';
    aim.style.backgroundImage = 'url(./aim.png)';
    aim.style.width = '100px';
    aim.style.height = '100px';
    aim.style.top = (event.clientY - 50) + "px";
    aim.style.left = (event.clientX - 50) + "px";
})

function reload(){
    bul.innerHTML = "bullets: " + bullets + '/30';
}
let magaz = 3;
let mag = document.querySelector('#magaz');
let interval;
let bullets = 30;
let bul = document.querySelector('#bullets')
document.body.addEventListener('keydown', (event) =>{
    if( magaz > 0){
        magaz --;
        mag.innerHTML = 'magazine: ' + magaz;
        if(event.keyCode == 82 && bullets > 25){
            bullets = 30;
            reload();
        }else{
            bullets +=5;
            reload();
        }
    }
    
})
document.body.addEventListener('mousedown', function(event){

    bullets--;
    
    if(bullets >= 0){
        reload();
    }
    if(bullets > 0){
        interval = setInterval(function(){
            let audio = new Audio();
            audio.preload = 'auto';
            audio.src = './shot.mp3';
            audio.play();
        })
    }
    
})
document.body.addEventListener('mouseup', function(event){
    clearInterval(interval);
})


let score = 0;
let intervalTime = 3000;

while(score % 10 == 0){
    intervalTime -= 1000;
    if(score == 0){
        break
    }
}


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
    
    enemy.addEventListener('mousedown', () => {
        if(bullets > 0){
            enemy.style.display = 'none';
            score ++;
        }
        let scr = document.querySelector('#score');
        scr.innerHTML = "score: " + score;
    })
}, intervalTime);

let intMag = setInterval(() => {
    let plusMag = document.createElement('div');
    document.body.append(plusMag);
    plusMag.style.height = '100px';
    plusMag.style.width = '100px';
    plusMag.style.backgroundColor = 'red'
    plusMag.style.backgroundSize = 'contain'
    plusMag.style.position = 'absolute';
    plusMag.style.top = (Math.floor(Math.random() * (700 - 100)) + 100) + 'px';
    plusMag.style.left = (Math.floor(Math.random() * (1200 - 100)) + 100) + 'px';
    
    plusMag.addEventListener('mousedown', () => {
        if(bullets > 0){
            plusMag.style.display = 'none';
            magaz ++;
        }
        mag.innerHTML = "Magazine: " + mag;
    })
}, 6000);

