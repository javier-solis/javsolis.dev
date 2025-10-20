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


// todo: remove redundant repetition of 'nf' within each config
const iconConfigs = {
    'header-linkedin': {
        cssClasses: ['nf-fa-linkedin'],
        tooltip: 'LinkedIn',
        size: 'icon-large',
    },
    'header-github': {
        cssClasses: ['nf-md-github'],
        tooltip: 'GitHub',
        size: 'icon-large',
    },
    'header-email': {
        cssClasses: ['nf-md-email'],
        tooltip: 'Email',
        size: 'icon-large',
    },

    'proj-repo': {
        cssClasses: ['nf-md-source_repository'],
        tooltip: 'Repository'
    },
    'proj-website': {
        cssClasses: ['nf-md-web_box'],
        tooltip: 'Website'
    },
    // todo: improve naming to better differentiate between 'location' icons and 'time' icons
    'proj-wip': {
        cssClasses: ['nf-md-timer_sand'],
        tooltip: 'Work In Progress'
    }
    // todo: add additional 'time' icons like 'paused' and 'finished'
};

function applyIconsAndTooltips() {
    Object.entries(iconConfigs).forEach(([selector, config]) => {
        document.querySelectorAll(`.${selector}`).forEach(el => {
            // todo: verify that each element contains all the required fields

            // Add the 'nf' base class
            el.classList.add('nf');

            // Apply size if provided
            if (config.size) {
                el.classList.add(config.size);
            }

            // Add icon css classes
            el.classList.add(...config.cssClasses);

            // Add tooltip functionality
            // todo: if tooltip tag empty, don't add this part (and thus no tooltip)
            el.classList.add('tooltip-trigger');
            el.setAttribute('data-tooltip', config.tooltip);
        });
    });
}



window.addEventListener('DOMContentLoaded', function() {
    applyPreferredThemeOnLoad();
    addTimestamp();
    openLinksInNewTabs();
    applyIconsAndTooltips();
})
