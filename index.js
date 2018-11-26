const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


document.addEventListener ('DOMContentLoaded', () => {         
    
    const backgrounds = $('.backgrounds')

    const thumbs = [...$$('.carousel div')]

    let changeTimeout

    for (const thumb of thumbs) {

        // создаем фоновый элемент
        const bg = document.createElement ('DIV')
        bg.style.backgroundImage = thumb.style.backgroundImage

        thumb.onclick = x => {

            // меняем .active
            for (const otherThumb of thumbs) {
                
                otherThumb.classList.toggle ('active', thumb === otherThumb)
                                    
                $('.slideshow .text').innerText = thumb.dataset.text
            }

            // добавляем фоновый элемент (таким образом, что он оказывается над предыдущими, что позволяет animation в CSS сработать)
            backgrounds.appendChild (bg)

            // отменяем предыдущий таймер перещелкивания
            if (changeTimeout) clearTimeout (changeTimeout)
            
            // добавляем таймер автоматического перещелкивания через 5 секунд
            changeTimeout = setTimeout (() => {

                const currentIndex = thumbs.findIndex (t => t.classList.contains ('active'))
                const nextIndex    = (currentIndex + 1) % thumbs.length

                thumbs[nextIndex].onclick ()

            }, 5000)

            // предотвращает фликер (фейд из белого фона) при первоначальной загрузке страницы
            document.body.style.backgroundImage = thumb.style.backgroundImage
        }
    }

    $('.carousel .active').onclick ()
})