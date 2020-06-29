const API_URL = "http://localhost:5000/test"


document.getElementById("GET").addEventListener("click", function(){
    console.log("test");
    fetch(API_URL) 
        .then(response => response.json())
        .then(word_statistics => {
            console.log(word_statistics);
        });    
})

