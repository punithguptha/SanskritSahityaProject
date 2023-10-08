console.log(author_data);

//Load Author Chips:
loadAuthors(author_data);
function loadAuthors(author_data){
    var authorButtonContainer=document.querySelector('#authors #buttons-container');
    for(author in author_data){
        var authorName=author;
        var buttonElement= `<button class="button-entity" onclick="showAuthorDetails('${authorName}')">${authorName}</button>`;
        authorButtonContainer.insertAdjacentHTML('beforeend',buttonElement);
    }
}

//Load Works Chips:
extractWorksDataFromAuthorsData(author_data);
console.log(works_data);
loadWorks(works_data);
function loadWorks(works_data){
    var worksButtonContainer=document.querySelector("#works #buttons-container");
    for(work in works_data){
        var workName=work;
        var buttonElement= `<button class="button-entity" onclick="showWorkDetails('${workName}')">${workName}</button>`;
        worksButtonContainer.insertAdjacentHTML('beforeend',buttonElement);
    }
}

function extractWorksDataFromAuthorsData(author_data){
    works_data={};
    for(var author in author_data){
        var authorObj=author_data[author];
        var mainWorks=authorObj["Main Works"]
        for(var i=0;i<mainWorks.length;i++){
            var workName=mainWorks[i]["Work Name"];
            var workDescription=mainWorks[i]["Work Description"];
            if(!works_data[workName]){
                works_data[workName]={
                    "Work Description": workDescription,
                    "Authors":[author]
                }
            }else{
                works_data[workName].push(author);
            }
        }
    }
}

// Function to display the Home section
function showHome(e) {
    hideAllSections();
    disableActiveButtons();
    document.getElementById('HomeButton').classList.toggle('active');
    document.getElementById('home').style.display = 'block';
}

// Function to display the About Sahitya section
function showAbout(e) {
    hideAllSections();
    disableActiveButtons();
    document.getElementById('AboutButton').classList.toggle('active');
    document.getElementById('about').style.display = 'block';
}

// Function to display the Authors section
function showAuthors(e) {
    hideAllSections();
    disableActiveButtons();
    document.getElementById('AuthorsButton').classList.toggle('active');
    document.getElementById('authors').style.display = 'block';
}

function showWorks(e){
    hideAllSections();
    disableActiveButtons();
    document.getElementById('WorksButton').classList.toggle('active');
    document.getElementById('works').style.display='block';
}

// Function to display Student Details
function showStudentDetails(e) {
    hideAllSections();
    disableActiveButtons();
    document.getElementById('StudentDetailsButton').classList.toggle('active');
    document.getElementById('student-details').style.display = 'block';
}

// Function to show author details when an author button is clicked
function showAuthorDetails(authorName) {
    // Add author information (replace with actual data)
    const authorInfo = author_data;
    const authorDetails = authorInfo[authorName];
    document.getElementById('author-name').textContent = authorName;
    document.getElementById('author-info').textContent = authorDetails['Intro'];

    const mainWorksList = document.getElementById('main-works');
    mainWorksList.innerHTML = '';

    // Populate the list of main works with intros
    authorDetails['Main Works'].forEach(work => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong class="clickableText" onclick="workTextClickHandler('${work['Work Name']}')">${work['Work Name']}:</strong> ${work['Work Intro']}`;
        mainWorksList.appendChild(listItem);
    });

    // Show the author details section
    document.getElementById('author-details').style.display = 'block';
}

function showWorkDetails(workName){
    const worksInfo=works_data;
    const workDetails=worksInfo[workName];
    document.getElementById('work-name').textContent=workName;
    document.getElementById('work-info').textContent=workDetails['Work Description'];
    const authorsList=document.getElementById('authors-list');
    authorsList.innerHTML='';

    workDetails['Authors'].forEach(author=>{
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong class="clickableText" onclick="authorTextClickHandler('${author}')">${author}</strong>`;
        authorsList.appendChild(listItem);
    })

    // Show the author details section
    document.getElementById('work-details').style.display = 'block';
}

// Function to hide all sections
function hideAllSections() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('about').style.display = 'none';
    document.getElementById('authors').style.display = 'none';
    document.getElementById('author-details').style.display = 'none';
    document.getElementById('works').style.display='none';
    document.getElementById('work-details').style.display='none';
    document.getElementById('student-details').style.display = 'none'; // Hide Student Details
}

function disableActiveButtons(){
    var activeButton=document.querySelector('.toolbar-button.active');
    activeButton.classList.toggle('active');
}

// Function to search for authors by name or work
function searchAuthors() {
    const searchInput = document.getElementById('authorSearch').value.toLowerCase();
    const authorButtons = document.querySelectorAll('#authors .button-entity');
    document.getElementById('author-details').style.display = 'none';

    authorButtons.forEach(button => {
        const authorName = button.textContent.toLowerCase();
        if (!button.classList.contains('toolbar-button')) {
            if (authorName.includes(searchInput)) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        }
    });
}

// Function to search for work by name
function searchWorks(){
    const searchInput = document.getElementById('workSearch').value.toLowerCase();
    const workButtons = document.querySelectorAll('#works .button-entity');
    document.getElementById('work-details').style.display = 'none';

    workButtons.forEach(button => {
        const workName = button.textContent.toLowerCase();
        if (!button.classList.contains('toolbar-button')) {
            if (workName.includes(searchInput)) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        }
    });
}

function displayAllWorkChipsAndClearSearchInput(){
    const searchInput = document.getElementById('workSearch');
    searchInput.value="";
    const workButtons=document.querySelectorAll('#works .button-entity');
    document.getElementById('work-details').style.display = 'none';
    workButtons.forEach(button=>{
        if(button.style.display=='none'){
            button.style.display='block';
        }
    });
}

function displayAllAuthorChipsAndClearSearchInput(){
    const searchInput = document.getElementById('authorSearch');
    searchInput.value="";
    const authorButtons=document.querySelectorAll('#authors .button-entity');
    document.getElementById('author-details').style.display = 'none';
    authorButtons.forEach(button=>{
        if(button.style.display=='none'){
            button.style.display='block';
        }
    });
}

function workTextClickHandler(workName){
    console.log(workName);
    showWorks();
    displayAllWorkChipsAndClearSearchInput();
    showWorkDetails(workName);
}

function authorTextClickHandler(authorName){
    console.log(authorName);
    showAuthors();
    displayAllAuthorChipsAndClearSearchInput();
    showAuthorDetails(authorName);
}