document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. НАСТРОЙКА ОБЛОЖКИ (HERO) --- */
    const heroSection = document.getElementById('hero-section');
    if (heroSection && typeof heroCover !== 'undefined' && heroCover) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('files/${heroCover}')`;
    }

    /* --- 2. ГЕНЕРАЦИЯ СЛАЙДОВ (МОДУЛИ) --- */
    const wrapper = document.getElementById('swiper-wrapper');
    if (wrapper && typeof sliderImages !== 'undefined' && sliderImages.length > 0) {
        sliderImages.forEach(fileName => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'swiper-slide';
            
            const img = document.createElement('img');
            img.src = `files/${fileName}`;
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
        aboutImgElement.src = `files/${aboutImage1}`;
    }

    // Клик по картинке (анимация смены)
    if (aboutImgElement && typeof aboutImage2 !== 'undefined') {
        aboutImgElement.addEventListener('click', function() {
            
            // Анимация увеличения
            this.classList.add('switching');

            // Смена фото в момент пика (через 300мс)
            setTimeout(() => {
                if (this.src.includes(aboutImage1)) {
                    this.src = `files/${aboutImage2}`;
                } else {
                    this.src = `files/${aboutImage1}`;
                }

                // Уменьшение обратно
                this.classList.remove('switching');
            }, 300);
        });
    }

    /* --- 5. ЗАГРУЗКА ВИДЕО МЕХАНИЗМА --- */
    const videoElement = document.getElementById('tech-video');
    
    if (videoElement && typeof mechanismVideo !== 'undefined') {
        videoElement.src = `files/${mechanismVideo}`;
    }

    /* --- 6. ГЕНЕРАЦИЯ ЦВЕТОВ И МАТЕРИАЛОВ --- */
    
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
            img.src = `files/colors/${item.file}`; 
            img.alt = item.name;
            img.className = 'color-circle';
            
            // Подпись названия
            const name = document.createElement('p');
            name.className = 'color-name';
            name.innerText = item.name;
            
            // Событие клика для открытия модального окна
            img.addEventListener('click', () => {
                openModal(`files/colors/${item.file}`, item.name);
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


    /* --- 7. ЛОГИКА МОДАЛЬНОГО ОКНА ДЛЯ ФОТО (ЛАЙТБОКС) --- */
    
    const modal = document.getElementById('color-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    // Ищем кнопку закрытия по классу (первую найденную)
    const spanClose = document.querySelector('.modal-close');

    // Функция открытия фото
    function openModal(src, text) {
        if (!modal) return;
        
        modal.style.display = "flex";
        // Небольшая задержка нужна, чтобы сработала CSS-анимация opacity
        setTimeout(() => { modal.classList.add('show'); }, 10);
        
        modalImg.src = src;
        captionText.innerText = text;
        
        // Блокируем прокрутку страницы
        document.body.style.overflow = "hidden"; 
    }

    // Функция закрытия фото
    function closeModal() {
        if (!modal) return;

        modal.classList.remove('show');
        // Ждем окончания анимации (300мс) перед скрытием
        setTimeout(() => { 
            modal.style.display = "none"; 
            document.body.style.overflow = "auto"; // Возвращаем прокрутку
        }, 300);
    }

    // Закрытие фото по клику на крестик
    if (spanClose) {
        spanClose.onclick = function() { 
            closeModal();
        }
    }

    // Закрытие фото по клику на темный фон
    if (modal) {
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        }
    }


    /* --- 8. ЗАГРУЗКА ССЫЛОК ИЗ ФАЙЛОВ --- */
    
    // Функция для чтения текста из файла и вставки в href
    function fetchAndSetLink(filePath, elementId) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error("Файл не найден");
                return response.text();
            })
            .then(text => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.href = text.trim(); // .trim() убирает лишние пробелы и переносы строк
                }
            })
            .catch(err => console.log("Ошибка загрузки ссылки:", filePath));
    }

    // Загружаем ссылки, если пути указаны в config.js
    if (typeof linkWhatsAppPath !== 'undefined') fetchAndSetLink(linkWhatsAppPath, 'btn-whatsapp');
    if (typeof linkTelegramPath !== 'undefined') fetchAndSetLink(linkTelegramPath, 'btn-telegram');
    if (typeof linkYoutubePath !== 'undefined') fetchAndSetLink(linkYoutubePath, 'btn-youtube');


    /* --- 9. ФОРМА ЗАЯВКИ И ОТПРАВКА В TELEGRAM --- */
    
    const formModal = document.getElementById('form-modal');
    const openFormBtn = document.getElementById('open-form-btn');
    const formCloseBtn = document.querySelector('.form-close'); // Вторая кнопка закрытия (для формы)
    const orderForm = document.getElementById('order-form');

    // Функция открытия формы
    if (openFormBtn) {
        openFormBtn.addEventListener('click', () => {
            if (formModal) {
                formModal.style.display = "flex";
                setTimeout(() => { formModal.classList.add('show'); }, 10);
                document.body.style.overflow = "hidden";
            }
        });
    }

    // Функция закрытия формы
    function closeForm() {
        if (!formModal) return;
        formModal.classList.remove('show');
        setTimeout(() => { 
            formModal.style.display = "none"; 
            document.body.style.overflow = "auto"; 
        }, 300);
    }

    // Закрытие по крестику
    if (formCloseBtn) {
        formCloseBtn.onclick = closeForm;
    }
    
    // Закрытие по клику на фон (если клик не по форме)
    window.addEventListener('click', (e) => {
        if (e.target === formModal) {
            closeForm();
        }
    });

    // ЛОГИКА ОТПРАВКИ
    if (orderForm) {
        orderForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            const name = document.getElementById('input-name').value;
            const phone = document.getElementById('input-phone').value;
            const btn = document.querySelector('.submit-btn');
            const originalText = btn.innerText;
            
            btn.innerText = "Отправка...";
            btn.disabled = true;

            try {
                // Берем данные сразу из переменных, без fetch
                if (!telegramBotToken || !telegramChatId) {
                    throw new Error("Токен не настроен в config.js");
                }

                const message = `🔥 <b>НОВАЯ ЗАЯВКА</b> 🔥%0A%0A👤 <b>Имя:</b> ${name}%0A📱 <b>Телефон:</b> ${phone}`;
                const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${message}&parse_mode=html`;

                const sendResponse = await fetch(url);

                if (sendResponse.ok) {
                    alert("Спасибо! Ваша заявка успешно отправлена.");
                    orderForm.reset(); 
                    closeForm(); 
                } else {
                    alert("Ошибка отправки.");
                }
            } catch (error) {
                console.error("Ошибка:", error);
                alert("Ошибка отправки заявки.");
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    /* --- 10. АККОРДЕОН FAQ --- */
    
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // 1. Закрываем все остальные (Опционально)
            // Если хотите, чтобы открывалось много сразу - удалите этот блок
            document.querySelectorAll('.faq-question').forEach(item => {
                item.classList.remove('active');
                item.nextElementSibling.style.maxHeight = null;
            });

            // 2. Если нажатый не был открыт - открываем его
            if (!isActive) {
                question.classList.add('active');
                // scrollHeight - это реальная высота спрятанного контента
                answer.style.maxHeight = answer.scrollHeight + "px";
            } 
            // Если был открыт - он закроется (так как мы выше закрыли все)
        });
    });

    /* --- 11. ВАУ-ЭФФЕКТЫ (ВИБРАЦИЯ) --- */
    
    // Функция вибрации (если поддерживается устройством)
    function triggerHaptic(duration = 10) {
        // Проверяем, есть ли API (обычно Android)
        if (navigator.vibrate) {
            navigator.vibrate(duration); // Вибрация в миллисекундах
        }
    }

    // Находим все кнопки, на которые хотим добавить эффект
    const hapticButtons = document.querySelectorAll('.hero-btn, .request-btn, .social-btn, .color-circle, .modal-close, .faq-question');

    hapticButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            triggerHaptic(300); // Очень короткий "тык" (15мс)
        });
    });

});