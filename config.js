/* --- НАСТРОЙКИ КОНТЕНТА --- */

// 1. Название файла для обложки сайта
const heroCover = "cover.jpg"; 

// 2. Список файлов для слайдера (Объекты с файлом и описанием для SEO)
// Дублируем список для бесконечной прокрутки
const sliderImages = [
    // --- КРУГ 1 ---
    { file: "slide1.png", alt: "Шкаф-кровать трансформер цена Ростов" },
    { file: "slide2.png", alt: "Кровать-трансформер с диваном 3 в 1" },
    { file: "slide3.png", alt: "Размеры шкаф-кровати Udobna" },
    { file: "slide4.png", alt: "Цвета мебели трансформер на заказ" },
    { file: "slide5.png", alt: "Преимущества откидной кровати" },
    
    // --- КРУГ 2 (Дубликаты для плавности) ---
    { file: "slide1.png", alt: "Купить шкаф-кровать в Ростове-на-Дону" },
    { file: "slide2.png", alt: "Мебель трансформер для малогабаритной квартиры" },
    { file: "slide3.png", alt: "Схема размеров кровати-трансформера" },
    { file: "slide4.png", alt: "Каталог цветов ЛДСП и Велюра" },
    { file: "slide5.png", alt: "Производство мебели Udobna Ростов" },

];

// 3. Картинки для блока "О нас"
const aboutImage1 = "about_us.jpg";   // Первая (исходная)
const aboutImage2 = "about_us2.jpg";  // Вторая (на которую меняем)

// 4. Видео для блока технических характеристик
const mechanismVideo = "mechanism.mp4";

// 5. Цвета и материалы (Файлы должны лежать в папке files/colors/)
const ldspColors = [
    { name: "Белый", file: "wood white.png" },
    { name: "Серый камень", file: "wood gray.png" },
    { name: "Бежевый", file: "wood beige.png" },
    { name: "Сонома", file: "wood sonoma.png" },
    { name: "Венге", file: "wood venge.png" },
    { name: "Антрацит", file: "wood antrasit.png" }
];

const velourColors = [
    { name: "Коричневый", file: "velour brown.png" },
    { name: "Темный", file: "velour dark.png" },
    { name: "Серый", file: "velour gray.png" },
    { name: "Синий", file: "velour blue.png" }
];

/* --- 7. КОНТАКТЫ И ССЫЛКИ --- */
// Прямые ссылки
const linkWhatsApp = "https://wa.me/79885155515"; 
const linkTelegram = "https://t.me/Udobna_Chat"; 
const linkYoutube = "https://www.youtube.com/@UdobnaMebel";

// Настройки бота
const telegramBotToken = "7558283184:AAHm6tbplgZNX0MgYi3ZC_aSF-dzc9jJndg"; 
const telegramChatId = "1584547360";