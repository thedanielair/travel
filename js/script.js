//=====INDICATION=====//
let massiveControl = [{
    place: "italy",
    header: "The Grand Canal in Venice",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
    img: "img/bg-1.jpg",
},{
    place: "ireland",
    header: "Massive mountain in Ireland",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
    img: "img/bg-2.jpg",
},{
    place: "new york",
    header: "Busy street in New York",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
    img: "img/bg-3.jpg",
},{
    place: "forest",
    header: "Beautiful Forest",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
    img: "img/bg-4.jpg",
}]
//===================//



//=====FUNCTIONS=====//
function createControlPoses(massive, pos) {
    let position = document.querySelector(pos);
    for (let i=0; i<massive.length; i++) {
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
        massive[i].body = controlPos;
        position.append(controlPos);
    }
}

function createPh(i, massive, pos) {
    let position = document.querySelector(pos)
    let img = document.createElement('img');
    img.src = massive[i].img;
    position.append(img);
}

function classToggle(item) {
    item.classList.toggle('slider__control-pos--active');
}

function removeToogledPoses(arr) {
    arr.forEach((item) => {
        if (item.body.classList.contains('slider__control-pos--active')) {
            item.body.classList.remove('slider__control-pos--active');
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
createControlPoses(massiveControl, ".slider__control");
createPh(0, massiveControl, ".slider__body");

massiveControl.forEach((item, i) => {
    let controlPos = item.body;
    controlPos.addEventListener("click", () => {
        removeToogledPoses(massiveControl);
        classToggle(controlPos);
    }
    )
})
//===================//

console.log(massiveControl);

