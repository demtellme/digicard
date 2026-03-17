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
