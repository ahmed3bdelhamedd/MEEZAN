document.addEventListener("DOMContentLoaded", function () {
    let currentLang = localStorage.getItem('meezanLang') || 'ar';

    const headerHTML = `
        <style>
            .platform-global-header {
                position: sticky;
                top: 0;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid #e2e8f0;
                padding: 15px 35px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 20px -2px rgba(15, 44, 89, 0.05);
                font-family: 'Cairo', sans-serif;
                margin-bottom: 30px;
                border-radius: 0 0 16px 16px;
                animation: slideDown 0.6s ease-out;
            }
            @keyframes slideDown {
                from { transform: translateY(-100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .platform-global-logo {
                font-weight: 900;
                color: #0F2C59;
                font-size: 1.35rem;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 10px;
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
                font-size: 0.95rem;
                padding: 8px 16px;
                border-radius: 10px;
                transition: all 0.3s ease;
                background: transparent;
                border: none;
                cursor: pointer;
                font-family: 'Cairo', sans-serif;
            }
            .platform-global-links a:hover, .lang-btn:hover {
                color: #10b981;
                background: #f1f5f9;
                transform: translateY(-2px);
            }
            .platform-global-links a.active {
                color: #ffffff;
                background: #10b981;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
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

        <nav class="platform-global-header">
            <a href="dashboard.html" class="platform-global-logo">
                ⚖️ <span data-translate="brand">منصة ميزان - MEEZAN</span>
            </a>
            <div class="platform-global-links">
                <a href="dashboard.html" id="nav-dashboard" data-translate="nav_dashboard">تحليلات الموازنة</a>
                <a href="meezan.html" id="nav-meezan" data-translate="nav_citizen">بوابة البلاغات الذكية</a>
                <a href="admin.html" id="nav-admin" data-translate="nav_admin">لوحة المسؤولين</a>
                <button class="lang-btn" onclick="togglePlatformLanguage()" id="langToggleBtn">English 🌐</button>
                <a href="index.html" class="logout" data-translate="nav_logout">تسجيل الخروج</a>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    applyPlatformLanguage(currentLang);

    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "dashboard.html") document.getElementById("nav-dashboard")?.classList.add("active");
    if (currentPage === "meezan.html") document.getElementById("nav-meezan")?.classList.add("active");
    if (currentPage === "admin.html") document.getElementById("nav-admin")?.classList.add("active");
});

const globalTranslations = {
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

function togglePlatformLanguage() {
    let currentLang = localStorage.getItem('meezanLang') || 'ar';
    let newLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('meezanLang', newLang);
    applyPlatformLanguage(newLang);
}

function applyPlatformLanguage(lang) {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (globalTranslations[lang] && globalTranslations[lang][key]) {
            element.innerText = globalTranslations[lang][key];
        }
    });

    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.innerText = globalTranslations[lang].langBtn;
    }
}
