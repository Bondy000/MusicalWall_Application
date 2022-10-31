const pages = [
    'Home', 'About', 'Instruments','Songs', 'Help', 'Settings','Credits' ,'divider', 'Contacts'
];
//['עמוד הבית', 'עלינו', 'רשימת כלים','רשימת שירים', 'עזרה', 'הגדרות' ,'divider', 'צרו קשר']

const changeSidenavAppearance = event =>{
    const sidenav = document.querySelector('.sidenav');
    const pressed = event.target;

    const contentElement = document.querySelector('.content');
    if(sidenav.classList.contains('sidenav-hide')){
        if(pressed.id === 'sidenav-icon'){
            sidenav.classList.remove('sidenav-hide');
            sidenav.classList.add('sidenav-show');

            contentElement.style.opacity = 0.5;
            contentElement.style.pointerEvents = 'none';
        }
    }
    else{
        sidenav.classList.remove('sidenav-show');
        sidenav.classList.add('sidenav-hide');

        contentElement.style.opacity = 1;
        contentElement.style.pointerEvents = 'visible';
    }   
}

document.getElementsByTagName('body')[0].onclick = changeSidenavAppearance;

//Adding the Header
const headerElement = document.createElement('div');
headerElement.classList.add('header');

const headerTitle = document.createElement('div');
headerTitle.classList.add('header-title');

const headerImage = document.createElement('img');
headerImage.classList.add('img-fit');
headerImage.alt = 'Picture not found';
headerImage.src = '../images/pictures/MusicalWall_Picture.png';
headerTitle.appendChild(headerImage);

headerElement.appendChild(headerTitle);

const headerSideIcon = document.createElement('div');
headerSideIcon.classList.add('header-icon');

const sidenavIcon = document.createElement('img');
sidenavIcon.id = 'sidenav-icon';
sidenavIcon.classList.add('sidenav-icon-image');
sidenavIcon.alt = 'Picture not found';
sidenavIcon.src = '../images/icons/sidenav-menu-icon.svg';
sidenavIcon.onclick = function() {changeSidenavAppearance};
headerSideIcon.appendChild(sidenavIcon);

headerElement.appendChild(headerSideIcon);

document.body.appendChild(headerElement);

//Adding the SideNav
const sidenavElement = document.createElement('div');
sidenavElement.classList.add('sidenav','sidenav-hide');

pages.forEach(page =>{
    const pageTab = document.createElement('div');
    if(page === 'divider'){
        pageTab.id = 'divider';
        pageTab.classList.add('divider');
    }else{
        pageTab.id = page;
        pageTab.innerHTML = page;
        pageTab.classList.add('sidenav-tab');
        pageTab.onclick = function() {openPage(page)};
    }
    
    sidenavElement.append(pageTab);
});

document.body.appendChild(sidenavElement);

const openPage = pageToOpen => {
    const newLocation = '../pages/' + pageToOpen + '.html';
    location.href = newLocation;
}

