const URL = 'http://localhost:8080/api/children';
const tableBody = document.querySelector('#tableBody');
const loader = document.querySelector('.spinner-border');
const createForm = document.querySelector('#add_child_form');
const updateForm = document.querySelector('#update_child_form');
const buttonClose = document.querySelectorAll('.btn-close');
let children = [];

//handling submiting post the form
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: createForm.name.value,
        age: createForm.age.value,
        address: createForm.address.value,
        phoneNumber: createForm.phoneNumber.value,
        email: createForm.email.value
    }
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            generateHtml(data);
            children = data;
            createForm.reset();
            buttonClose[0].click();
        })
        .catch(error => console.log(error));
})

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        id: updateForm.id.value,
        name: updateForm.name.value,
        age: updateForm.age.value,
        address: updateForm.address.value,
        phoneNumber: updateForm.phoneNumber.value,
        email: updateForm.email.value
    }
    fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            generateHtml(data);
            children = data;
            updateForm.reset();
            buttonClose[1].click();
        })
        .catch(error => console.log(error));
})

//deleting row from table
tableBody.addEventListener('click', (e) => {
    //deleting
    if (e.target.classList.contains('fa-trash')) {
        const id = e.target.getAttribute('data-id');
        document.querySelector(`tr[data-id="${id}"]`).remove();
        fetch(`${URL}/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                generateHtml(data);
            })
            .catch(error => console.log(error));
    }
    //editing
    if (e.target.classList.contains('fa-user-edit')) {
        const child_id = e.target.getAttribute('data-id');
        const { id, name, age, phoneNumber, email, address } = children[child_id]
        updateForm.name.value = name;
        updateForm.age.value = age;
        updateForm.phoneNumber.value = phoneNumber;
        updateForm.email.value = email;
        updateForm.address.value = address;
        updateForm.id.value = id;
    }
})

const getAllChildren = () => {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            generateHtml(data);
            children = data;
        })
        .catch(error => console.log(error));
}

getAllChildren();

const generateHtml = (data) => {
    let HTML = ``;
    data.forEach((child, i) => {
        HTML += `
        <tr data-id="${child.id}">
            <th scope="row">${i + 1}</th>
            <td>${child.name}</td>
            <td>${child.age}</td>
            <td>${child.address}</td>
            <td>${child.phoneNumber}</td>
            <td>${child.email}</td>
            <td><i class="fas fa-user-edit" data-id="${i}" data-bs-toggle="modal" data-bs-target="#editModal"></i><i class="fas fa-trash" data-id="${child.id}"></i></td>
        </tr>
        `
    });
    HTML += `
        <tr class="add_child">
            <td colspan="7"><i class="fas fa-plus-circle" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-toggle="tooltip" data-bs-placement="top" title="Add new record"></i></td>
        </tr>
    `
    loader.style.display = 'none';
    tableBody.innerHTML = HTML;
}



