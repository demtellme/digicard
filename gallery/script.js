const pseudobody = document.getElementById('pseudobody');
const carousel = document.getElementById('carousel');
const group = document.getElementById('group');

let difspeeds = false;
let shuffleimgs = false;
let reverseallowed = false;

let minspeed = 0;
let maxspeed = 0;

let imgspeed = 10;
let imgsize = 100;

let images = [];
let imagesadded = [];

document.addEventListener('input', function(event){
    if (event.target.id == 'fileinput'){
        for (let file of event.target.files){
            const url = URL.createObjectURL(file);
            images.push(url);

            updategroup(imgsize);
            clonegroup(getpossiblerows(imgsize));

        }
    }

    else if (event.target.id == 'text'){
        const text = document.getElementById('textcontainer').querySelector('p')
        text.innerHTML = event.target.value;
    }
    else if (event.target.id == 'speed'){
        const displayspeed = document.getElementById('speedvalue');
        displayspeed.innerHTML = event.target.value;
        if (!difspeeds){
            groups.forEach(group => group.style.animationDuration = `${speed1/5}s`)
        }
    }
    else if (event.target.id == 'speed1'){
        const displayspeed = document.getElementById('speed1value');
        displayspeed.innerHTML = event.target.value;
        
    }
    else if (event.target.id == 'imgsize'){
        imgsize = event.target.value * 2 ;

        clonegroup(getpossiblerows(imgsize));

        for (let img of document.querySelectorAll('img')){
            img.style.height = `${imgsize}px`;
            img.style.width = `${imgsize}px`;
            }
    }

})

function hidewhendifspeeds(){
    if (difspeeds == false){
        difspeeds = true;
    }
    else{
        difspeeds = false;
    }
    let speedtext = document.getElementById('minspeed');

    if (speedtext.innerHTML == 'minimum speed'){
        speedtext.innerHTML = 'speed';
    }
    else{
        speedtext.innerHTML = 'minimum speed';
    }


   const elementsToToggle = document.querySelectorAll('.speed1');

    for (element of elementsToToggle) {
        element.classList.toggle('hidden');
    } 

}

function shuffle(array){
    for (let i = array.length;  i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function cleargroups(){let groups = document.querySelectorAll('.group'); groups.forEach(group => group.remove());}

function shufflepressed(){
    shuffleimgs = !shuffleimgs;

    let shufflebutton = document.getElementById('shuffle');
    if (shuffleimgs){
        shufflebutton.style.transform = 'translateY(5px)';
        shufflebutton.style.backgroundColor = '#00359e';
    }
    else{
        shufflebutton.style.backgroundColor = '#014add';
        shufflebutton.style.transform = 'translateY(-5px)';
    }
}
function reversepressed(){
    reverseallowed = !reverseallowed;
    var rows = document.querySelectorAll('.group');
    

    let reversebutton = document.getElementById('reverse');
    if (reverseallowed){
        reversebutton.style.transform = 'translateY(5px)';
        reversebutton.style.backgroundColor = '#00359e';
        for (let row of rows){
            if (Math.random() < 0.5) row.style.animationDirection = "reverse";
        }
    }
    else{
        reversebutton.style.backgroundColor = '#014add';
        reversebutton.style.transform = 'translateY(-5px)';
        rows.forEach(row => row.style.animationDirection = "normal");
    }
}


function getpossiblerows(imgsize){
    let pseudoheight = pseudobody.offsetHeight;
    return Number (rows = Math.ceil(pseudoheight / imgsize));
}
function getminimumcolums(imgsize){
    let pseudowidth = pseudobody.offsetWidth;
    return Number (columns = Math.ceil(pseudowidth/imgsize));
}


function updateimgspeed(){
    if (difspeeds){
        return Math.floor(Math.random(max - min + 1)) + minspeed;
    }
    else{
        return imgspeed;
    }
}

function updategroup(imgsize){
    let workingImages = images; 
    if (shuffleimgs){
        workingImages = shuffle([...images]);
    }
    let timestodupe = Math.floor(getminimumcolums(imgsize) / workingImages.length)+1;
    let imagestoadd = [];
    for (let i = 0; i < timestodupe; i++){
        imagestoadd = imagestoadd.concat(workingImages);
    }

    imagestoadd.forEach(src =>{
        const img = document.createElement('img');
        img.src = src;
        group.appendChild(img);
    });
}

function clonegroup(times){
    let clones = document.querySelectorAll('.clone');
    clones.forEach(clone => clone.remove());

    for (let i = 0; i < times; i++){
        const clone = group.cloneNode(true);
        clone.classList.add('clone');
        carousel.appendChild(clone);
        if (reverseallowed){
            if (Math.random() < 0.5) clone.style.animationDirection = "reverse";
        }
    }
}
function generatedigicard(vector){
    let newDoc = document.implementation.createHTMLDocument('DigiCard - gallery');


    const newbody = document.createElement('body');
    newbody.className = pseudobody.className;
    newbody.style.cssText = pseudobody.style.cssText;
    newbody.innerHTML = pseudobody.innerHTML;

    const style = newDoc.createElement('style');
    style.textContent = `
        html{
            color: white;
        }
        body {
            margin: 0;
            background-color: rgb(62, 62, 136);
            height: 100vh;
            border-radius: 15px;
            display: flex;
            justify-content: center; 
            align-items: center; 
            position: relative; 
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
        img{
            height: 100px;
            width: 100px;
            object-fit: cover;
        }
        .hidden{
            display: none;
        }
        #carousel {
            width: 100%; 
            height: 100%; 
            position: absolute; 
            top: 0;
            left: 0;
            z-index: 1;
            overflow: hidden;
        }
        .carousel::-webkit-scrollbar{
            display: none;
        }
        .pic{
            height: 2px;
            padding: 1em;
            background: blue;
        }
        .group{
            display: flex;
            align-items: center;
            justify-content: center;
            animation: spin 10s linear infinite;
        }
        @keyframes spin {
            from {translate: 0;}
            to {translate: -100%;}
        }

        #textcontainer {
            border-radius: 15px;
            text-align: center;
            backdrop-filter: blur(10px);
            background-color: transparent;
            outline: 1px solid rgba(255,255,255,0.2);
            height: auto;
            padding: 5%;
            width: min(90%, 600px);
            text-align: center;
            z-index: 2; 
            position: relative; 
        }


    `;

    newDoc.head.appendChild(style);
    newDoc.body.replaceWith(newbody);

    const weblink = newDoc.createElement('a');
    weblink.href = 'https://digicardmaker.netlify.app/';
    weblink.textContent = 'Made with Digicard, click here for more';

    weblink.style.color = 'white';
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
