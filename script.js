document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. НАСТРОЙКА ОБЛОЖКИ (HERO) --- */
    const heroSection = document.getElementById('hero-section');
    if (heroSection && typeof heroCover !== 'undefined' && heroCover) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('files/${heroCover}')`;
    }

    /* --- 2. ГЕНЕРАЦИЯ СЛАЙДОВ (МОДУЛИ) - ОБНОВЛЕНО --- */
    const wrapper = document.getElementById('swiper-wrapper');
    if (wrapper && typeof sliderImages !== 'undefined' && sliderImages.length > 0) {
        // Теперь перебираем объекты {file, alt}
        sliderImages.forEach(slide => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'swiper-slide';
            
            const img = document.createElement('img');
            // Берем путь из свойства .file
            img.src = `files/${slide.file}`;
            // Берем описание из свойства .alt (Важно для SEO)
            img.alt = slide.alt; 
            
            // Ленивая загрузка
            img.loading = "lazy"; 
            
            slideDiv.appendChild(img);
            wrapper.appendChild(slideDiv);
        });
    }

    /* --- 3. ЗАПУСК СЛАЙДЕРА --- */
    var swiper = new Swiper(".mySwiper", {
        loop: true,              
        centeredSlides: true,    
        slideToClickedSlide: true, 
        speed: 600,              

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 1.6, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
        },
    });

    /* --- 4. ЛОГИКА ДЛЯ ФОТО "О НАС" --- */
    const aboutImgElement = document.getElementById('about-dynamic-img');

    if (aboutImgElement && typeof aboutImage1 !== 'undefined') {
        aboutImgElement.src = `files/${aboutImage1}`;
    }

    if (aboutImgElement && typeof aboutImage2 !== 'undefined') {
        aboutImgElement.addEventListener('click', function() {
            this.classList.add('switching');
            setTimeout(() => {
                if (this.src.includes(aboutImage1)) {
                    this.src = `files/${aboutImage2}`;
                } else {
                    this.src = `files/${aboutImage1}`;
                }
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
        if (!container || !dataArray) return;

        dataArray.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'color-item';
            
            const img = document.createElement('img');
            img.src = `files/colors/${item.file}`; 
            img.alt = item.name;
            img.className = 'color-circle';
            img.loading = "lazy"; 
            
            const name = document.createElement('p');
            name.className = 'color-name';
            name.innerText = item.name;
            
            img.addEventListener('click', () => {
                openModal(`files/colors/${item.file}`, item.name);
            });

            wrapper.appendChild(img);
            wrapper.appendChild(name);
            container.appendChild(wrapper);
        });
    }

    if (typeof ldspColors !== 'undefined') generateColors('ldsp-grid', ldspColors);
    if (typeof velourColors !== 'undefined') generateColors('velour-grid', velourColors);


    /* --- 7. ЛОГИКА МОДАЛЬНОГО ОКНА (ЛАЙТБОКС) --- */
    const modal = document.getElementById('color-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const spanClose = document.querySelector('.modal-close');

    function openModal(src, text) {
        if (!modal) return;
        modal.style.display = "flex";
        setTimeout(() => { modal.classList.add('show'); }, 10);
        modalImg.src = src;
        captionText.innerText = text;
        document.body.style.overflow = "hidden"; 
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('show');
        setTimeout(() => { 
            modal.style.display = "none"; 
            document.body.style.overflow = "auto"; 
        }, 300);
    }

    if (spanClose) spanClose.onclick = closeModal;
    if (modal) modal.onclick = (e) => { if (e.target === modal) closeModal(); };


    /* --- 8. УСТАНОВКА ССЫЛОК --- */
    const waBtn = document.getElementById('btn-whatsapp');
    const tgBtn = document.getElementById('btn-telegram');
    const ytBtn = document.getElementById('btn-youtube');
    const stickyWaBtn = document.getElementById('sticky-whatsapp'); 

    if (waBtn && typeof linkWhatsApp !== 'undefined') waBtn.href = linkWhatsApp;
    if (tgBtn && typeof linkTelegram !== 'undefined') tgBtn.href = linkTelegram;
    if (ytBtn && typeof linkYoutube !== 'undefined') ytBtn.href = linkYoutube;
    if (stickyWaBtn && typeof linkWhatsApp !== 'undefined') stickyWaBtn.href = linkWhatsApp;

    /* --- 9. ФОРМА ЗАЯВКИ И ОТПРАВКА --- */
    const formModal = document.getElementById('form-modal');
    const openFormBtn = document.getElementById('open-form-btn');
    const formCloseBtn = document.querySelector('.form-close');
    const orderForm = document.getElementById('order-form');

    if (openFormBtn) {
        openFormBtn.addEventListener('click', () => {
            if (formModal) {
                formModal.style.display = "flex";
                setTimeout(() => { formModal.classList.add('show'); }, 10);
                document.body.style.overflow = "hidden";
            }
        });
    }

    function closeForm() {
        if (!formModal) return;
        formModal.classList.remove('show');
        setTimeout(() => { 
            formModal.style.display = "none"; 
            document.body.style.overflow = "auto"; 
        }, 300);
    }

    if (formCloseBtn) formCloseBtn.onclick = closeForm;
    window.addEventListener('click', (e) => { if (e.target === formModal) closeForm(); });

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
                if (!telegramBotToken || !telegramChatId) throw new Error("Токен не настроен в config.js");

                const message = `🔥 <b>НОВАЯ ЗАЯВКА</b> 🔥%0A%0A👤 <b>Имя:</b> ${name}%0A📱 <b>Телефон:</b> ${phone}`;
                const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${message}&parse_mode=html`;

                const sendResponse = await fetch(url);

                if (sendResponse.ok) {
                    // ВАУ-ЭФФЕКТЫ
                    if (typeof confetti === 'function') {
                        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#FFD54F', '#ffffff', '#000000'] });
                    }
                    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate([100, 50, 100]); 

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

            document.querySelectorAll('.faq-question').forEach(item => {
                item.classList.remove('active');
                item.nextElementSibling.style.maxHeight = null;
            });

            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            } 
        });
    });

    /* --- 11. ВАУ-ЭФФЕКТЫ (ВИБРАЦИЯ) --- */
    function triggerHaptic() {
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([50]);
        }
    }

    const hapticButtons = document.querySelectorAll('a, button, .color-circle, .modal-close, .faq-question');
    hapticButtons.forEach(btn => {
        btn.addEventListener('pointerdown', () => {
            triggerHaptic();
        });
    });

});