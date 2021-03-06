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


let interval;

document.body.addEventListener('mousedown', function(event){



    
    interval = setInterval(function(){
        let audio = new Audio();
        audio.preload = 'auto';
        audio.src = './shot.mp3';
        audio.play();
    })
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
        enemy.style.display = 'none';
        score ++;
        let scr = document.querySelector('#score');
        scr.innerText = score;

})
}, intervalTime)
