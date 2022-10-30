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

const songColRef = collection(db, 'AvailableSongs');

onSnapshot(songColRef, (snapshot) =>{
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
            createSongTab(change.doc.data());
        }else{
            removeTab(change.doc.data().name);
        }
    });
})

const createSongTab = (docData) =>{
    const songList = document.body;

    const songName = docData.name;
    const instrumentArray = docData.instruments;

    //checkSongExcist(songName);

    const container = document.createElement('div');
    container.id = songName;
    container.classList.add('song-container');

    const title = document.createElement('div');
    title.id = 'song-title';
    title.classList.add('song-title');
    title.dataset.id = songName;

    const titleImg = document.createElement('div');
    titleImg.id='title-image';
    titleImg.classList.add('title-image');

    const img = document.createElement('img');
    img.src ="../images/pictures/defaultPic.png";
    img.alt = "Picture not found";
    img.classList.add('img-fit');

    titleImg.appendChild(img);
    title.appendChild(titleImg);

    const titleName = document.createElement('div');
    titleName.id ='song-name';
    titleName.classList.add('song-name');
    titleName.innerHTML = songName;

    title.appendChild(titleName);
    title.onclick = function() {openTab(title)};
    
    container.appendChild(title);


    const songData = document.createElement('div');
    songData.id='song-data';
    songData.classList.add('song-data');
    songData.classList.add('hide-flex');

    const instrumentList = document.createElement('div');
    instrumentList.id = 'instrument-list';
    instrumentList.classList.add('instrument-list');
    instrumentArray.forEach(instrument =>{
        const inst = document.createElement('div');
        inst.id = instrument;
        inst.classList.add('instrument');
        inst.innerHTML= instrument;

        inst.onclick = function() {checkInstrument(inst.id)};

        instrumentList.appendChild(inst);
    });

    songData.appendChild(instrumentList);
    container.appendChild(songData);

    songList.appendChild(container);
}

const openTab = (titleElement) =>{
    //const tab = document.querySelector('[data-id="' + songName + '"]');
    const parentTab = titleElement.parentNode;
    const tabData = parentTab.querySelector('.song-data');
    
    if(tabData.classList.contains('hide-flex')){
        changeListApearance(parentTab.id);
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
    saveData('showInstrument', instrumentName);

    const newLocation = './Instruments.html';
    console.log(instrumentName);
    //location.href = newLocation;
}

const removeTab = (songName) =>{
    const elements = document.getElementById(songName);
    if(elements != null){
        elements.remove();
    }
}

const loadData = nameToSearch =>{
    return JSON.parse(localStorage.getItem(nameToSearch));
}
const saveData = (nameToSave, data) => {
    localStorage.setItem(nameToSave, JSON.stringify(data));
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