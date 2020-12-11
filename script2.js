
show();
//add notes to local storage
let add = document.getElementById('add');
add.addEventListener('click', () => {
    //checking if user cant leave input blocks blank 
    let disc = document.getElementById('disc');
    let importantDisc = document.getElementById('impDisc');
    if (disc.value == "") {
        importantDisc.style.visibility = "visible"
        setTimeout(() => {
            importantDisc.style.visibility = "hidden"

        }, 1500);
    } else {
        // adding notes to local storage
        console.log("user want to add new notes");
        let title = document.getElementById('title');
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesobj = [];
        } else {
            notesobj = JSON.parse(notes);
        }
        let myobj = disc.value;
        notesobj.push(myobj);
        localStorage.setItem("notes", JSON.stringify(notesobj));
        notes = localStorage.getItem("notes");
        disc = "";
        title = "";
        console.log(notes);
        show();
    }
})

// show notes to DOM
function show() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let noteTemplate = ""

    notesobj.forEach(function (element, index) {
        
        noteTemplate += `<div class="card mb-12 my-4 boxhover block" style="max-width: 540px;">
                                <div class="row no-gutters">
                                <div class="">
                                    <div class="card-body">
                                    <img src="star-fill.PNG" alt="notimportant" class="impspan" id="${index}" onclick="important(this.id)">
                                    <h5 class="card-title">note ${index + 1}-</h5>
                                    <p class="card-text">${element}</p>
                                    <button id="${index}" onclick="deleteBut(this.id)" class="btn btn-outline-danger">X</button>
                                    </div>
                                </div>
                                </div>
                        </div>`;
    });
    let notesContainer = document.getElementById('notes');
    if (notesobj.length != 0) {
        notesContainer.innerHTML = noteTemplate;

    }

}
//delete function
function deleteBut(index) {
    console.log("user is deleting button:", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    show()
}

//important  marking important
let imp = true;
function important(index) {
    console.log("impportant number is:", index);
    let star = document.getElementById(index);
    if (imp == true) {
        star.style.filter = "grayscale(0%)";
        imp = false;
        star.classList.add('importStar')
        setTimeout(() => {
            star.classList.remove('importStar')

        }, 800);
    } else {
        star.style.filter = "grayscale(100%)";
        imp = true;
    }
}

//search function
let searchbar = document.getElementById('searchtxt');
searchbar.addEventListener('input', () => {
    
    let inputval = searchbar.value.toLowerCase();
    //console.log("you pressed",inputval)
    let cards = document.getElementsByClassName('card');
    Array.from(cards).forEach(function (element) {
        let para = document.getElementsByTagName('p')[0].innerText;
        if (para.includes(inputval)) {
            console.log("matched", para)
        } else {
            console.log("not matched")
            element.style.display = "none";
        }
    })
})

