"use strict"

const itemModal = new bootstrap.Modal(document.getElementById('itemModal'), {
   backdrop: 'static',
   keyboard: false
});

const saveBtn = document.getElementById('saveBtn');
const itemForm = document.getElementById('itemForm');
const dataTable = document.getElementById('dataTable');

let items = [];
let editMode = false;
let editItemId = null;

function displayItem() {
   dataTable.innerHTML = '';

   items.forEach((item) => {
   const row = dataTable.insertRow();
  row.innerHTML = `
   <td>${item.id}</td>
   <td>${item.name}</td>
   <td>${item.description}</td>


   <td class="action">
   <button class="btn btn-danger editBtn mx-2" data-id="${item.id}">Edit</button>

   <button class="btn btn-primary deleteBtn" data-id="${item.id}">Delete</button>
   </td>
   `
});
   addEventListenersToButtons();
}

function addEventListenersToButtons() {
   const editBtn = document.getElementsByClassName('editBtn');
   const deleteBtn = document.getElementsByClassName('deleteBtn');


   Array.from(editBtn).forEach(btn => {
      btn.addEventListener('click', (e) => {
         editMode = true;
         editItemId = parseInt(e.target.getAttribute("data-id"));
         const itemToEdit = items.find(item => item.id === editItemId);
         fillForm(itemToEdit);
         openModal();
      });
   });



      Array.from(deleteBtn).forEach(btn => {
      btn.addEventListener('click', (e) => {
         const idToDelete = parseInt(e.target.getAttribute("data-id"));
         deleteItem(idToDelete);
      });
   });
}

function fillForm(item) {
   document.getElementById("itemId").value = item.id;
   document.getElementById("name").value = item.name;
   document.getElementById("description").value = item.description;
}

function deleteItem(id) {
   if(confirm("Are you sure you want to delete")) {
   items = items.filter((item) => item.id !== id);
   displayItem();
   }
}


function closeModal() {
   itemModal.hide();
   itemForm.reset();
   editMode = false;
   editItemId = false;
}


function saveItem(event) {
   event.preventDefault();
   const id = parseInt(document.getElementById("ItemId").value);
   const name = document.getElementById("name").value;
   const description = document.getElementById("description").value;

      if(editMode) {
         const indexToUpdate = items.findIndex((item) => item.id === id);
         items[indexToUpdate] = {id, name, description};
      }  else {
         const newItem = {id: Date.now(), name, description}
         items.push(newItem);
      }

   closeModal();
   displayItem();
}


document.getElementById('saveBtn').addEventListener('click', saveItem);


items = [
   {id: 12, name: "Item 1", description: 'Description for item 1'},
   {id: 42, name: "Item 2", description: 'Description for item 2'},
    {id: 123, name: "Otabek", description: 'Description for me'}
];

displayItem();



document.getElementById('addBtn').addEventListener('click', () => {
   editMode = false;
   itemModal.show();
});

function openModal() {
   itemModal.show();
}
