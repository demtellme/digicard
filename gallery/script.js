const pseudobody = document.getElementById('pseudobody');
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
        // groups.forEach(group => group.style.animationSpeed = `${speed1/5}s`)
    }
    else if (event.target.id == 'imgsize'){
        imgsize = event.target.value * 2 ;
        if (imgsize == 0){
            imgsize = 2;
        }

        // console.log('possible groups: ', getpossiblerows(imgsize));
        // console.log('actual groups', groups.length);

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

function shuffleimages(){
    for (let i = images.length;  i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
    return images
}

// function creategroups(rows){
//     for (let i = 0; i < rows; i++){
//         const grouptomake = document.createElement('div');
//         grouptomake.classList.add('group');
//         pseudobody.appendChild(grouptomake);
//     }

// }

function cleargroups(){let groups = document.querySelectorAll('.group'); groups.forEach(group => group.remove());}

function getpossiblerows(imgsize){
    pseudoheight = pseudobody.offsetHeight;
    rows = Math.ceil(pseudoheight / imgsize);
    return rows;
}

function updategroups(imgsize){
    let currentgroups = document.querySelectorAll('.group').length;
    let rows = getpossiblerows(imgsize);
    console.log(currentgroups, rows);

    if (rows > currentgroups){
        while (rows != currentgroups){
            const grouptomake = document.createElement('div');
            grouptomake.classList.add('group');
            carousel.appendChild(grouptomake);
            console.log('group made');
            currentgroups ++;
        }
    }
    else if (rows < currentgroups){
        while (rows != currentgroups){
            const groups = document.querySelectorAll('.group');
            groups[groups.length - 1].remove();
            currentgroups --;
        }
    }

    console.log('groups updated');
}

function populategroups(images, imgsize){
    let groups = document.querySelectorAll('.group');

    groups.forEach(group => group.style.opacity = '0');
    
    let loadedCount = 0;
    let totalImages = groups.length * images.length;
    
    function checkAllLoaded() {
        loadedCount++;
        if (loadedCount === totalImages) {
            // All images loaded - show everything
            groups.forEach(group => group.style.opacity = '1');
        }
    }
    
    for (let group of groups){
        group.innerHTML = '';
        for (let i=0; i < images.length; i++){
            const img = document.createElement('img');
            img.src = images[i];

            img.style.height = `${imgsize}px`;
            img.style.width = `${imgsize}px`;

            img.onload = checkAllLoaded;
            group.appendChild(img);
        }
    }
}
// creategroups(imgsize);
updategroups(imgsize);