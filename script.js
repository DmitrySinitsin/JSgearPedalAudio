let t1, t2;//таймеры
let start = false;//машина не заведена
const engine = new Audio('./audio/engine.mp3');//звук Холостого Хода
const audio = new Audio('./audio/car.mp3');//звук ЖМЕМ НА ГАЗ
engine.loop = true;//запускать ХХ по циклу
engine.volume = 1;//громкость ХХ     0.3

document.querySelector('.start').addEventListener('click', function () {
    if (start === false) {//если машина не заведена
        start = true;//машина заведена
        this.innerHTML = 'stop';//кнопка была старт стала стоп
        engine.play();//включение звука ХХ
        document.querySelector('.treadle').addEventListener('click', pushTreadle); // событие на педаль;
        document.querySelector('.progress-line').style.width = '100px';//положение тахометра на ХХ
    }
    else {
        // глушим
        start = false;
        this.innerHTML = 'start';//надпись на кнопке старт\стопа мотора
        engine.pause();//отключить звук мотора
        document.querySelector('.treadle').removeEventListener('click', pushTreadle); // больше не слушаем клик по педали
        document.querySelector('.progress-line').style.width = '0';//положение тахометра на нуле при выключенном моторе
        document.querySelector('.treadle').classList.remove('treadle-push');//педаль в положение ХХ
        t1 = clearTimeout(t1);//cброс
        t2 = clearTimeout(t2);//таймероа
        audio.pause();//тишина
        audio.currentTime = 0;//дорожку на старт
    }
});

function pushTreadle() {//нажатие на педаль газа
    t1 = clearTimeout(t1);//обнуление таймера на случай повторных кликов мышью
    t2 = clearTimeout(t2);
    this.classList.add('treadle-push');//добавили педали класс наклоняющий трансформом и ротэйтом
    document.querySelector('.progress-line').style.width = '400px';//увеличить полосу тахометра когда газуем
    audio.play();//включить звук ЖМЕМ НА ГАЗ
    stopTreadle();//функция отжатия педали
}

function stopTreadle() {//отпускаем педаль газа 
    t1 = setTimeout(() => {
        document.querySelector('.treadle').classList.remove('treadle-push');//удалили класс визуального нажатия на педаль газа
        document.querySelector('.progress-line').style.width = '100px';//тахометр на позицию ХХ
    }, 1000);//задержка 1 секунда
    t2 = setTimeout(() => {
        audio.pause();//остановка воспроизведения звука ЖМЕМ НА ГАЗ
        audio.currentTime = 0;//сброс звуковой дорожки ЖМЕМ НА ГАЗ на начало
    }, 1500);//задержка полторы секунды
}