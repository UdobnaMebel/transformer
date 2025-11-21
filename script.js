document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. НАСТРОЙКА ОБЛОЖКИ (HERO) --- */
    const heroSection = document.getElementById('hero-section');
    if (heroSection && typeof heroCover !== 'undefined' && heroCover) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/${heroCover}')`;
    }

    /* --- 2. ГЕНЕРАЦИЯ СЛАЙДОВ (МОДУЛИ) --- */
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

    // Клик по картинке (анимация смены)
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

    /* --- 5. ЗАГРУЗКА ВИДЕО МЕХАНИЗМА --- */
    const videoElement = document.getElementById('tech-video');
    
    if (videoElement && typeof mechanismVideo !== 'undefined') {
        videoElement.src = `images/${mechanismVideo}`;
    }

    /* --- 6. ГЕНЕРАЦИЯ ЦВЕТОВ И МАТЕРИАЛОВ (НОВОЕ) --- */
    
    function generateColors(containerId, dataArray) {
        const container = document.getElementById(containerId);
        // Если контейнера или данных нет, выходим, чтобы не было ошибок
        if (!container || !dataArray) return;

        dataArray.forEach(item => {
            // Создаем обертку для одного цвета
            const wrapper = document.createElement('div');
            wrapper.className = 'color-item';
            
            // Картинка (кружочек)
            const img = document.createElement('img');
            // Важно: берем из папки colors/
            img.src = `images/colors/${item.file}`; 
            img.alt = item.name;
            img.className = 'color-circle';
            
            // Подпись названия
            const name = document.createElement('p');
            name.className = 'color-name';
            name.innerText = item.name;
            
            // Событие клика для открытия модального окна
            img.addEventListener('click', () => {
                openModal(`images/colors/${item.file}`, item.name);
            });

            // Собираем всё вместе
            wrapper.appendChild(img);
            wrapper.appendChild(name);
            container.appendChild(wrapper);
        });
    }

    // Запускаем генерацию, если данные есть в config.js
    if (typeof ldspColors !== 'undefined') {
        generateColors('ldsp-grid', ldspColors);
    }
    if (typeof velourColors !== 'undefined') {
        generateColors('velour-grid', velourColors);
    }


    /* --- 7. ЛОГИКА МОДАЛЬНОГО ОКНА (НОВОЕ) --- */
    
    const modal = document.getElementById('color-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    // Ищем кнопку закрытия по классу
    const spanClose = document.querySelector('.modal-close');

    // Функция открытия
    function openModal(src, text) {
        if (!modal) return;
        
        modal.style.display = "flex";
        // Небольшая задержка нужна, чтобы сработала CSS-анимация opacity
        setTimeout(() => { modal.classList.add('show'); }, 10);
        
        modalImg.src = src;
        captionText.innerText = text;
        
        // Блокируем прокрутку страницы, пока открыто фото
        document.body.style.overflow = "hidden"; 
    }

    // Функция закрытия
    function closeModal() {
        if (!modal) return;

        modal.classList.remove('show');
        // Ждем окончания анимации (300мс) перед скрытием
        setTimeout(() => { 
            modal.style.display = "none"; 
            document.body.style.overflow = "auto"; // Возвращаем прокрутку
        }, 300);
    }

    // Закрытие по клику на крестик
    if (spanClose) {
        spanClose.onclick = function() { 
            closeModal();
        }
    }

    // Закрытие по клику на темный фон вокруг картинки
    if (modal) {
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        }
    }

});