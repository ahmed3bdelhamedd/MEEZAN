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

// القاموس الشامل لكل كلمات المنصة (الرئيسية، الهيدر، فريق العمل، التحليلات، البلاغات)
const sharedDictionary = {
    ar: {
        brand: "منصة ميزان - MEEZAN",
        nav_dashboard: "تحليلات الموازنة",
        nav_citizen: "بوابة البلاغات الذكية",
        nav_admin: "لوحة المسؤولين",
        nav_logout: "تسجيل الخروج",
        langBtn: "English 🌐",
        
        // الصفحة الرئيسية (index.html)
        home_enter: "تسجيل الدخول",
        hero_title: "منصة ميزان الرقمية (MEEZAN)",
        hero_desc: "الجسر الذكي لربط المواطن بالموازنة العامة للدولة والمشروعات التنموية. نحول بلاغات وشكاوى المواطنين إلى مؤشرات تحليلية دقيقة تدعم متخذ القرار.",
        explore_dash: "📊 استكشف تحليلات الموازنة",
        explore_login: "🔐 تسجيل الدخول للوحة التحكم",
        f1_title: "🔍 شفافية الموازنة العامة",
        f1_desc: "إمكانية استعراض مخصصات المحافظات والقطاعات المختلفة (صحة، تعليم، طرق) عبر بيانات تحليلية دقيقة.",
        f2_title: "🤖 بلاغات مدعومة بالذكاء الاصطناعي",
        f2_desc: "نظام ذكي يستقبل بلاغات المواطنين، يصنفها تلقائياً، ويحدد مستويات الأولوية والخطورة لسرعة الاستجابة.",
        f3_title: "📈 اتخاذ قرار مبني على البيانات",
        f3_desc: "تحويل الشكاوى المتكررة إلى رؤى وإحصائيات تساعد الأجهزة التنفيذية في توجيه الموارد للمناطق الأكثر احتياجاً.",
        
        // فريق العمل
        team_heading: "فريق العمل المطور للمشروع",
        team_sub: "النخبة التقنية خلف تصميم وتطوير منصة ميزان",
        member1_name: "أحمد عبدالحميد",
        member1_role: "Project Lead & Full-Stack Developer",
        member1_desc: "مطور منصة ميزان، مسؤول عن هندسة الأنظمة، ربط قواعد البيانات، وتكامل واجهات الذكاء الاصطناعي.",
        member2_name: "بسملة محمد فوزي",
        member2_role: "Data Analyst & UI/UX Designer",
        member2_desc: "مسؤولة عن تحليل بيانات الموازنة العامة، تصميم واجهات المستخدم، وتحسين تجربة التفاعل.",
        footer_text: "© 2026 منصة ميزان (MEEZAN) - جميع الحقوق محفوظة."
    },
    en: {
        brand: "MEEZAN Platform",
        nav_dashboard: "Budget Analytics",
        nav_citizen: "Citizen Portal",
        nav_admin: "Admin Dashboard",
        nav_logout: "Logout",
        langBtn: "العربية 🌐",
        
        // Homepage (index.html)
        home_enter: "Sign In",
        hero_title: "MEEZAN Digital Platform",
        hero_desc: "The smart bridge connecting citizens to the state budget and development projects. We transform citizen reports into accurate analytical indicators.",
        explore_dash: "📊 Explore Budget Analytics",
        explore_login: "🔐 Admin Dashboard Login",
        f1_title: "🔍 Budget Transparency",
        f1_desc: "Explore allocations across governorates and sectors (health, education, roads) through precise analytical data.",
        f2_title: "🤖 AI-Powered Reporting",
        f2_desc: "Smart system receiving reports, automatically categorizing them, and assessing priority and severity levels.",
        f3_title: "📈 Data-Driven Decisions",
        f3_desc: "Converting recurring complaints into actionable insights helping executive bodies allocate resources effectively.",
        
        // Team
        team_heading: "Project Development Team",
        team_sub: "The tech minds behind the design and development of MEEZAN",
        member1_name: "Ahmed Abdelhamed",
        member1_role: "Project Lead & Full-Stack Developer",
        member1_desc: "Platform Lead Developer, responsible for system architecture, database connectivity, and AI integration.",
        member2_name: "Basmala M. Fawzi",
        member2_role: "Data Analyst & UI/UX Designer",
        member2_desc: "Responsible for budget data analysis, UI/UX design, and enhancing user interaction experience.",
        footer_text: "© 2026 MEEZAN Platform - All Rights Reserved."
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
        if (sharedDictionary[lang] && sharedDictionary[lang][key]) {
            element.innerText = sharedDictionary[lang][key];
        }
    });

    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.innerText = sharedDictionary[lang].langBtn;
    }
}
