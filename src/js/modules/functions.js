export function isWebp() {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height === 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        let className = support ? 'webp' : 'no-webp'
        document.documentElement.classList.add(className)
    });
}

export function selectChange() {
    let tracks = document.querySelectorAll('.track');
    let images = document.querySelectorAll('.select__image');
    
    tracks.forEach(el => {
        el.addEventListener('click', e => {
            images.forEach(i => i.classList.remove('selected'))
            tracks.forEach(track => track.classList.remove('selected'))
            
            let id = el.getAttribute('select-for')
            let image = document.getElementById(id)
            image.classList.add('selected')
            el.classList.add('selected')
        })
    })
}

export class Slider {
    
    constructor() {
        this.selected = 0
        this.slides = Array.from(document.querySelector('.slider__slides').children);
        this.slider = document.querySelector('.slider__slider');
        this.navigation = document.querySelector('.slider__navigation');
        
        this.initNavigation()
        this.initArrows()
        this.initSlider()
    }
    
    initSlider() {
        this.slider.append(this.createElement(['slider__slide-visible', 'front'], this.slides[this.selected]))
        this.slider.append(this.createElement(['slider__slide-visible', 'center']))
        this.slider.append(this.createElement(['slider__slide-visible', 'back']))
        this.slider.append(this.createElement(['slider__slide-visible', 'next']))
    }
    
    initNavigation() {
        this.navigates = []
        
        this.slides.forEach((e, i) => {
            let nav = this.createElement(['slider__navigate'])
            this.navigates.push(nav)
            this.navigation.append(nav)
        })
        
        this.navigates.forEach((e, i) => e.addEventListener('click', event => {
            this.navigates.forEach(nav => nav.classList.remove('selected'))
            e.classList.add('selected')
            if (Math.abs(this.selected % this.slides.length) !== i) {
                this.selected = i
                this.changeSlide()
            }
        }))
        
        this.changeNav()
    }
    
    changeNav() {
        this.navigates.forEach((e, i) => {
            if (i !== Math.abs(this.selected % this.slides.length)) {
                e.classList.remove('selected')
                return
            }
            e.classList.add('selected')
        })
    }
    
    createElement(classes, content = '') {
        let e = document.createElement('div')
        e.classList.add(...classes)
        e.append(content)
        return e
    }
    
    initArrows() {
        let next = document.querySelector('.slider__arrow-next');
        let prev = document.querySelector('.slider__arrow-prev');

        next.addEventListener('click', e => {
            this.selected++
            this.changeSlide()
            this.changeNav()
        })
        prev.addEventListener('click', e => {
            this.selected--
            if (this.selected < 0) 
                this.selected = this.slides.length - 1
            this.changeSlide()
            this.changeNav()
        })
    }
    
    changeSlide() {
        let center = this.slider.querySelector('.center')
        let front = this.slider.querySelector('.front')
        let back = this.slider.querySelector('.back')
        let next = this.slider.querySelector('.next')
        center.append(this.slides[Math.abs(this.selected) % this.slides.length])
        
        front.classList.add('out')
        front.classList.remove('front')
        
        center.classList.add('front')
        center.classList.remove('center')
        
        back.classList.add('center')
        back.classList.remove('back')
        
        next.classList.add('back')
        next.classList.remove('next')
        
        this.slider.append(this.createElement(['slider__slide-visible', 'next']))
        
        let t = setTimeout(() => {
            front.remove()
            clearTimeout(t)
        }, 500);
    }
}