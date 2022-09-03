// a good practice for creating sites is we should comment console.log at the end so that our work looks professional
console.log("This is our NOTES app. Welcome!!!");
shownotes(); //calling the function so that it shows the notes just after reloading too
document.getElementById("searchtxt").value="";  // initializing searchbtn on reloading

//if we add a note, add it to the localstorage
let addbtn=document.getElementById("addbtn");  //selecting addbutton of main card
addbtn.addEventListener("click", function(e){
    let addtxt=document.getElementById("addtxt");  //selecting textarea add note of main card
    let addtitle=document.getElementById("addtitle");  //selecting title area of main card
    let noteselement=localStorage.getItem("notes");  //searching localstorage for item notes
    if(noteselement==null){ notesobj=[]; }  //if nothing in localstorage then creating an notesobj array
    else{ notesobj= JSON.parse(noteselement); } //returning whole array

    let note_object={
        title: addtitle.value,
        text: addtxt.value
    };   
    notesobj.push(note_object); //pushing object to our array
    localStorage.setItem("notes",JSON.stringify(notesobj)); //setting item as a string with key notes 
    addtxt.value="";  //again resetting it to null such that it does not show the the same text after adding a note
    addtitle.value="";  //again resetting it to null such that it does not show the the same title after adding a note
    // console.log(notesobj); //checking our array
    shownotes();
});

//creating function to show elements from local storage
function shownotes(){
    let notes=localStorage.getItem("notes");  //retreving notes
    if(notes==null){ notesobj=[]; }
    else{ notesobj= JSON.parse(notes); }

    let html=""; //creating a blank string
    notesobj.forEach(function(element, index){  //traversing notesobj
        html+= `
                <div class="notecard card my-2 mx-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>
        `; //copying that sample note card, also this card is getting appended in html string (this.id sends id of that particular element)
    });

    let notesele=document.getElementById("notes");
    if(notesobj.length!=0){ notesele.innerHTML=html; }
    else{ notesele.innerHTML=`NOTHING TO SHOW!!, Add a Note First`; notesele.style.color="rgb(77, 77, 77)"}
}

//creating function to delete a note, for which we have made some changes in delete button we add id part and onclick 
//attribute which on clicking the button will call deletenote function for that button id
function deletenote(index){
    // console.log("Deleting Note",index+1);

    let notes=localStorage.getItem("notes");  //retreving notes
    if(notes==null){ notesobj=[]; }
    else{ notesobj= JSON.parse(notes); }

    /*The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements
    splice(start)
    splice(start, deleteCount)
    splice(start, deleteCount, item1)
    splice(start, deleteCount, item1, item2, itemN)
    */
    notesobj.splice(index, 1);  //this function will delete the note but we also have to update the localstorage
    localStorage.setItem("notes",JSON.stringify(notesobj)); //updating local storage
    shownotes(); //showing updated notes
}

//searching function (navbar) for sorting notes on the basis of text inputed
let search=document.getElementById("searchtxt");  //selecting inputing tag
search.addEventListener("input", function(){
    // console.log("input event used");
    let inputval=search.value.toLowerCase();  //lowercase function will convert uppercase inputed text into lowercase
    let notecards=document.getElementsByClassName("notecard"); //selecting cards
    Array.from(notecards).forEach(function(element){
        let cardtxt=element.getElementsByTagName("p")[0].innerText;  //searching paragraph tag
        //base condition for searching as now we have retreived card text
        if(cardtxt.includes(inputval)){
            element.style.display= "block";  //changing css
        }
        else{ element.style.display= "none"; }
    });
});

//preventing default action of searchbtn
let searchbtn=document.getElementById("searchbtn");
searchbtn.addEventListener("click", (e)=>{e.preventDefault();});

// more features which can be added are mark imp tag for notes, seprating notes by user
//sync and host to webserver