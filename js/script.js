//=====INDICATION=====//
let massiveControl = [
//     {
//     place: "italy",
//     header: "The Grand Canal in Venice",
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
//     img: "img/bg-1.jpg",
// },{
//     place: "ireland",
//     header: "Massive mountain in Ireland",
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
//     img: "img/bg-2.jpg",
// },{
//     place: "new york",
//     header: "Busy street in New York",
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
//     img: "img/bg-3.jpg",
// },{
//     place: "forest",
//     header: "Beautiful Forest",
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
//     img: "img/bg-4.jpg",
// },
{
    place: "",
    header: "",
    text: "",
    img: "img/bg-5.png",
},{
    place: "",
    header: "",
    text: "",
    img: "img/bg-6.png",}
,{
    place: "",
    header: "",
    text: "",
    img: "img/bg-7.png",
}
,{
    place: "",
    header: "",
    text: "",
    img: "img/bg-8.png",
}
,{
    place: "",
    header: "",
    text: "",
   img: "img/bg-9.png",
}]
const CONTROL_PLACE = document.querySelector(".slider__control");
const PHOTO_PLACE = document.querySelector(".slider__body");
const LEFT_ARROW = document.querySelector('.arrows__left');
const RIGHT_ARROW = document.querySelector('.arrows__right');
const WINDOW__INNER_HEIGHT = window.innerHeight;
console.log(WINDOW__INNER_HEIGHT);
//===================//



//=====FUNCTIONS=====//
function createControlPoses(massive, pos) {
    for (let i=0; i<massive.length; i++) {
        let pos = i+1;
        let controlPos = document.createElement('span');
        if (pos<10) {
        controlPos.innerHTML = "0" + pos;
        } else {
        controlPos.innerHTML = pos;
        }
        controlPos.classList.add('slider__control-pos');
        massive[i].body = controlPos;
        CONTROL_PLACE.append(controlPos);
    }
}

function createPh(i, massive) {
    let img = document.createElement('img');
    img.src = massive[i].img;
    massive[i].photo = img;
    PHOTO_PLACE.append(img);
}
function removePh(i, massive) {
    massive[i].photo.remove();
}

function classToggle(item) {
    item.classList.toggle('slider__control-pos--active');
}

function makeActiveControlElements(i, massive) {
    classToggle(massive[i].body);
    createPh(i, massive);
}

function removeToogledPoses(arr) {
    arr.forEach((item) => {
        if (item.body.classList.contains('slider__control-pos--active')) {
            item.body.classList.remove('slider__control-pos--active');
        }
    })
}

function animateBegin(options) {

  var start = performance.now();

  requestAnimationFrame(function animateBegin(time) {
    // timeFraction от 0 до 1
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    var progress = options.timing(timeFraction)
    
    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animateBegin);
    }

  });
}

function settingsAnimateBegin(elem, duration, massive, direction) {
    animateBegin({
        duration: duration,
        timing: function(timeFraction) {
            return Math.pow(timeFraction, 2);
        },
        draw: function(progress) {
            massive[elem].photo.style[direction] = progress * WINDOW__INNER_HEIGHT + 'px';
        }
    })
}

function delayRemovePh(elem, delay, massive) {
    function removeActivePh() {
        removePh(elem, massive);
    }
    setTimeout(removeActivePh, delay);
}

function delayRemoveStylePh(elem, delay, massive) {
    function removeStyle() {
        massive[elem].photo.style = "bottom:" + 0;
    }
    setTimeout(removeStyle, delay);
}

function performAnimations(nextElem, currentElem, duration, massive) {
    createPh(nextElem, massive);
    settingsAnimateBegin(currentElem, duration, massive, "bottom");
    settingsAnimateBegin(nextElem, duration, massive, "bottom");
    let delay = duration + 100;
    delayRemovePh(currentElem, delay, massive);
    delayRemoveStylePh(nextElem, delay, massive);
    activeElem = nextElem;
}

function isControlBlocked(nextIndex, currentIndex, controlPoint, duration, massive) {
    if (!CONTROL_PLACE.classList.contains('slider__control--blocked')) {
        removeToogledPoses(massive);
        classToggle(controlPoint);
        performAnimations(nextIndex, currentIndex, duration, massive);
        blockControlPos(CONTROL_PLACE, duration + 500); 
    }
    hideInactiveArrow(activeElem, LEFT_ARROW, RIGHT_ARROW, massiveControl);
}

function blockControlPos(body, delay) {
    body.classList.add('slider__control--blocked');
    setTimeout(() => {
        body.classList.remove('slider__control--blocked');
    }, delay)
}

function hideInactiveArrow(currentIndex, leftArrow, rightArrow, massive) {
    if (currentIndex === 0) {
        leftArrow.classList.add('arrows__arrow--inactive');
    }
    if (currentIndex === massive.length-1) {
        rightArrow.classList.add('arrows__arrow--inactive');
    } 
    if (currentIndex > 0) {
        leftArrow.classList.remove('arrows__arrow--inactive');
    }
    if (currentIndex < massive.length-1) {
            rightArrow.classList.remove('arrows__arrow--inactive');
    } 
    
}

//===================//



//=====BEGIN=====//
let activeElem = 0;
createControlPoses(massiveControl);
makeActiveControlElements(activeElem, massiveControl);
hideInactiveArrow(activeElem, LEFT_ARROW, RIGHT_ARROW, massiveControl);

massiveControl.forEach((item, i) => {
    item.body.addEventListener("click", () => {
        isControlBlocked(i, activeElem, item.body, 1000, massiveControl);
    }
    )
})

LEFT_ARROW.addEventListener("click", () => {
    if (!LEFT_ARROW.classList.contains('arrows__arrow--inactive')) {
        isControlBlocked(activeElem - 1, activeElem, massiveControl[activeElem-1].body, 1000, massiveControl);
    }
})

RIGHT_ARROW.addEventListener("click", () => {
    if (!RIGHT_ARROW.classList.contains('arrows__arrow--inactive')) {
        isControlBlocked(activeElem + 1, activeElem, massiveControl[activeElem+1].body, 1000, massiveControl);
    } 
})
  
//===============//

console.log(massiveControl);

//FIX

//передавай в функциях стандартные значения массива
//создай объект опцию для настройки
//блок поставь чтобы чел не кликал на ту же цифру которая активная
