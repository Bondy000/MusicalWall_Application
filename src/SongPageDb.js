import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, getDocs,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc,
    updateDoc
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
    snapshot.docs.forEach(doc => {
        createSongTab(doc.data());
    });
})

const createSongTab = (docData) =>{
    const songList = document.body;
    const songName = docData.name;
    const instrumentArray = docData.instruments;

    checkSongExcist(songName);

    let containerHTML = `
    <div id="${songName}" class="song-container">
        <div id="song-title" class="song-title" data-id="${songName}">
            <div id="title-image" class="title-image">
                <img src="../images/pictures/defaultPic.png" alt="Picture not found" class="img-fit">
            </div>
            <div id="song-name" class="song-name">${songName}</div>
        </div>
        <div id="song-data" class="song-data hide-flex">
            <div id="instrument-list" class="instrument-list">`;

    instrumentArray.forEach(instrument => {
        let instrumentElement = `<div id="${instrument}" class="instrument">${instrument}</div>`;
        containerHTML += instrumentElement;
    });    
    containerHTML += `</div>
        </div>
    </div>
    `;

    songList.innerHTML += containerHTML;

    const title = document.querySelector("[data-id='" + songName + "']");
    title.addEventListener('click', function() { 
        openTab(title);
    });

    const parentContainer = title.parentNode;
    const allInstruments = parentContainer.querySelectorAll('.instrument');
    allInstruments.forEach(inst => {
        inst.addEventListener('click', function() {
            checkInstrument(inst.id);
        });
    });
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
    console.log('bye');
    //location.href = newLocation;
}

const checkSongExcist = (songName) =>{
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