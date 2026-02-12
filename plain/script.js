const pseudobody = document.getElementById('pseudobody');
const textcontainer = document.getElementById('textcontainer');
const form = document.getElementById('form');
let colour1 = document.getElementById('bgprimary').value; 
let colour2 = document.getElementById('bgsecondary').value;
let containercolour = document.getElementById('textcontainercolour').value || 'white';

let currentBgType = 'colour';

form.addEventListener('change', function(event){
    if (event.target.id == 'bgprimary'){
        colour1 = event.target.value;
        updateBackground();
        if (textcontainer.classList.contains('glass')){
            textcontainer.style.color = checkdarkness(colour1)
        }
    }
    if (event.target.id == 'bgsecondary'){
        colour2 = event.target.value;
        updateBackground();
    }
    if (event.target.id == 'textcontainercolour'){
        textcontainer.style.background = event.target.value;
        textcontainer.style.color = checkdarkness(event.target.value);
    }
   if (event.target.id == 'photo'){
    photo = true;
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('selectedphoto').style.backgroundImage = `url(${e.target.result})`;
            document.getElementById('selectedphoto').style.backgroundSize = 'auto 80%';
            document.getElementById('selectedphoto').style.backgroundRepeat = 'no-repeat';
            document.getElementById('selectedphoto').style.backgroundPosition = 'center';
            document.getElementById('selectedphoto').classList.remove('invisible');
        }
        reader.readAsDataURL(file);
    }
}
})

form.addEventListener('input', function(event){
    if (event.target.id == 'text'){
        let text = event.target.value;
        textcontainer.querySelector('p').textContent = text;
    }
})
function updateBackground() {
    pseudobody.className = '';
    pseudobody.style.animation = '';
    
    if (currentBgType === 'grid') {
        pseudobody.classList.add('grid');
        pseudobody.style.backgroundColor = colour1;
        pseudobody.style.setProperty('--grid-color', colour2); 
        pseudobody.style.backgroundImage = `
            linear-gradient(var(--grid-color, ${colour2}) .1em, transparent .1em),
            linear-gradient(90deg, var(--grid-color, ${colour2}) .1em, transparent .1em)
        `;
        pseudobody.style.backgroundSize = '10vh 10vh';
        pseudobody.style.animation = 'bganim 10s linear infinite';
        document.querySelectorAll('.bgsecondary').forEach(el => el.classList.remove('invisible'));
    }
    else if (currentBgType === 'gradient') {
        pseudobody.style.background = '';
        pseudobody.style.backgroundImage = `linear-gradient(${colour1}, ${colour2})`;
        document.querySelectorAll('.bgsecondary').forEach(el => el.classList.remove('invisible'));
    }
    else if (currentBgType === 'colour') {
        pseudobody.style.background = colour1;
        pseudobody.style.backgroundImage = '';
        document.querySelectorAll('.bgsecondary').forEach(el => el.classList.add('invisible'));

    }
}

function checkdarkness(colour){
    let hex = colour.replace('#', '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    
    let brightness = (r * 0.299) + (g * 0.587) + (b * 0.114); 

    return brightness < 128 ? 'white' : 'black';
}

function bgGrid(){
    currentBgType = 'grid';
    updateBackground();
}

function bgColour(){
    currentBgType = 'colour';
    updateBackground();
}

function bgGradient(){
    currentBgType = 'gradient';
    updateBackground();
}

function toggleglass(){
    const container = document.getElementById('textcontainer');
    const originalColor = container.getAttribute('data-original-color');
    
    if (container.classList.contains('glass')){
        container.classList.remove('glass');
        if (originalColor) {
            container.style.background = originalColor;
        } else {
            container.style.background = 'blue';
        }
        container.style.color = checkdarkness(container.style.backgroundColor || container.style.background || 'blue');
    } else {
        container.setAttribute('data-original-color', container.style.background || container.style.backgroundColor || 'blue');
        container.classList.add('glass');
        container.style.background = 'transparent';
        container.style.color = checkdarkness(colour1);
    }
}

function generatedigicard(vector){
    let newDoc = document.implementation.createHTMLDocument('DigiCard - plain');


    const newbody = document.createElement('body');
    newbody.className = pseudobody.className;
    newbody.style.cssText = pseudobody.style.cssText;
    newbody.innerHTML = pseudobody.innerHTML;

    const newPhoto = newbody.querySelector('#selectedphoto');
    
    const originalPhoto = document.getElementById('selectedphoto');
    if (originalPhoto.classList.contains('invisible') && newPhoto) {
        newPhoto.remove();  
    }
    

    const style = newDoc.createElement('style');
    style.textContent = `
        body {
            ${pseudobody.style.cssText}
            margin: 0;
        }

        #selectedphoto {
            height: 200px;
            width: 200px;
            margin: 2rem auto;
            background-size: auto 80%;
            background-repeat: no-repeat;
            background-position: center;
        }

        #textcontainer {
            border-radius: 15px;
            padding: 5%;
            width: min(90%, 600px);
            margin: 2rem auto;
            text-align: center;
        }

        .glass {
            backdrop-filter: blur(10px);
            background-color: transparent;
            outline: 1px solid rgba(255,255,255,0.2);
        }

        @keyframes bganim {
            0% { background-position: 0 0; }
            100% { background-position: 7em 7em; }
        }
        .grid{
            background-color: ${colour1};
            background-image:
                linear-gradient(${colour2} .1em, transparent .1em),
                linear-gradient(90deg, ${colour2} .1em, transparent .1em);
            background-size: 10vh 10vh;
            animation: bganim 10s linear infinite;
        }
            .colour{
            background-color: #${colour1};
        }

        .gradient{
            background-image: linear-gradient(${colour1},${colour2});
        }
    `;

    newDoc.head.appendChild(style);
    newDoc.body.replaceWith(newbody);

    const weblink = newDoc.createElement('a');
    weblink.href = 'https://digicardmaker.netlify.app/';
    weblink.textContent = 'Made with Digicard, click here for more';

    weblink.style.color = 'black';
    weblink.style.fontSize = '10px';
    weblink.style.textDecoration = 'none';
    weblink.style.position = 'absolute';
    weblink.style.bottom = '20px';
    weblink.style.left = '50%';
    weblink.style.transform = 'translateX(-50%)';


    newDoc.body.appendChild(weblink)


    if (vector == 'preview'){
        const newWindow = window.open();
        newWindow.document.write(newDoc.documentElement.outerHTML);
        newWindow.document.close();
    }
   if (vector == 'download'){
        const serialiser = new XMLSerializer();
        const content = serialiser.serializeToString(newDoc)
        const blob = new Blob([content], {type : 'text/html'});
        const url = URL.createObjectURL(blob); 
        const a = document.createElement('a');

        a.href = url;
        a.download = 'digiCard.html';
        a.click();

        setTimeout(() => URL.revokeObjectURL(url), 1000);
   }

    
}