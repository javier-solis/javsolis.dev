function addTimestamp(){
    if (Date.parse(document.lastModified) != 0){                        
        const div = document.getElementById('lastModified');
        div.insertAdjacentHTML('afterbegin', "<p>last modified " + document.lastModified + " est</p>");
    }
}

// --- Theme setting ---

const themeTarget = document.documentElement;
const prefersDarkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function toggleColorTheme() {
    const nextTheme = themeTarget.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
}

function setTheme(theme) {
    if (theme === 'dark') {
        themeTarget.setAttribute('data-theme', 'dark');
    } else {
        themeTarget.removeAttribute('data-theme');
    }
}

function getPreferredTheme() {
    return prefersDarkModeQuery.matches ? 'dark' : 'light';
}

function applyPreferredThemeOnLoad() {
    setTheme(getPreferredTheme());
}

function subscribeToSystemThemeChanges() {
    const handleSystemThemeChange = event => {
        setTheme(event.matches ? 'dark' : 'light');
    };

    prefersDarkModeQuery.addEventListener('change', handleSystemThemeChange);
}

subscribeToSystemThemeChanges();

// ---

function openLinksInNewTabs() {
    document.querySelectorAll('a').forEach(link => {
        link.setAttribute('target', '_blank');
    });
}


const iconConfigs = {
    'header-linkedin': {
        iconPath: 'icons/square-linkedin.svg',
        tooltip: 'LinkedIn',
        size: 'icon-large',
    },
    'header-github': {
        iconPath: 'icons/square-github.svg',
        tooltip: 'GitHub',
        size: 'icon-large',
    },
    'header-email': {
        iconPath: 'icons/square-envelope.svg',
        tooltip: 'Email',
        size: 'icon-large',
    },

    'proj-repo': {
        iconPath: 'icons/code-branch.svg',
        tooltip: 'Repository'
    },
    'proj-website': {
        iconPath: 'icons/arrow-up-right-from-square.svg',
        tooltip: 'Website'
    },
    // todo: improve naming to better differentiate between 'location' icons and 'time' icons
    'proj-wip': {
        iconPath: 'icons/clock.svg',
        tooltip: 'Work In Progress'
    }
    // todo: add additional 'time' icons like 'paused' and 'finished'
};

function applyIconsAndTooltips() {
    Object.entries(iconConfigs).forEach(([selector, config]) => {
        document.querySelectorAll(`.${selector}`).forEach(el => {
            // todo: verify that each element contains all the required fields

            // Apply size if provided
            if (config.size) {
                el.classList.add(config.size);
            }

            el.classList.add('icon-wrapper');

            // Add tooltip functionality
            // todo: if tooltip tag empty, don't add this part (and thus no tooltip)
            el.classList.add('tooltip-trigger');
            el.setAttribute('data-tooltip', config.tooltip);

            // Provide an accessible label for screen readers
            if (!el.getAttribute('aria-label')) {
                el.setAttribute('aria-label', config.tooltip);
            }

            // Create and configure the icon image element
            const iconImage = document.createElement('img');
            iconImage.src = config.iconPath;
            iconImage.alt = ''; // icon is decorative; aria-label on parent link
            iconImage.classList.add('icon-image');
            iconImage.setAttribute('aria-hidden', 'true');

            // Replace element contents with the icon
            el.replaceChildren(iconImage);
        });
    });
}



window.addEventListener('DOMContentLoaded', function() {
    applyPreferredThemeOnLoad();
    addTimestamp();
    openLinksInNewTabs();
    applyIconsAndTooltips();
})
