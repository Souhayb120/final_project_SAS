
//****************************************************************************************/
//***************************** GESTION DE BIBLIOTIQUE ************************************
//****************************************************************************************/


var prompt = require('prompt-sync')();

let library = [
    {
        id_livre: 1,
        titre:"just a film",
        pub_year:1999,
        autor:"mohammed",
        disponible:true
    }
]
let abonnee = [
{
subscriber_Id : 1,
first_Name : "souhayb",
last_Name: "Hadi"
    }
];

let emprunts = [
{ empruntId: 1, id_livre: "123", dateEmprunt: "2025-09-22" },
{ empruntId: 2, id_livre: "2", dateEmprunt: "2025-09-22" },
 {empruntId: 2, id_livre: "3", dateEmprunt: "2025-09-22" },

];



// All THE FUNCTION NEEDED : 
//************************ */


// ADD A NEW BOOk :

function addBook(){
   
let titre = prompt('enter book title : ') ;
let autor = prompt('enter the author : ') ;
let pub_year = prompt('enter year of publication : ');

    let newBook = {
        id_livre: library.length + 1,
        titre:titre,
        pub_year:pub_year,
        autor:autor,
        disponible:true
    }

    library.push(newBook);
}


// ADD MORE BOOKS :

function addBooks(){
    let numberOfBooks = prompt('how much book u want to add ? ');
    for (let i = 0; i < numberOfBooks ; i++) {
       addBook();  
    }
};


// DISPLAY OR READ ALL BOOKS :

function displayAllBooks(){
    library.forEach(book => {
        console.log("**********************************************************************")
        console.log(book.id_livre + " Book's title " + book.titre + " written By  " + book.autor + ", year of publication :" + book.pub_year + "disponibme " + book.disponible );
    });
};


//  DISPLAY BOOKS (ascendant/descendant) :

function bookByAsc_des(){
    let state = prompt('how do u like ur books to display asc OR desc ? : ')
    let book;
    if(state == 'asc'){
            book = library.sort((a,b) => a.titre.localeCompare(b.titre));
    }else if(state == 'desc'){
    book = library.sort((a,b) => b.pub_year - a.pub_year);

    }else{
        book = 'invalid state !!'
    }
    return book;
}



// DISPLAY BOOKS BY YEAR OF PUBLICATION

function bookByPubYear(){
    let book;
    book = library.sort((a,b) => a.pub_year - b.pub_year);
    return book;
}

// DISPLAY ONLY AVAILIBLE BOOKS :

function displayAvailbleBooks(){
    let availbleBook;
  
    availbleBook = library.filter((book) => book.disponible == true)
if(availbleBook.length > 0){
    availbleBook.forEach(book => {
    console.log(book.titre + " By "+ book.autor + " is availble currently")
    });
}else{
    console.log('no availble books currently')
}
   
}

// SEARCH BOOK BY IT's UNIQUE ID :

function findBookById(){
    let foundBook;
    let takeId = prompt("Enter the book's ID you are looking for : ");
    foundBook = library.find((book) => book.id_livre == takeId);
return foundBook;
}



//********************* BORROWING SESSION ******************** */ */


// ADD NEW SUBSCRIBER

function AddSubscriber(){
    let user_Name = prompt('enter your first Name : ');
     let user_familly_Name = prompt('enter your last Name : ');
    let newSubscriber = {
subscriber_Id : abonnee.length + 1,
first_Name : user_Name,
last_Name: user_familly_Name
    }
    abonnee.push(newSubscriber);

}


// DISPLAY ALL SUBSCRIBERS


function displayAllSubscribers(){
    console.log('search result ' + abonnee.length > 0 ? abonnee.length + ' user found \n' : "no User Found")
   
   if(abonnee.length > 0){
  abonnee.forEach(user => {
        console.log("**********************************************************************")
        console.log(user);
    });
   }
  
};

// REGISTER A NEW BORROWING :

function newBorrowing(){
    //get user and book id from the user
    let userId = prompt('enter subscriber ID : ');
    let bookId = prompt('enter Book ID : ');

// check if the id's are availble
    let checkUser = abonnee.find((user) => user.id_abonnee == userId);
    let check_book = library.find((book) => book.id_livre == bookId);

// get Current Date
let today = new Date();
let day = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();
let currentDate = `${day}/${month}/${year}`;

//create new emprunt to push it later to it's array
let emprunt = {
    abonneid : userId,
    bookid : bookId,
    dateEmprunt : currentDate
};


if(check_book.id_livre == bookId){
    check_book.disponible = false;
    emprunts.push(emprunt);
    console.log(check_book.titre + ' book took succesfully by ' )
}else{
    console.log('errore');
}




   
}


// REGISTER A RETURN


function registerReturn(){
    let userId = prompt('enter BORROWING ID : ');
    let bookId = prompt('enter RETURN Book ID : ');


    let checkUser = abonnee.find((user) => user.id_abonnee == userId);
    let check_book = library.find((book) => book.id_livre == bookId);

 
    if(checkUser && check_book){
      
            if(check_book.disponible == false){
                checkUser.disponible = true;
                  console.log('the book has been returned by ' + checkUser.first_Name)
            }
       
       
    } 
     
}

// Show all books borrowed by a given subscriber 

function booksBorrowedBySubscriber(){
let userId = prompt('enter user id : ');
let getUser = emprunts.filter((emprunt) => emprunt.abonneId == userId);
let borrowedBook = getUser.map( record => {
    return library.find( book => book.id_livre == record.id_livre)});

 if (borrowedBook.length === 0) {
    console.log("No books borrowed by this user.");
  } else {
    console.log("Books borrowed by user " + userId + ": ");
    borrowedBook.forEach(book => console.log("book's Title : " + book.titre + " Written By : " + book.autor + " in " + book.pub_year));
  }


}



// LIBRARY MAIN MENU :

function Menu() {
  
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║                   📚  MAIN MENU  📚                     ║");
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log("║ 1️⃣  Add a single book                                  ║");
  console.log("║                                                          ║");
  console.log("║ 2️⃣  Add multiple books                                 ║");
  console.log("║                                                          ║");
  console.log("║ 3️⃣  Display all books                                  ║");
  console.log("║                                                          ║");
  console.log("║ 4️⃣  Sort books by title (ascending/descending)          ║");
  console.log("║                                                          ║");
  console.log("║ 5️⃣  Sort books by year of publication                  ║");
  console.log("║                                                          ║");
  console.log("║ 6️⃣  Show only available books                          ║");
  console.log("║                                                          ║");
  console.log("║ 7️⃣  Search for a book by ID                            ║");
  console.log("║                                                          ║");
  console.log("║ 8️⃣  SUBSCRIBERS & BORROWING MANAGEMENT                   ║");
  console.log("║                                                          ║");

  console.log("║ 0️⃣  Exit the program                                   ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  
  let choice = prompt('👉  Enter your choice: ')
  return choice;
}


//ADDITIONAL MENU 

function MenuSubscribersAndBorrowing() {

  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║          👥  SUBSCRIBERS & BORROWING MANAGEMENT  👥       ║");
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log("║ 1️⃣  Add a new subscriber                                 ║");
  console.log("║                                                          ║");
  console.log("║ 2️⃣  Display all subscribers                             ║");
  console.log("║                                                          ║");
  console.log("║ 3️⃣  Register a new borrowing                            ║");
  console.log("║                                                          ║");
  console.log("║ 4️⃣  Register a return                                   ║");
  console.log("║                                                          ║");
  console.log("║ 5️⃣  Show all books borrowed by a given subscriber        ║");
  console.log("║                                                          ║");
  console.log("║ 0️⃣  Back to Main Menu                                   ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  let menu = prompt("Enter your choice: ");
  return menu;
}




let m ;


function library_management(){
   
    do{
 m = Menu();
    switch (m) {
        case '1':
            addBook();
            break;
         case '2':
            addBooks();
        break;
         case '3':
            displayAllBooks()
         break;
        case '4':
           console.log( bookByAsc_des())
        break;
         case '5':
            console.log(bookByPubYear())
            break;
        case '6':
           displayAvailbleBooks()
        break;
             case '7':
            console.log(findBookById())
            break;
             case '8':      
                         m2 = MenuSubscribersAndBorrowing();
                            switch (m2) {
                              case '1':
                              AddSubscriber();
                              break;
                              case '2':
                               displayAllSubscribers();
                              break;
                              case '3':
                                newBorrowing();
                                break;
                                case '4':
                                    registerReturn()
                                    break;
                                    case '5':
                                      console.log(booksBorrowedBySubscriber())
                                        break;
                                    case '0':
                                    m;
                                    break;
                            default:
                                console.log('invalid input !!')
                                break;
                            }
         break;  
         case '9':
       console.log("9")
        break;
        
        default:
            console.log('invalid Input !!! ')
            break;
    }
    
}while(m != 0)
    }


library_management();
