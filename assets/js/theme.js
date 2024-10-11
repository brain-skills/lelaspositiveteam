document.addEventListener('DOMContentLoaded', function () {
    const themeLinks = document.querySelectorAll('.themelink');
    const htmlTag = document.documentElement;
    const themeIconActiveButton = document.querySelector('.theme-icon-active use');

    function updateIcon(theme, actualTheme) {
        let iconHref;
        if (theme === 'auto') {
            iconHref = '#circle-half';
        } else {
            switch (actualTheme) {
                case 'light':
                    iconHref = '#sun-fill';
                    break;
                case 'dark':
                    iconHref = '#moon-stars-fill';
                    break;
                default:
                    iconHref = '#sun-fill'; // Default icon if theme is undefined or invalid
            }
        }
        themeIconActiveButton.setAttribute('href', iconHref);
    }

    function updateActiveClass(theme) {
        themeLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-bs-theme-value') === theme) {
                link.classList.add('active');
            }
        });
    }

    function setTheme(theme, fromAutoCheck = false) {
        let actualTheme = theme;
        if (theme === 'auto') {
            const hours = new Date().getHours();
            actualTheme = (hours < 12) ? 'light' : 'dark';
            if (!fromAutoCheck) {
                localStorage.setItem('autoThemeTime', hours); // Save the time when 'auto' was set
            }
        }
        if (!actualTheme || actualTheme === 'null') actualTheme = 'light'; // Default to light if theme is null or undefined
        htmlTag.setAttribute('data-bs-theme', actualTheme);
        localStorage.setItem('theme', theme);
        updateIcon(theme, actualTheme);
        updateActiveClass(theme);
    }

    function loadTheme() {
        const storedTheme = localStorage.getItem('theme');
        const autoThemeTime = localStorage.getItem('autoThemeTime');
        if (storedTheme) {
            if (storedTheme === 'auto') {
                const currentHours = new Date().getHours();
                if (autoThemeTime && ((currentHours < 12 && autoThemeTime >= 12) || (currentHours >= 12 && autoThemeTime < 12))) {
                    setTheme('auto', true); // Recheck theme based on time
                } else {
                    setTheme('auto');
                }
            } else {
                setTheme(storedTheme);
            }
        } else {
            setTheme('auto'); // Default theme
        }
    }

    themeLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const theme = this.getAttribute('data-bs-theme-value');
            setTheme(theme);
        });
    });

    loadTheme();
});