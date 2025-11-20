document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. НАСТРОЙКА ОБЛОЖКИ (HERO) --- */
    const heroSection = document.getElementById('hero-section');
    if (heroSection && typeof heroCover !== 'undefined' && heroCover) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/${heroCover}')`;
    }

    /* --- 2. ГЕНЕРАЦИЯ СЛАЙДОВ --- */
    const wrapper = document.getElementById('swiper-wrapper');
    if (wrapper && typeof sliderImages !== 'undefined' && sliderImages.length > 0) {
        sliderImages.forEach(fileName => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'swiper-slide';
            
            const img = document.createElement('img');
            img.src = `images/${fileName}`;
            img.alt = "Модуль Udobna";
            
            slideDiv.appendChild(img);
            wrapper.appendChild(slideDiv);
        });
    }

    /* --- 3. ЗАПУСК СЛАЙДЕРА --- */
    var swiper = new Swiper(".mySwiper", {
        // Основные настройки
        loop: true,              // Бесконечный цикл
        centeredSlides: true,    // Центральный слайд по середине
        slideToClickedSlide: true, // Переход к слайду по клику
        speed: 600,              // Плавность

        // Управление
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        // Адаптивность
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 1.6,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });

    /* --- 4. ЛОГИКА ДЛЯ ФОТО "О НАС" --- */
    const aboutImgElement = document.getElementById('about-dynamic-img');

    // Загрузка первой картинки
    if (aboutImgElement && typeof aboutImage1 !== 'undefined') {
        aboutImgElement.src = `images/${aboutImage1}`;
    }

    // Клик по картинке
    if (aboutImgElement && typeof aboutImage2 !== 'undefined') {
        aboutImgElement.addEventListener('click', function() {
            
            // Анимация увеличения
            this.classList.add('switching');

            // Смена фото в момент пика (через 300мс)
            setTimeout(() => {
                if (this.src.includes(aboutImage1)) {
                    this.src = `images/${aboutImage2}`;
                } else {
                    this.src = `images/${aboutImage1}`;
                }

                // Уменьшение обратно
                this.classList.remove('switching');
            }, 300);
        });
    }

});