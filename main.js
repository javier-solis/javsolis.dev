function addTimestamp(){
    if (Date.parse(document.lastModified) != 0){                        
        const div = document.getElementById('lastModified');
        div.insertAdjacentHTML('afterbegin', "<p>last modified " + document.lastModified + " est</p>");
    }
}

function modeToggle() {
    document.body.classList.toggle("dark-mode");
}
  
function applyPreferredColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        modeToggle();
    }
}
    
window.addEventListener('DOMContentLoaded', function() {
    applyPreferredColorScheme();
    addTimestamp();
})