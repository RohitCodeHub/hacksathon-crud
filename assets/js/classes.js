const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.table-users');

let id;

// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().classTimings}</td>
      <td>${doc.data().scheduleofclasses}</td>
      <td>${doc.data().teachersName}</td>
      <td>${doc.data().sectionName}</td>
      <td>${doc.data().courseName}</td>
      <td>${doc.data().batchNo}</td>
      <td>
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-delete">Delete</button>
      </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);

  // Click edit user
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.classTimings.value = doc.data().classTimings;
    editModalForm.scheduleofclasses.value = doc.data().scheduleofclasses;
    editModalForm.teachersName.value = doc.data().teachersName;
    editModalForm.sectionName.value = doc.data().sectionName;
    editModalForm.courseName.value = doc.data().courseName;
    editModalForm.batchNo.value = doc.data().batchNo;
  });

  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    db.collection('classes').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
    }).catch(err => {
      console.log('Error removing document', err);
    });
  });

}

// Click add user button
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');

  addModalForm.classTimings.value = '';
  addModalForm.scheduleofclasses.value = '';
  addModalForm.teachersName.value = '';
  addModalForm.sectionName.value = '';
  addModalForm.courseName.value = '';
  addModalForm.batchNo.value = '';
});

// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});

// Get all users
// db.collection('users').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderUser(doc);
//   })
// });

// Real time listener
db.collection('classes').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('classes').add({
    classTimings: addModalForm.classTimings.value,
    scheduleofclasses: addModalForm.teachersName.value,
    teachersName: addModalForm.classTimings.value,
    sectionName: addModalForm.sectionName.value,
    courseName: addModalForm.courseName.value,
    batchNo: addModalForm.batchNo.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('classes').doc(id).update({
    classTimings: editModalForm.classTimings.value,
    scheduleofclasses: editModalForm.scheduleofclasses.value,
    teachersName: editModalForm.teachersName.value,
    sectionName: editModalForm.sectionName.value,
    courseName: editModalForm.courseName.value,
    batchNo: editModalForm.batchNo.value,
  });
  editModal.classList.remove('modal-show');
  
});


$(document).ready( function() {
  $('body').on("click", ".larg div h3", function(){
    if ($(this).children('span').hasClass('close')) {
      $(this).children('span').removeClass('close');
    }
    else {
      $(this).children('span').addClass('close');
    }
    $(this).parent().children('p').slideToggle(250);
  });
  
  $('body').on("click", "nav ul li a", function(){
    var title = $(this).data('title');
    $('.title').children('h2').html(title);
  });
});