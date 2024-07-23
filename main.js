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

window.addEventListener('DOMContentLoaded', function() {
    applyPreferredColorTheme();
    addTimestamp();
    openLinksInNewTabs();
})
