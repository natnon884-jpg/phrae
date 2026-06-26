// Obfuscated links using Base64
const systems = {
    'farmer': 'aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J6NTBfVmJDNDlKa1FsNEo3cFBDdHJIZ0N0bGZBeFNUQVlRVXhsX1Y4cVN0bzBHUlNlZlJoYW9OaVhhOUFoTjRjZjYvZXhlYw==',
    'inventory': 'aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J5aGphQnpLQTFoaEpwQUpQQjU1OUhMZUxqZm9pX1N3MnltRTZsbzhFV2YyWUNxRDZ1Ym1kMmFFZnN4Y2t4RmNlUmUvZXhlYw==',
    'calculator': 'aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J3ZXJINjVTR3NNUlpyRGVRS2FjVWM2RXh1a3Nta29pNUxqSmR1SHRLb3FHbXJOM1g1QTh5UlpNMVA0WmRJMHhWTkRpUS9leGVj'
};

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const landingView = document.getElementById('landing-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const iframe = document.getElementById('content-frame');
    const navItems = document.querySelectorAll('.nav-item[data-sys]');
    const cards = document.querySelectorAll('.system-card');

    // 1. subtle 3D tilt effect on cards (Landing Page only)
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; 
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
            setTimeout(() => {
                card.style.transform = ''; 
            }, 400);
        });
    });

    // 2. Login flow: Switch to dashboard view
    loginBtn.addEventListener('click', () => {
        // Hide landing, Show dashboard
        landingView.classList.remove('view-active');
        landingView.classList.add('view-hidden');
        
        dashboardView.classList.remove('view-hidden');
        dashboardView.classList.add('view-active');

        // By default, load 'farmer' system
        loadSystem('farmer');
    });

    // 3. Logout flow: Switch to landing view
    logoutBtn.addEventListener('click', () => {
        // Clear iframe to stop processes
        iframe.src = 'about:blank';

        // Hide dashboard, Show landing
        dashboardView.classList.remove('view-active');
        dashboardView.classList.add('view-hidden');
        
        landingView.classList.remove('view-hidden');
        landingView.classList.add('view-active');
    });

    // 4. Sidebar navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sys = item.getAttribute('data-sys');
            loadSystem(sys);
        });
    });

    // Helper function to load system into iframe and update UI
    function loadSystem(sysKey) {
        if (systems[sysKey]) {
            // Update iframe src
            const url = atob(systems[sysKey]);
            iframe.src = url;

            // Update active state in sidebar
            navItems.forEach(nav => nav.classList.remove('active'));
            const activeNav = document.querySelector(`.nav-item[data-sys="${sysKey}"]`);
            if (activeNav) {
                activeNav.classList.add('active');
            }
        }
    }
});
