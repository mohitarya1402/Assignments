//hamburger menu
let hamIcon = document.querySelector(".fa-bars");
let ul = document.querySelector("ul");
// console.log(ul);
hamIcon.addEventListener("click", () => {
  hamIcon.classList.toggle("fa-times");
  ul.classList.toggle("visible");
});

//<------------------------------ contact form design-------------------------------------->

var form = `<form  class="formact" action="/">
<div class=" firstrow">
  <div class="inp1">
    <p class=" label">Name</p>
    <input type="text" class="name inptag" placeholder="George" />

  </div>
  <div class="inp1">
    <p class=" label">Surname</p>
    <input type="text" class="surname inptag" placeholder="Arya" />
  </div>
  <div class="inp1">
    <p class=" label">Email address</p>
    <input type="email" class="email inptag" placeholder="jhon@gmail.com" />
  </div>
  <div class="inp1 btn">
    <button id="addfriend" type="submit" class="add_friend cmnbtn" >Add Friend</button>
  </div>
</div>
</form>`;
var formsection = (document.getElementById("formsection").innerHTML = form);

var details = [];
// table

function table() {
  let table = `
  <div class="secrow">
  <table class="table">
  <thead>
    <tr>
      <th class="col-2">NO</th>
      <th class="col-3">Name</th>
      <th class="col-3">Surname</th>
      <th class="col-3">Email</th>
      <th class="col-1">Action</th>
    </tr>
  </thead>
  <tbody>`;

  for (let i = 0; i < details.length; i++) {
    table =
      table +
      `<tr>
    <td>${i + 1}</td>
    <td>${details[i].name}</td>
    <td>${details[i].surname}</td>
    <td>${details[i].email}</td>
    <td class="actionIcon"><button type="button" class="btn btn-warning" onclick="edit(${i})"><i class='fas fa-edit' style='font-size:1.5em'></i></button>
    <button type="button" class="btn btn-danger" onclick="deleteData(${i})"><i class='fas fa-trash-alt' style='font-size:1.5em'></i></button></td>
  </tr> `;
  }
  table =
    table +
    `</tbody>
  </table>
  </div>`;
  document.getElementById("table").innerHTML = table;
  // console.log(table);
}

document.getElementById("formsection").innerHTML = form;
debugger;
getData();
table();

// get data function
function getData() {
  let Data = localStorage.getItem("details");
  if (Data) {
    details = JSON.parse(Data);
  } else {
    setData();
  }
}

//set data into thge database
function setData() {
  localStorage.setItem("details", JSON.stringify(details));
}

//This function will take the data from input box
function save() {
  debugger;
  let name = document.querySelector(".name");
  let surname = document.querySelector(".surname");
  let email = document.querySelector(".email");
  let as = chekregex();

  let person = {
    name: name.value,
    surname: surname.value,
    email: email.value,
  };

  if (as) {
    details.push(person);
    setData();
    table();
    name.value = "";
    surname.value = "";
    email.value = " ";
  } else {
    console.log("data not inserted");
  }
}

function deleteData(index) {
  details.splice(index, 1);
  setData();
  table();
}
let formds = document.querySelector(".formact");
formds.addEventListener("submit", (e) => {
  e.preventDefault();
  save();
});


function edit(index) {
  debugger;
  let editform = `
  <div class=" firstrow">
    <div class="inp1">
      <p>Enter correct Name</p>
      <input type="text" value="${details[index].name}"  class="name" id="newName" />
    </div>
    <div class="inp1">
      <p>Enter correct Surname</p>
      <input type="text" value="${details[index].surname}" class="surname" id="newSurname" aria-describedby="emailHelp"  />
    </div>
    <div class="inp1">
      <p>Enter correct Email address</p>
      <input type="email" value="${details[index].email}" class="email" id="newEmail"  />
    </div>
    <div class="inp1 btn">
      <button  type="submit" id="update" class="add_friend cmnbtn" onclick="update(${index})">Update</button>
    </div>
  </div>
  `;
  document.getElementById("formsection").innerHTML = editform;
}



function update(index) {
  debugger;
  let newName = document.getElementById("newName");
  let newSurname = document.getElementById("newSurname");
  let newEmail = document.getElementById("newEmail");

  details[index] = {
    name: newName.value,
    surname: newSurname.value,
    email: newEmail.value,
  };
  if (chekregex()) {
    setData();
    table();
  } else {
  }
  document.getElementById("formsection").innerHTML = form;
}
//<------------------------- validate form--------------------------->

function seterror(element, mesg) {
  const inputcntrl = element.parentElement;
  inputcntrl.classList.add("error");
  const errorDisplay = inputcntrl.querySelector(".label");
  errorDisplay.innerText = mesg;
}

function onfocusfun(refr) {
  refr.addEventListener("focus", function () {
    refr.parentElement.classList.remove("error");
  });
}

function chekregex() {
  let name = document.querySelector(".name");
  let surname = document.querySelector(".surname");
  let email = document.querySelector(".email");
  let namlength = name.value.length;
  let isnametrue = true;
  (issurname = true), (isemailtrue = true);

  if (true) {
    isnametrue = true;
    if (name.value.length == 0) {
      istrue = seterror(name, "Name should not be empty");
      onfocusfun(name);
      isnametrue = false;
    } else if (namlength < 3) {
      seterror(name, "name is too short");
      onfocusfun(name);
      isnametrue = false;
    } else if (namlength > 15) {
      seterror(name, "name is too large");
      onfocusfun(name);
      isnametrue = false;
    }
  }

  if (true) {
    issurname = true;
    if (surname.value.length == 0) {
      seterror(surname, "Please enter surname");
      onfocusfun(surname);
      issurname = false;
    } else if (surname.value.length > 15) {
      seterror(surname, "surname is too large");
      onfocusfun(surname);
      issurname = false;
    }
  }

  if (true) {
    isemailtrue = true;
    var email1 = email.value;
    var atSymbol = email1.indexOf("@");
    // console.log("@ value is " + atSymbol);
    if (email1.length < 1) {
      seterror(email, "Please enter email");
      onfocusfun(email);
      isemailtrue = false;
    } else if (atSymbol < 1) {
      seterror(email, "Please add @");
      onfocusfun(email);
      isemailtrue = false;
    } else if (
      !(email1.endsWith("@gmail.com") | email1.endsWith("@qualminds.com"))
    ) {
      seterror(email, "Email should end with gmail.com or qualminds.com");
      onfocusfun(email);
      isemailtrue = false;
    }
  }

  if (isnametrue & issurname & isemailtrue) {
    return true;
  } else {
    return false;
  }
}
