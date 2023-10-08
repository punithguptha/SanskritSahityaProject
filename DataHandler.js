const jsonUrls=['data.json']
author_data={};
const fetchedData=[];


function fetchData(url){
    return fetch(url).then((response)=>{
        if(!response.ok){
            throw new Error('HTTP Error! Status: ${response.status}');
        }
        return response.json();
    }).then((data)=>{
        fetchedData.push(data);
    }).catch((err)=>{
        console.error('Error: ',err);
    });
}

const fetchPromises=jsonUrls.map((url)=>fetchData(url));

Promise.all(fetchPromises).then(()=>{
    author_data=fetchedData[0];
    const script2 = document.createElement('script');
    //Loading Project.js after the fetch is done so that it can use the jsons (Start)
    script2.src = 'Project.js';
    script2.onload = function() {
        console.log('script2.js has been loaded and executed.');
    };
    document.head.appendChild(script2);
    //Loading Project.js (Done)
    console.log('All JSON files have been loaded: ',fetchedData);
}).catch((err)=>{
    console.error('Error: ',err);
});
