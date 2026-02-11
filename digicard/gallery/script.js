const pseudobdy = document.getElementById('pseudobody');
const carousel = document.getElementById('carousel');

let difspeeds = false;

let minspeed = 0;
let maxspeed = 0;
let imgsize = 100;

let images = [];

document.addEventListener('input', function(event){
    if (event.target.id == 'fileinput'){
        for (let file of event.target.files){
            const url = URL.createObjectURL(file);
            images.push(url);

            let groups = document.getElementsByClassName('group');
            for (let group of groups){
                let img = document.createElement('img');
                img.src = url
                group.append(img)

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
    }
    else if (event.target.id == 'imgsize'){
        imgsize = event.target.value * 2 ;
        if (imgsize == 0){
            imgsize = 2;
        }
        creategroups(imgsize);
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

function shuffleimages(){
    for (let i = images.length;  i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        images[i], images[j] = images[j], images[i];
    }
}

function creategroups(imgsize){
    pseudoheight = pseudobdy.offsetHeight;
    possiblerows = Math.ceil(pseudoheight / imgsize);

    let amntofgroups = Number(document.querySelectorAll('.group').length);
    groupstoadd = possiblerows - amntofgroups;

    for (let i = 0; i < groupstoadd; i++){
        newgroup = document.createElement('div');
        newgroup.classList.add('group');
        carousel.appendChild(newgroup);
    }
    console.log(groupstoadd);
}

creategroups(imgsize)