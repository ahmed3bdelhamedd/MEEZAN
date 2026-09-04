document.addEventListener("DOMContentLoaded", function () {
    // التحقق من اللغة المحفوظة أو ضبط الافتراضية للعربية
    let currentLang = localStorage.getItem('meezanLang') || 'ar';

    const headerHTML = `
        <style>
            .platform-global-header {
                position: sticky;
                top: 0;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid #e2e8f0;
                padding: 12px 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
                font-family: 'Cairo', sans-serif;
                margin-bottom: 25px;
                border-radius: 12px;
            }
            .platform-global-logo {
                font-weight: 900;
                color: #0F2C59;
                font-size: 1.25rem;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .platform-global-links {
                display: flex;
                gap: 12px;
                align-items: center;
                flex-wrap: wrap;
            }
            .platform-global-links a, .lang-btn {
                text-decoration: none;
                color: #64748b;
                font-weight: 600;
                font-size: 0.9rem;
                padding: 6px 12px;
                border-radius: 8px;
                transition: all 0.2s ease;
                background: transparent;
                border: none;
                cursor: pointer;
                font-family: 'Cairo', sans-serif;
            }
            .platform-global-links a:hover, .lang-btn:hover {
                color: #10b981;
                background: #f1f5f9;
            }
            .platform-global-links a.active {
                color: #ffffff;
                background: #10b981;
            }
            .lang-btn {
                border: 1px solid #cbd5e1;
                color: #0F2C59;
                font-weight: bold;
            }
            .platform-global-links a.logout {
                color: #ef4444;
                background: #fee2e2;
            }
            .platform-global-links a.logout:hover {
                background: #fecaca;
            }
        </style>

        <nav class="platform-global-header" id="globalNav">
            <a href="dashboard.html" class="platform-logo-text">
                ⚖️ <span data-translate="brand">منصة ميزان - MEEZAN</span>
            </a>
            <div class="platform-global-links">
                <a href="dashboard.html" id="nav-dashboard" data-translate="nav_dashboard">تحليلات الموازنة</a>
                <a href="meezan.html" id="nav-meezan" data-translate="nav_citizen">بوابة البلاغات الذكية</a>
                <a href="admin.html" id="nav-admin" data-translate="nav_admin">لوحة المسؤولين</a>
                <button class="lang-btn" onclick="toggleLanguage()" id="langToggleBtn">English 🌐</button>
                <a href="index.html" class="logout" data-translate="nav_logout">تسجيل الخروج</a>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // تطبيق اتجاه الصفحة واللغة فور التحميل
    applyLanguage(currentLang);

    // تحديد الصفحة النشطة
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "dashboard.html") document.getElementById("nav-dashboard")?.classList.add("active");
    if (currentPage === "meezan.html") document.getElementById("nav-meezan")?.classList.add("active");
    if (currentPage === "admin.html") document.getElementById("nav-admin")?.classList.add("active");
});

// قاموس الترجمات الأساسي لعناصر المنصة
const translations = {
    ar: {
        brand: "منصة ميزان - MEEZAN",
        nav_dashboard: "تحليلات الموازنة",
        nav_citizen: "بوابة البلاغات الذكية",
        nav_admin: "لوحة المسؤولين",
        nav_logout: "تسجيل الخروج",
        langBtn: "English 🌐"
    },
    en: {
        brand: "MEEZAN Platform",
        nav_dashboard: "Budget Analytics",
        nav_citizen: "Citizen Portal",
        nav_admin: "Admin Dashboard",
        nav_logout: "Logout",
        langBtn: "العربية 🌐"
    }
};

function toggleLanguage() {
    let currentLang = localStorage.getItem('meezanLang') || 'ar';
    let newLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('meezanLang', newLang);
    applyLanguage(newLang);
}

function applyLanguage(lang) {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // تغيير النصوص التي تحتوي على وسوم الترجمة
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerText = translations[lang][key];
        }
    });

    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.innerText = translations[lang].langBtn;
    }
}
