async function getUser(){
   let user = await fetch('http://localhost:3000/getUser', {
    method: 'GET',
  });

   return await user.json();
}

(async () => {
  let user = await getUser();
  displayUser(user);
})()

async function displayUser(user){
  const userList = document.getElementById("userList");
  userList.innerHTML = "";
  userList.innerHTML = user.map(u => {
    return `<div style="display: flex"><div id="userId">
      <h3>Id</h3>
      <p>${u.id}s</p>
    </div>
    <div id="userName" style="padding-left: 10px">
      <h3>Name</h3>
      <p>${u.name}</p>
    </div>
    <div id="userEmail" style="padding-left: 10px">
      <h3>Email</h3>
      <p>${u.email}</p>
    </div>
    <div id="userPassword" style="padding-left: 10px">
      <h3>Password</h3>
      <p>${u.password}</p>
    </div>
    <div id="userCreateDate" style="padding-left: 10px">
      <h3>CreateDate</h3>
      <p>${u.createdAt}</p>
    </div>
    <div id="userUpdateDate" style="padding-left: 10px">
      <h3>UpdateDate</h3>
      <p>${u.updatedAt}</p>
    </div>
    <div id="userDelete" style="padding-left: 10px">
      <h3>Delete</h3>
      <button onclick="deleteUser('${u.id}')">Delete</button>
    </div>
    <div id="userDelete" style="padding-left: 10px">
      <h3>Update</h3>
      <button onclick="updateUser('${u.id}')">Update</button>
    </div>
  </div>`
  }).join("");
}

async function deleteUser(userId) {
  fetch('http://localhost:3000/deleteUser', {
    method: 'DELETE',
    body: JSON.stringify({
      id: userId
    })
  });

  let user = await getUser();
  displayUser(user);
}

async function updateUser(userId) {
  console.log(user);
  let nameInput = prompt("name", user.id);
  let emailInput = prompt("email", user.email);
  let passwordInput = prompt("password", user.password);

  if (nameInput === "" || emailInput === "" || passwordInput === "") {
    alert("Please fill all fields");
    return;
  }

  fetch('http://localhost:3000/putUser', {
    method: 'PUT',
    body: JSON.stringify({
      id: userId,
      name: nameInput,
      email: emailInput,
      password: passwordInput
    })
  });

  displayUser(await getUser());
}

async function postUser() {
  let nameInput = prompt("name", "");
  let emailInput = prompt("email", "");
  let passwordInput = prompt("password","");

  if(nameInput.value === "" || emailInput.value === "" || passwordInput.value === ""){
    alert("Please fill all fields");
    return;
  }

  fetch('http://localhost:3000/postUser', {
    method: 'POST',
    body: JSON.stringify({
      name: nameInput,
      email: emailInput,
      password: passwordInput
    })
  });

  let user = await getUser();
  displayUser(user);
}

async function searchUser() {
  let searchInput = document.getElementById("searchUser");
  let users = await getUser();

  if(searchInput.value === ""){
    alert("Please fill all fields");
    displayUser(users)
    return;
  }
  displayUser(users);

  let user = users.filter(u => {
    console.log(u);
    return u.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });

  console.log(users);
  displayUser(user);
}


