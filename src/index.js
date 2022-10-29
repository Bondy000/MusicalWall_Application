import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, getDocs,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc,
    updateDoc
} from 'firebase/firestore'
import {
    getAuth
} from 'firebase/auth'


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
const auth = getAuth();

//collection ref
const colRef = collection(db, 'instruments');
//queries
//const q = query(colRef, where("name", "==", "Guitar") , orderBy('createdAt'));
const q = query(colRef, orderBy('createdAt'));

//get collection data  --Check For Query
/*getDocs(q)
    .then( (snapshot) => {
        let instruments = [];
        snapshot.docs.forEach(doc => {
            instruments.push({ ...doc.data(), id: doc.id});
        });
        console.log(instruments);
    })
    .catch(err => {
        console.log(err);
    })*/

//Real Time collection Data
onSnapshot(colRef, (snapshot) =>{
    let instruments = [];
    snapshot.docs.forEach(doc => {
        instruments.push({ ...doc.data(), id: doc.id});
    });
    console.log(instruments);
})

//Adding documents
const addInstrumentForm = document.querySelector('.add');
addInstrumentForm.addEventListener('submit', (e) =>{//Form: onsubmit
    e.preventDefault();

    addDoc(colRef, {
        name: addInstrumentForm.name.value,
        mode: addInstrumentForm.mode.value,
        song: addInstrumentForm.song.value,
        createdAt: serverTimestamp()
    })
    .then( () => {
        addInstrumentForm.reset();
    })

});

//Deleting documents
const deleteInstrumentForm = document.querySelector('.delete');
deleteInstrumentForm.addEventListener('submit', (e) =>{//Form: onsubmit
    e.preventDefault();

    const docRef = doc(db, 'instruments', deleteInstrumentForm.id.value);
    deleteDoc(docRef)
    .then(()=>{
        deleteInstrumentForm.reset();
    })
});

//get a single document
const docRef = doc(db, 'instruments','puMLxoQM2p1095mSvaGk');

/*getDoc(docRef)
.then((doc) =>{
    console.log(doc.data(), doc.id);
})*/

onSnapshot(docRef, (snapshot) =>{
    console.log(snapshot.data(), snapshot.id);
})

//Updating a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const docRef = doc(db, 'instruments', updateForm.id.value);

    updateDoc(docRef, {
        name: 'new instrument'
    })
    .then(() =>{
        updateForm.reset();
    })
})