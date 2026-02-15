const pseudobody = document.getElementById('pseudobody');
const carousel = document.getElementById('carousel');
// const animation = document.getElementsByClassName('group').getAnimations()[0];

let difspeeds = false;
let shuffleimgs = false;

let minspeed = 0;
let maxspeed = 0;
let imgsize = 100;

let images = [];

document.addEventListener('input', function(event){
    if (event.target.id == 'fileinput'){
        for (let file of event.target.files){
            const url = URL.createObjectURL(file);
            images.push(url);
            for (let group of document.querySelectorAll('.group')){
                let img = document.createElement('img');
                img.src = url
                group.append(img)

                populategroups(images, imgsize)
            
            }
        }
    }
    else if (event.target.id == 'text'){
        const text = document.getElementById('textcontainer').querySelector('p')
        text.innerHTML = event.target.value;
    }
    else if (event.target.id == 'speed'){
        const displayspeed = document.getElementById('speedvalue');
        displayspeed.innerHTML = event.target.value;
    }
    else if (event.target.id == 'speed1'){
        const displayspeed = document.getElementById('speed1value');
        displayspeed.innerHTML = event.target.value;
        groups.forEach(group => group.style.animationDuration = `${speed1/5}s`)
    }
    else if (event.target.id == 'imgsize'){
        imgsize = event.target.value * 2 ;

        updategroups(imgsize);
        populategroups(images, imgsize);


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

function shufflepressed(){shuffleimgs = !shuffleimgs;}

function getpossiblerows(imgsize){
    let pseudoheight = pseudobody.offsetHeight;
    return Number (rows = Math.ceil(pseudoheight / imgsize));
}
function getminimumcolums(imgsize){
    let pseudowidth = pseudobody.offsetWidth;
    return Number (columns = Math.ceil(pseudowidth/imgsize));
}

function updategroups(imgsize){
    let currentgroups = document.querySelectorAll('.group').length;
    let rows = getpossiblerows(imgsize);

    while (rows != currentgroups){
        if (rows > currentgroups){
                const grouptomake = document.createElement('div');
                grouptomake.classList.add('group');
                carousel.appendChild(grouptomake);
                currentgroups ++;
        }
        else if (rows < currentgroups){
                const groups = document.querySelectorAll('.group');
                groups[groups.length - 1].remove();
                currentgroups --;
        }
    }
    if (shufflepressed){
        const rowimgs = shuffle(images.slice());
    }
    else{
        const rowimgs = images;
    }
    let rowImgs = images;

    if (getminimumcolums(imgsize) > images.length){
        let timestodupeimages = getminimumcolums(imgsize) / images.length;
        for (let i = 0;i < timestodupeimages; i++){
            let fullList = rowImgs.concat(rowImgs);
        }
        console.log(fullList);
    }

    console.log('groups updated');
}

function populategroups(images, imgsize){
    let groups = document.querySelectorAll('.group');

    for (let group of groups){
        group.innerHTML = '';
        for (let i=0; i < images.length; i++){
            const img = document.createElement('img');
            img.src = images[i];

            img.style.height = `${imgsize}px`;
            img.style.width = `${imgsize}px`;

            group.appendChild(img);
        }
    }
}

function updateimgspeed(){
    return 
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
            ${pseudobody.style.cssText}
            margin: 0;
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


updategroups(imgsize);