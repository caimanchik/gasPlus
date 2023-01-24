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