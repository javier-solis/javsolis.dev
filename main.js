function addTimestamp(){
    if (Date.parse(document.lastModified) != 0){                        
        const div = document.getElementById('lastModified');
        div.insertAdjacentHTML('afterbegin', "<p>last modified " + document.lastModified + " est</p>");
    }
}

function toggleColorTheme() {
    document.body.classList.toggle("dark-mode");
}
  
function applyPreferredColorTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleColorTheme();
    }
}

function openLinksInNewTabs() {
    document.querySelectorAll('a').forEach(link => {
        link.setAttribute('target', '_blank');
    });
}


const iconConfigs = {
    'proj-repo': {
        cssClasses: ['nf', 'nf-md-source_repository'],
        tooltip: 'Repository'
    },
    'proj-website': {
        cssClasses: ['nf', 'nf-md-web_box'],
        tooltip: 'Website'
    }
};

function applyIconsAndTooltips() {
    Object.entries(iconConfigs).forEach(([selector, config]) => {
        document.querySelectorAll(`.${selector}`).forEach(el => {
            // Add icon css classes
            el.classList.add(...config.cssClasses);

            // Add tooltip functionality
            el.classList.add('tooltip-trigger');
            el.setAttribute('data-tooltip', config.tooltip);
        });
    });
}



window.addEventListener('DOMContentLoaded', function() {
    applyPreferredColorTheme();
    addTimestamp();
    openLinksInNewTabs();
    applyIconsAndTooltips();
})
