function addTimestamp(){
    if (Date.parse(document.lastModified) != 0){                        
        const div = document.getElementById('lastModified');
        div.insertAdjacentHTML('afterbegin', "<p>Last Modified " + document.lastModified + " EST</p>");
    }
}
        
window.addEventListener('load', function() {
    addTimestamp();
})

function modeToggle() {
    document.body.classList.toggle("dark-mode");
 }