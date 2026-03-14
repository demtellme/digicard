const pseudobody = document.getElementById('pseudobody');
const carousel = document.getElementById('carousel');
const group = document.getElementById('group');

let difspeeds = false;
let shuffleimgs = false;
let reverseallowed = false;

let minspeed = 5;
let maxspeed = 5;

let imgsize = 100;

let images = [];

document.addEventListener('input', function(event){
    if (event.target.id == 'fileinput'){
      for (let file of event.target.files) {
        const reader = new FileReader();
        reader.onload = function () {
          images.push(reader.result);
          updateimages(imgsize);
          clonegroup(getpossiblerows(imgsize));
        }
        reader.readAsDataURL(file)
      }
    }
    else if (event.target.id == 'text'){
        const text = document.getElementById('textcontainer').querySelector('p');
        text.innerHTML = event.target.value;
    }
    else if (event.target.id == 'speed'){
        minspeed = event.target.value / 10;
        updatespeed(minspeed, maxspeed);
    }
    else if (event.target.id == 'speed1'){
        maxspeed = event.target.value / 10;
        updatespeed(minspeed, maxspeed);
    }
    else if (event.target.id == 'imgsize'){
        imgsize = event.target.value * 2;
        clonegroup(getpossiblerows(imgsize));
        for (let img of document.querySelectorAll('img')){
            img.style.height = `${imgsize}px`;
            img.style.width = `${imgsize}px`;
        }
    }
})

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function randomspeedspressed(){
    difspeeds = !difspeeds;

    let difspeedsbutton = document.getElementById('differentspeeds');
    let rows = document.querySelectorAll('.group');

    if (difspeeds){
        difspeedsbutton.style.transform = 'translateY(5px)';
        difspeedsbutton.style.backgroundColor = '#00359e';
        updatespeed(minspeed, maxspeed);
    }
    else{
        difspeedsbutton.style.backgroundColor = '#014add';
        difspeedsbutton.style.transform = 'translateY(-5px)';
        rows.forEach(row => row.style.animationDuration = `${300/minspeed}s`);
    }

    let speedtext = document.getElementById('minspeed');
    if (speedtext.innerHTML == 'minimum speed'){
        speedtext.innerHTML = 'speed';
    }
    else{
        speedtext.innerHTML = 'minimum speed';
    }

    const elementsToToggle = document.querySelectorAll('.speed1');
    for (let element of elementsToToggle){
        element.classList.toggle('hidden');
    }
}

function shufflepressed(){
    shuffleimgs = !shuffleimgs;

    let shufflebutton = document.getElementById('shuffle');
    let rows = document.querySelectorAll('.group');

    if (shuffleimgs){
        shufflebutton.style.transform = 'translateY(5px)';
        shufflebutton.style.backgroundColor = '#00359e';
        rows.forEach(row => {
            let rowimgs = Array.from(row.children);
            for (let i = rowimgs.length - 1; i > 0; i--){
                const j = Math.floor(Math.random() * (i + 1));
                [rowimgs[i], rowimgs[j]] = [rowimgs[j], rowimgs[i]];
            }
            rowimgs.forEach(img => row.appendChild(img));
        });
    }
    else{
        shufflebutton.style.backgroundColor = '#014add';
        shufflebutton.style.transform = 'translateY(-5px)';
        updateimages(imgsize);
        clonegroup(getpossiblerows(imgsize));
    }
}

function reversepressed(){
    reverseallowed = !reverseallowed;
    let rows = document.querySelectorAll('.group');

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
    return Math.ceil(pseudoheight / imgsize);
}

function getminimumcolums(imgsize){
    let pseudowidth = pseudobody.offsetWidth;
    return Math.ceil(pseudowidth / imgsize);
}

function updateimages(imgsize){
    group.innerHTML = '';
    let workingImages = images;
    if (shuffleimgs){
        workingImages = shuffle([...images]);
    }
    let timestodupe = Math.floor((getminimumcolums(imgsize) / workingImages.length) + 1)*2.5;
    let imagestoadd = [];
    for (let i = 0; i < timestodupe; i++){
        imagestoadd = imagestoadd.concat(workingImages);
    }
    imagestoadd.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        group.appendChild(img);
    });
}

function updatespeed(speed, speed1){
    let rows = document.querySelectorAll('.group');
    if (difspeeds){
        rows.forEach(row => {
            let randNum = speed + Math.random() * (speed1 - speed);
            row.style.animationDuration = `${300/randNum}s`;
        });
    }
    else{
        rows.forEach(row => row.style.animationDuration = `${300/speed}s`);
    }
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
  const style = `
        html, body {
            height: 100%;
            min-height: 100vh;
            min-height: -webkit-fill-available;
        }
        html{ color: white; }
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
            text-align: center;
            backdrop-filter: blur(10px);
            background-color: transparent;
            outline: 1px solid rgba(255,255,255,0.2);
            height: auto;
            padding: 5%;
            width: min(90%, 600px);
            z-index: 2;
            position: relative;
        }
        .glass {
            backdrop-filter: blur(10px);
            background-color: transparent;
            outline: 1px solid rgba(255,255,255,0.2);
        }
        .imgcell {
            background-size: cover;
            background-position: center;
        }
        .hidden { display: none; }
        #carousel {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            overflow: hidden;
        }
        .group {
            display: flex;
            align-items: center;
            justify-content: center;
            animation: spin 10s linear infinite;
        }
        @keyframes spin {
            from { translate: 0; }
            to { translate: -100%; }
        }
        @media (max-width: 768px) {
            #textcontainer {
                width: min(95%, 500px);
                padding: 6%;
                border-radius: 12px;
            }
        }
        @media (max-width: 480px) {
            #textcontainer {
                margin-top: 10vh;
                font-size: 20px;
                width: 92%;
                border-radius: 10px;
                backdrop-filter: blur(6px);
            }
        }
    `;

    const rows = document.querySelectorAll('.group');
    const speeds = Array.from(rows).map(row => row.style.animationDuration);
    const directions = Array.from(rows).map(row => row.style.animationDirection || 'normal');

    const imgVars = images.map((src, i) => `--img${i}: url("${src}");`).join('\n');
    const numCols = Math.ceil((pseudobody.offsetWidth / imgsize) + 1) * 3;
    const numRows = Math.ceil(pseudobody.offsetHeight / imgsize) + 1;

    let rowsHTML = '';
    for (let r = 0; r < numRows; r++){
        let cellsHTML = '';
        for (let c = 0; c < numCols; c++){
            const imgIndex = c % images.length;
            cellsHTML += `<div class="imgcell" style="height:${imgsize}px;width:${imgsize}px;min-width:${imgsize}px;background-image:var(--img${imgIndex})"></div>`;
        }
        const dur = speeds[r] || speeds[0];
        const dir = directions[r] || 'normal';
        rowsHTML += `<div class="group" style="animation-duration:${dur};animation-direction:${dir}">${cellsHTML}</div>`;
    }

    const content = `<!DOCTYPE html>
      <html>
      <head>
        <style>
            :root { ${imgVars} }
            ${style}
        </style>
        <script>
            window.addEventListener('load', function(){
                const imgsize = ${imgsize};
                const carousel = document.getElementById('carousel');
                const existingRows = carousel.querySelectorAll('.group').length;
                const neededRows = Math.ceil(window.innerHeight / imgsize) + 1;
                if (neededRows > existingRows){
                    const template = carousel.querySelector('.group');
                    for (let i = existingRows; i < neededRows; i++){
                        const clone = template.cloneNode(true);
                        carousel.appendChild(clone);
                    }
                }
            });
        </script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body class="${pseudobody.className}" style="${pseudobody.style.cssText}">
        <div id="textcontainer">${document.getElementById('textcontainer').innerHTML}</div>
        <div id="carousel">${rowsHTML}</div>
        <a href="https://digicardmaker.netlify.app/" style="color:white;font-size:10px;text-decoration:none;position:absolute;bottom:20px;left:50%;transform:translateX(-50%);z-index:1;">Made with Digicard, click here for more</a>
      </body>
      </html>`;
    if (vector == 'preview'){
        const newWindow = window.open();
        newWindow.document.write(content);
        newWindow.document.close();
    }
    if (vector == 'download'){
        const blob = new Blob([content], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'digiCard.html';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
}
