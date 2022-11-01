import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, getDocs
} from 'firebase/firestore'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwYaNzojFy9exNgW72q41RmG_zkCw4aNA",
    authDomain: "musical-wall.firebaseapp.com",
    projectId: "musical-wall",
    storageBucket: "musical-wall.appspot.com",
    messagingSenderId: "714528100210",
    appId: "1:714528100210:web:58502db71212beed68d7eb",
    measurementId: "G-C3DTPJ61CF"
  };

//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

const instrumentColRef = collection(db, 'AvailableInstruments');

onSnapshot(instrumentColRef, (snapshot) =>{
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
            createInstrumentTab(change.doc.data());
        }else{
            removeTab(change.doc.data().name);
        }
    });
})

const createInstrumentTab = (docData) =>{
    const instrumentList = document.querySelector('.content');

    const instrumentName = docData.name;
    //const instrumentArray = docData.instruments;
    const curMode = docData.mode;
    const curSong = docData.song;

    const container = document.createElement('div');
    container.id = instrumentName;
    container.classList.add('instrument-container');

    const title = document.createElement('div');
    title.id = 'instrument-title';
    title.classList.add('instrument-title');
    title.dataset.id = instrumentName;

    const titleImg = document.createElement('div');
    titleImg.id='title-image';
    titleImg.classList.add('title-image');

    const img = document.createElement('img');
    img.src ="../images/pictures/" + instrumentName + ".png";
    img.alt = "Picture not found";
    img.classList.add('img-fit');

    img.onerror = function() { defaultPicture(img) };

    titleImg.appendChild(img);
    title.appendChild(titleImg);

    const titleName = document.createElement('div');
    titleName.id ='instrument-name';
    titleName.classList.add('instrument-name');
    titleName.innerHTML = instrumentName;

    title.appendChild(titleName);
    title.onclick = function() {openTab(title)};
    
    container.appendChild(title);

    const instrumentData = document.createElement('div');
    instrumentData.id='instrument-data';
    instrumentData.classList.add('instrument-data');
    instrumentData.classList.add('hide-flex');

    const adminData = document.createElement('div');
    adminData.classList.add('admin-data');
    /********Admin Data****/ 
    instrumentData.appendChild(adminData);

    /* Create the Mode Line */
    const modeData = document.createElement('div');
    modeData.classList.add('mode-data');

    let emptyDiv = document.createElement('div');
    emptyDiv.classList.add('empty-div');
    modeData.appendChild(emptyDiv);

    const modeText = document.createElement('div');
    modeText.classList.add('mode-text');
    modeText.innerHTML = 'Mode:';
    modeData.appendChild(modeText);

    const curModeText = document.createElement('div');
    curModeText.classList.add('cur-mode-text');
    curModeText.innerHTML = curMode;
    modeData.appendChild(curModeText);

    const updateModeButton = document.createElement('div');
    updateModeButton.classList.add('update-button');
    updateModeButton.innerHTML = 'Update';
    updateModeButton.onclick = function() { updateMode(instrumentName, curMode) };
    modeData.appendChild(updateModeButton);

    emptyDiv = document.createElement('div');
    emptyDiv.classList.add('empty-div');
    modeData.appendChild(emptyDiv);

    instrumentData.appendChild(modeData);
    
    /* Create the Song Line */
    const songData = document.createElement('div');
    songData.classList.add('song-data');
    
    emptyDiv = document.createElement('div');
    emptyDiv.classList.add('empty-div');
    songData.appendChild(emptyDiv);

    const songText = document.createElement('div');
    songText.classList.add('song-text');
    songText.innerHTML = 'Song:';
    songData.appendChild(songText);

    const curSongText = document.createElement('div');
    curSongText.classList.add('cur-song-text');
    curSongText.innerHTML = curSong;
    songData.appendChild(curSongText);

    const updateSongButton = document.createElement('div');
    updateSongButton.classList.add('update-button');
    updateSongButton.innerHTML = 'Update';
    updateSongButton.onclick = function() { updateSong(instrumentName, curSong) };
    songData.appendChild(updateSongButton);

    emptyDiv = document.createElement('div');
    emptyDiv.classList.add('empty-div');
    songData.appendChild(emptyDiv);

    instrumentData.appendChild(songData);


    container.appendChild(instrumentData);
    instrumentList.insertBefore(container, instrumentList.firstChild);
}

const openTab = (titleElement) =>{
    //const tab = document.querySelector('[data-id="' + songName + '"]');
    const parentTab = titleElement.parentNode;
    const tabData = parentTab.querySelector('.instrument-data');
    if(tabData.classList.contains('hide-flex')){
        changeListApearance(parentTab.id);
    }
    else if(tabData.classList.contains('show-flex')){
        tabData.classList.remove('show-flex');
        tabData.classList.add('hide-flex');
    }
}

const changeListApearance = (onlyShow) =>{
    const containerList = document.querySelectorAll('.instrument-container');

    containerList.forEach( container =>{
        const data = container.querySelector('.instrument-data');
        if(container.id === onlyShow){
            data.classList.remove('hide-flex');
            data.classList.add('show-flex');
        }else{
            data.classList.remove('show-flex');
            data.classList.add('hide-flex');
        }
    });
}

const removeTab = (instrumentName) =>{
    const elements = document.getElementById(instrumentName);
    if(elements != null){
        elements.remove();
    }
}

const saveData = (nameToSave, data) => {
    localStorage.setItem(nameToSave, JSON.stringify(data));
}

const defaultPicture = imageElement =>{
    imageElement.src ="../images/pictures/defaultPic.png";
    imageElement.onerror = null;
}


const updateMode = (name, curMode) =>{
    let modeList = '';
    
    getDocs(instrumentColRef)
    .then( (snapshot) => {
        snapshot.docs.forEach(doc => {
            if(doc.data().name === name){
                modeList = doc.data().ModeList;
            }
        });
        
        createUpdateForm(modeList, curMode, 'M');
    })
    .catch(err => {
        console.log(err);
    })
}
const updateSong = (name, curSong) =>{
    let songList = '';
    
    getDocs(instrumentColRef)
    .then( (snapshot) => {
        snapshot.docs.forEach(doc => {
            if(doc.data().name === name){
                songList = doc.data().SongList;
            }
        });
        
        createUpdateForm(songList, curSong, 'S');
    })
    .catch(err => {
        console.log(err);
    })
}

const createUpdateForm = (itemlist, current, updatemode) =>{
    console.log(itemlist,current,updatemode);

    /*Create a radio button to choose */
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