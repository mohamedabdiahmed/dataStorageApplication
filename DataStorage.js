// load data from LocalStorage one page load
window.onload = function(){
    loadData()
}

// Add Data to Table
function addData(){
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let country = document.getElementById("country").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    // create a new Row in the table 
    const tableBody = document.getElementById("table-body")
    const newRow = document.createElement("tr")
    newRow.innerHTML = `
    <td>${name}</td>
    <td>${age}</td>
    <td>${address}</td>
    <td>${city}</td>
    <td>${state}</td>
    <td>${country}</td>
    <td>${phone}</td>
    <td>${email}</td>
    <td><button onclick="editRow(this)">update</button></td>
    <td><button onclick="deleteRow(this)">Delete</button></td>
    `
    tableBody.appendChild(newRow);
    saveData(name,age,address,city,state,country,phone,email)
}

// updateData 
function updateData(){
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let country = document.getElementById("country").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    
    // find and update the selected row in tha table
    const selectedRow = document.querySelector('tr.selected')
    if(selectedRow){
        selectedRow.cells[0].innerText = name;
        selectedRow.cells[1].innerText = age;
        selectedRow.cells[2].innerText = address;
        selectedRow.cells[3].innerText = city;
        selectedRow.cells[4].innerText = state;
        selectedRow.cells[5].innerText = country;
        selectedRow.cells[6].innerText = phone;
        selectedRow.cells[7].innerText = email;
        const rowIndex = selectedRow.rowIndex -1;
        updateLocalStorage(rowIndex,name,age,address,city,state,country,phone,email)
        
document.getElementById("name").value = "";
document.getElementById("age").value = "";
document.getElementById("address").value = "";
document.getElementById("city").value = "";
document.getElementById("state").value = "";
document.getElementById("country").value = "";
document.getElementById("phone").value = "";
document.getElementById("email").value = "";

selectedRow.classList.remove("selected");
    }
}

// Edit Row Data in table 
function editRow(button){
    const row = button.parentNode.parentNode;
    document.getElementById("name").value = row.cells[0].textContent;
document.getElementById("age").value = row.cells[1].textContent;
document.getElementById("address").value = row.cells[2].textContent;
document.getElementById("city").value = row.cells[3].textContent;
document.getElementById("state").value = row.cells[4].textContent;
document.getElementById("country").value = row.cells[5].textContent;
document.getElementById("phone").value = row.cells[6].textContent;
document.getElementById("email").value = row.cells[7].textContent;
row.classList.add("selected");

}

// Delete Data
function deleteRow(button){
    const row= button.parentNode.parentNode;
    row.parentNode.removeChild(row)
    const rowIndex = row.rowIndex- 1;
    deleteFromLocalStorage(rowIndex);
}

// SaveData 

function saveData(name,age,address,city,state,country,phone,email){

        let data = localStorage.getItem('tableData')
        if(!data){
            data = []
        }else{
            data = JSON.parse(data)
        }
        data.push({name:name, age:age, address:address, city:city, state:state, country:country, phone:phone ,email:email})
        localStorage.setItem('tableData',JSON.stringify(data))
    }
    


// LoadData
function loadData(){
    const data = JSON.parse(localStorage.getItem('tableData'))
    if(data){
        const tableBody = document.getElementById("table-body")
        data.forEach(item =>{
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.address}</td>
            <td>${item.city}</td>
            <td>${item.state}</td>
            <td>${item.country}</td>
            <td>${item.phone}</td>
            <td>${item.email}</td>
            <td class="bg-orange-400 rounded-lg"><button onclick="editRow(this)">update</button></td>
            <td class="bg-red-400 rounded-md px-2 ml-2"><button onclick="deleteRow(this)">Delete</button></td>
            `
            tableBody.appendChild(newRow)
        })
    }
}

function updateLocalStorage(rowIndex,name,age,address,city,state,country,phone,email){
    let data = JSON.parse(localStorage.getItem('tableData'));
    if(data){
        data[rowIndex] = {name:name, age:age, address:address, city:city,state:state, country:country, phone:phone, email:email}
        localStorage.setItem('tableData',JSON.stringify(data))
    }
}

// deleteFromLocalStorage
function deleteFromLocalStorage(rowIndex){
    let data = JSON.parse(localStorage.getItem('tableData'));
    if(data){
        data.splice(rowIndex,1)
        localStorage.setItem('tableData',JSON.stringify(data))
    }
}