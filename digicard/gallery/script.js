document.addEventListener('input', function(event){
    if (event.target.id == 'fileinput'){
        document.getElementById('amountofpics').innerText = `${event.target.files.length}`;
        for (file in event.target.files){
            let img = document.createElement('img');
            img.src = file;
        }
    }
})