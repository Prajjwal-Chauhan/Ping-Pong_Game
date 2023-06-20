import Ball from "./ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById('ball'))
const playerPaddle = new Paddle(document.getElementById('player_paddle'))
const computerPaddle = new Paddle(document.getElementById('computer_paddle'))
const playerScoreElem = document.getElementById('player_score')
const computerScoreElem = document.getElementById('computer_score')
const cards = document.getElementById('cards');
// const card = document.getElementsByClassName("card");
const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const hard = document.getElementById('hard');
const extreme = document.getElementById('extreme');
const asian = document.getElementById('asian');
const level = document.getElementById('level');

let start = false
let SPEED = 0.025

let lastTime
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime
        // console.log(delta)
        if (start) ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y, SPEED)

        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'))

        document.documentElement.style.setProperty('--hue', hue + delta * 0.01)

        if (islose()) handleLose();

    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

function islose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()

    if (rect.right >= window.innerWidth) {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    else if (rect.left <= 0) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener('mousemove', e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

easy.addEventListener('click', () => {
    console.log(level.textContent)
    level.textContent = 'EASY'
    SPEED = 0.01
});
medium.addEventListener('click', () => {
    console.log(level.textContent)
    level.textContent = 'MEDIUM'
    SPEED = 0.02
});
hard.addEventListener('click', () => {
    console.log(level.textContent)
    level.textContent = 'HARD'
    SPEED = 0.03
});
extreme.addEventListener('click', () => {
    console.log(level.textContent)
    level.textContent = 'EXTREME'
    SPEED = 0.05
});
asian.addEventListener('click', () => {
    console.log(level.textContent)
    level.textContent = 'ASIAN'
    SPEED = 0.07
});

cards.addEventListener('click', () => {
    cards.remove();
    start = true;
});


// const cardPressed = e => {
//     //   level.innerHTML = `ID of <em>${e.target.innerHTML}</em> is <strong>${e.target.id}</strong>`;
//     level.textContent = e.target.id;
// }

// for (let car of card) {
// }






window.requestAnimationFrame(update);