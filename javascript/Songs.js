const openTab = (songName) =>{
    const tab = document.querySelector('[data-id="' + songName + '"]');
    const parentTab = tab.parentNode;
    const tabData = parentTab.querySelector('.song-data');
    
    if(tabData.classList.contains('hide-flex')){
        changeListApearance(songName);
    }
    else if(tabData.classList.contains('show-flex')){
        tabData.classList.remove('show-flex');
        tabData.classList.add('hide-flex');
    }
}

const changeListApearance = (onlyShow) =>{
    const containerList = document.querySelectorAll('.song-container');

    containerList.forEach( container =>{
        const data = container.querySelector('.song-data');
        if(container.id === onlyShow){
            data.classList.remove('hide-flex');
            data.classList.add('show-flex');
        }else{
            data.classList.remove('show-flex');
            data.classList.add('hide-flex');
        }
    });
}

const checkInstrument = (instrumentName) =>{
    createSongContainer('Little Spider');
    saveData('showInstrument', instrumentName);

    const newLocation = './Instruments.html';
    //location.href = newLocation;
}

const loadData = nameToSearch =>{
    return JSON.parse(localStorage.getItem(nameToSearch));
}
const saveData = (nameToSave, data) => {
    localStorage.setItem(nameToSave, JSON.stringify(data));
}

const createInstrumentElement = (instrument) =>{
    let instrumentElement = `<div id="${instrument}" onclick="checkInstrument('${instrument}')" class="instrument">${instrument}</div>`;
    console.log(instrumentElement);
    return instrumentElement;
}

const createSongContainer = (songName) =>{
    const songList = document.body;

    let containerHTML = `
    <div id="${songName}" class="song-container">
        <div id="song-title" class="song-title" data-id="${songName}" onclick="openTab('${songName}')">
            <div id="title-image" class="title-image">
                <img src="../images/pictures/defaultPic.png" alt="Picture not found" class="img-fit">
            </div>
            <div id="song-name" class="song-name">${songName}</div>
        </div>
        <div id="song-data" class="song-data hide-flex">
            <div id="instrument-list" class="instrument-list">`;

    //containerHTML += createInstrumentElement('Guitar');
    //containerHTML += createInstrumentElement('Piano');
                
            
    containerHTML += `</div>
        </div>
    </div>
    `;

    songList.innerHTML += containerHTML;
}

/*const checkLanguage = () =>{
    let langSetting = loadData('Language');
    if(langSetting === 'undefind' || langSetting === null || langSetting === 'null'){
        langSetting = 'English';//Default Value    
        saveData('Language', langSetting);
    }
    
    langList.forEach(lang =>{
        const element = document.getElementById(lang);
        if(!(element === 'undefind' || element === null || element === 'null')){
            if(langSetting === element.id){
                element.classList.add('show-div-flex');
            }
            else{
                element.classList.add('hide-div');
            }
        }   
    });
}*/

