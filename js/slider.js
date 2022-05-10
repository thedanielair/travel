'use strict'

class SliderMech {
    constructor(options) {
        this.massive = options.massive;
        this.slider = document.querySelector(".slider");
        this.controller = [];
        this.controllerPlace = document.querySelector(".slider__control");
        this.gallery = []; //выполняет функцию буфера обмена для createPh(i) & removePh(i)
        this.galleryList = document.querySelector(".slider__list");
        this.arrowLeft = document.querySelector(".arrows__left");
        this.arrowRight = document.querySelector(".arrows__right");
        this.duration = options.duration;
        this.delay = this.duration + 100;
        this.actualElemIndex = options.actualIndex;
        this.direction = options.direction;
        this.innerHeight = window.innerHeight;
        this.innerWidth = window.innerWidth;
        this.directionSettings = {}
        if (this.direction === "vertical") {
            this.directionSettings = {
                lineValue: this.innerHeight,
                styleProperty: "translateY",
            }
            
        }
        if (this.direction === "horizontal") {
            this.directionSettings = {
                lineValue: this.innerWidth,
                styleProperty: "translateX",
            }
        }
    }

    init() {
        console.log(this);
        console.log("Ширина экрана = " + this.innerHeight + " | Высота экрана = " + this.innerWidth);

        this.createControlPoses();
        this.makeActiveControlElements(this.actualElemIndex);
        this.hideInactiveArrow(this.actualElemIndex);

        this.controller.forEach((item, i) => {
            item.addEventListener("click", () => {
                if (i===this.actualElemIndex) {
                    
                } else {
                    this.isControlBlocked(this.actualElemIndex, i, item);
                }
            });
        });
        this.arrowLeft.addEventListener("click", () => {
            if (!this.arrowLeft.classList.contains('arrows__arrow--inactive')) {
                this.isControlBlocked(this.actualElemIndex, this.actualElemIndex-1, this.controller[this.actualElemIndex-1])
            }
        })
        this.arrowRight.addEventListener("click", () => {
            if (!this.arrowRight.classList.contains('arrows__arrow--inactive')) {
                this.isControlBlocked(this.actualElemIndex, this.actualElemIndex+1, this.controller[this.actualElemIndex+1])
            }
        })
    }

    createPh(i) {
        let img = document.createElement('img');
        img.src = this.massive[i].img;
        this.gallery[i] = img;
        this.galleryList.append(img);
    }

    removePh(i) {
        this.gallery[i].remove();
    }

    setCoordinatePh(i, compare) {
        console.log(this.gallery[i]);
        if (compare) {
            this.gallery[i].style = "transform:" + this.directionSettings.styleProperty + "(" + this.directionSettings.lineValue + "px);";
        } else {
            this.gallery[i].style = "transform:" + this.directionSettings.styleProperty + "(-" + this.directionSettings.lineValue + "px);";
        }
    }

    activeControlClassToggle(item) {
        item.classList.toggle('slider__control-pos--active');
    }

    makeActiveControlElements(i) {
        this.activeControlClassToggle(this.controller[i]);
        this.createPh(i);
    }

    createControlPoses() {
        for (let i=0; i<this.massive.length; i++) {
            let numeral = i+1
            let controlPos = document.createElement('span');
            if (numeral<10) {
                controlPos.innerHTML = "0" + numeral;
            } else {
                controlPos.innerHTML = numeral;
            }
            controlPos.classList.add('slider__control-pos');
            this.controller[i] = controlPos;
            this.controllerPlace.append(controlPos);
        }
    }

    removeToogledPoses() {
        this.controller.forEach((item) => {
            if (item.classList.contains('slider__control-pos--active')) {
                item.classList.remove('slider__control-pos--active');
            }
        })
    }

    blockControlPos() {
        this.controllerPlace.classList.add('slider__control--blocked');
        setTimeout(() => {
            this.controllerPlace.classList.remove('slider__control--blocked');
        }, this.delay)
    }

    hideInactiveArrow(actualIndex) {
        if (actualIndex === 0) {
            this.arrowLeft.classList.add('arrows__arrow--inactive');
        }
        if (actualIndex > 0) {
            this.arrowLeft.classList.remove('arrows__arrow--inactive');
        }
        if (actualIndex === this.massive.length-1) {
            this.arrowRight.classList.add('arrows__arrow--inactive');
        }
        if (actualIndex < this.massive.length-1) {
            this.arrowRight.classList.remove('arrows__arrow--inactive');
        }  
    }

    delayRemovePh(i) {
        setTimeout(() => {
            this.removePh(i, this.massive)
        }, this.delay);
    }

    delayRemoveStyleGallery() {
        setTimeout(() => {
            this.galleryList.style = "transform:" + this.directionSettings.styleProperty + "(0px);";
        }, this.delay);
    }

    delayRemoveStylePh(i) {
        setTimeout(() => {
            this.gallery[i].style = "transform:" + this.directionSettings.styleProperty + "(0px);";
        }, this.delay);
    }

    moveGallery(directionSettings, duration, item, isForward) {
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

        function settingsAnimateBegin(directionSettings, duration, item) {
            animateBegin({
                duration: duration,
                timing: function(timeFraction) {
                    return Math.pow(timeFraction, 2);
                },
                draw: function(progress) {
                    if (isForward) {
                        item.style = "transform:" + directionSettings.styleProperty + "(-" + progress * directionSettings.lineValue + "px);";
                    } else {
                        item.style = "transform:" + directionSettings.styleProperty + "(" + progress * directionSettings.lineValue + "px);";
                    }
                    
                }
            })
        }
        settingsAnimateBegin(directionSettings, duration, item);
    }
    

    performAnimations(actualIndex, nextIndex, controlPoint) {
        let isForward = nextIndex > actualIndex;
        this.removeToogledPoses();
        this.activeControlClassToggle(controlPoint);
        this.createPh(nextIndex);
        this.setCoordinatePh(nextIndex, isForward);
        this.moveGallery(this.directionSettings, this.duration, this.galleryList, isForward);
        this.delayRemovePh(actualIndex, this.delay);
        this.delayRemoveStyleGallery();
        this.delayRemoveStylePh(nextIndex);
        this.blockControlPos();
        this.actualElemIndex = nextIndex;
    }

    isControlBlocked(actualIndex, nextIndex, controlPoint) {
        if (!this.controllerPlace.classList.contains('slider__control--blocked')) {
            this.performAnimations(actualIndex, nextIndex, controlPoint);
        }
        this.hideInactiveArrow(this.actualElemIndex);
    }
    
}