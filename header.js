document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();
    const isLoggedIn = localStorage.getItem('meezanLoggedIn');

    if (!isLoggedIn && currentPage !== "login.html" && currentPage !== "index.html" && currentPage !== "") {
        window.location.href = "login.html";
        return;
    }

    if (currentPage === "index.html" || currentPage === "login.html" || currentPage === "") {
        return;
    }

    let currentLang = localStorage.getItem('meezanLang') || 'ar';

    const headerHTML = `
        <style>
            .platform-global-header {
                position: sticky;
                top: 0;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.95);
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
            }
            .platform-global-logo {
                font-weight: 900;
                color: #0F2C59;
                font-size: 1.35rem;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 10px;
                white-space: nowrap;
            }
            .platform-global-links {
                display: flex;
                gap: 12px;
                align-items: center;
                flex-wrap: nowrap;
            }
            
            /* القائمة المنسدلة */
            .dropdown {
                position: relative;
                display: inline-block;
            }
            .dropbtn {
                background: #f8fafc;
                color: #0F2C59;
                border: 2px solid #e2e8f0;
                padding: 8px 18px;
                border-radius: 12px;
                font-family: 'Cairo', sans-serif;
                font-weight: bold;
                font-size: 0.9rem;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                white-space: nowrap;
                transition: all 0.3s ease;
            }
            .dropbtn:hover {
                border-color: #10b981;
                background: #f1f5f9;
            }
            .dropdown-content {
                display: none;
                position: absolute;
                top: 130%;
                background-color: #ffffff;
                min-width: 210px;
                box-shadow: 0 15px 35px rgba(15, 44, 89, 0.1);
                border-radius: 14px;
                padding: 8px;
                z-index: 1000;
                border: 1px solid #e2e8f0;
            }
            /* تحديد اتجاه القائمة المنسدلة بناءً على لغة الصفحة */
            html[dir="rtl"] .dropdown-content { right: 0; left: auto; }
            html[dir="ltr"] .dropdown-content { left: 0; right: auto; }

            .dropdown-content a {
                color: #1e293b;
                padding: 10px 14px;
                text-decoration: none;
                display: block;
                font-weight: 700;
                font-size: 0.88rem;
                border-radius: 8px;
                transition: all 0.2s;
            }
            .dropdown-content a:hover {
                background-color: #f1f5f9;
                color: #10b981;
            }
            .dropdown.active .dropdown-content {
                display: block;
            }

            .lang-btn {
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                padding: 8px 16px;
                border-radius: 12px;
                font-family: 'Cairo', sans-serif;
                font-weight: bold;
                cursor: pointer;
                color: #0F2C59;
                white-space: nowrap;
                transition: all 0.3s;
            }
            .lang-btn:hover { background: #f1f5f9; border-color: #10b981; }

            .logout-btn {
                text-decoration: none;
                color: #ef4444;
                font-weight: 700;
                font-size: 0.9rem;
                padding: 8px 16px;
                border-radius: 12px;
                background: #fee2e2;
                border: 2px solid #fecaca;
                white-space: nowrap;
                transition: all 0.3s ease;
            }
            .logout-btn:hover {
                background: #fecaca;
            }

            @media(max-width: 768px) {
                .platform-global-header { padding: 12px 15px; flex-direction: column; gap: 15px; }
                .platform-global-links { width: 100%; justify-content: center; flex-wrap: wrap; }
            }
        </style>

        <nav class="platform-global-header">
            <a href="dashboard.html" class="platform-global-logo">
                ⚖️ <span data-translate="brand">منصة ميزان - MEEZAN</span>
            </a>
            <div class="platform-global-links">
                <div class="dropdown" id="globalDropdown">
                    <button class="dropbtn" onclick="toggleGlobalDropdown()">
                        <span data-translate="nav_menu_title">📁 صفحات المنصة</span> ▾
                    </button>
                    <div class="dropdown-content">
                        <a href="dashboard.html" data-translate="nav_dash">📊 تحليلات الموازنة</a>
                        <a href="meezan.html" data-translate="nav_citizen">📝 بوابة البلاغات</a>
                        <a href="admin.html" data-translate="nav_admin">🔐 لوحة المسؤولين</a>
                    </div>
                </div>

                <button class="lang-btn" onclick="togglePlatformLanguage()" id="langToggleBtn">English 🌐</button>
                <a href="login.html" onclick="logoutUser()" class="logout-btn" data-translate="nav_logout">تسجيل الخروج</a>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    applyPlatformLanguage(currentLang);
});

function toggleGlobalDropdown() {
    const dropdown = document.getElementById('globalDropdown');
    dropdown.classList.toggle('active');
}

window.addEventListener('click', function(e) {
    const dropdown = document.getElementById('globalDropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

const sharedDictionary = {
    ar: {
        brand: "منصة ميزان - MEEZAN",
        nav_menu_title: "📁 صفحات المنصة",
        nav_dash: "📊 تحليلات الموازنة",
        nav_citizen: "📝 بوابة البلاغات",
        nav_admin: "🔐 لوحة المسؤولين",
        nav_logout: "تسجيل الخروج",
        langBtn: "English 🌐"
    },
    en: {
        brand: "MEEZAN Platform",
        nav_menu_title: "📁 Platform Pages",
        nav_dash: "📊 Budget Analytics",
        nav_citizen: "📝 Citizen Portal",
        nav_admin: "🔐 Admin Dashboard",
        nav_logout: "Logout",
        langBtn: "العربية 🌐"
    }
};

function togglePlatformLanguage() {
    let currentLang = localStorage.getItem('meezanLang') || 'ar';
    let newLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('meezanLang', newLang);
    applyPlatformLanguage(newLang);
    location.reload();
}

function applyPlatformLanguage(lang) {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (sharedDictionary[lang] && sharedDictionary[lang][key]) {
            element.innerText = sharedDictionary[lang][key];
        }
    });

    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.innerText = sharedDictionary[lang].langBtn;
    }
}

function logoutUser() {
    localStorage.removeItem('meezanLoggedIn');
}
