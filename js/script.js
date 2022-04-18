//=====INDICATION=====//
let sliderControlPosArr = [];
let sliderControlPhotoArr = ["img/bg-1.jpg", "img/bg-2.jpg", "img/bg-3.jpg", "img/bg-4.jpg",];
// import * as massive from "../js/massive.json"
//===================//



//=====FUNCTIONS=====//
function createControlPoses(posArr, phArr) {
    let place = document.querySelector('.slider__control');
    for (let i=0; i<phArr.length; i++) {
        let pos = i+1;
        let controlPos = document.createElement('span');
        if (pos<10) {
        controlPos.innerHTML = "0" + pos;
        } else {
        controlPos.innerHTML = pos;
        }
        controlPos.classList.add('slider__control-pos');
        if (pos === 1) {
            controlPos.classList.add('slider__control-pos--active');
        }
        posArr.push(controlPos);
        place.append(controlPos);
    }
}

function createPh(i, phArr) {
    let place = document.querySelector('.slider__body')
    let img = document.createElement('img');
    img.src = phArr[i];
    place.append(img);
}

function classToggle(item) {
    item.classList.toggle('slider__control-pos--active');
}

function removeToogledPoses(arr) {
    arr.forEach((item) => {
        if (item.classList.contains('slider__control-pos--active')) {
            item.classList.remove('slider__control-pos--active');
        }
    })
}

function connectPosesPhoto(posArr, phArr) {
    posArr.forEach((item, i) => {
        item.photo = phArr[i];
    })
}
//===================//



//=====MECHANISM=====//
createControlPoses(sliderControlPosArr, sliderControlPhotoArr);
createPh(1, sliderControlPhotoArr);

sliderControlPosArr.forEach((item, i) => {
    item.addEventListener("click", () => {
        removeToogledPoses(sliderControlPosArr);
        classToggle(item);
    }
    )
})
//===================//


console.log(sliderControlPosArr);
console.log(sliderControlPhotoArr.length);



