//const { response } = require("express");

const content=document.querySelector("#content");
const submit=document.querySelector("#add");
const update=document.querySelector("#update");


//POST API
submit.addEventListener('click',(event)=>{
    event.preventDefault();
    let fname=document.querySelector("#fname").value;
    let lname=document.querySelector("#lname").value;
    let age=document.querySelector("#age").value;
    let email=document.querySelector("#email").value;
    let role=document.querySelector("#role").value;
    let formData={fname,lname,age,email,role};

    fetch("http://localhost:7000/api/users",{
        method:'POST',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        },
    }).catch((error)=>{
        console.log(error);
    })
    alert("User Added Successfully");
    location.reload();
});


window.addEventListener('load', ()=>{
    getUsers();
})

function getUsers(){
    let html=""
    //FETCH API
    fetch('http://localhost:7000/api/users',{mode:'cors'})
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .then(data=>{
        console.log(data);
        data.forEach(element=>{
            html+=`<li>${element.first_name} ${element.last_name} ${element.age} - ${element.email} - ${element.ip_address} - ${element.role}
            
            <a href="javascript:void(0)" onClick="deleteMember(${element.id})">Delete</a>
            
            <a href="javascript:void(0)" onClick="updateMember(${element.id})">Update</a></li>`;

            

        })

        content.innerHTML=html;
    })
    .catch(error=>{
        console.log(error);
    })
}


//DELETE
function deleteMember(id){

let text;
if (confirm("Are you sure you want to delete this user?") ==true) {
    fetch(`http://localhost:7000/api/users/${id}`,{
        method:'DELETE',
    }).then(response=> response.text())
    .then(response=>console.log(response))
    .catch(error=>{
        console.log(error);
    })
    location.reload();
}
     else{ text ="You canceled!";}
}

//search
function updateMember(id){
    fetch(`http://localhost:7000/api/users/${id}`)
    .then(response=> response.json())
    .then(data=>{
        document.querySelector("#fname").value=data[0].first_name;
        document.querySelector("#lname").value=data[0].last_name;
        document.querySelector("#age").value=data[0].age;
        document.querySelector("#email").value=data[0].email;
        document.querySelector("#role").value=data[0].role;
        document.querySelector("#ID").value=data[0].id;
    }).catch(error=>{
        console.log(error);
    })

}
//PUT
update.addEventListener('click',(event)=>{
    event.preventDefault();
    let fname=document.querySelector("#fname").value;
    let lname=document.querySelector("#lname").value;
    let age=document.querySelector("#age").value;
    let email=document.querySelector("#email").value;
    let role=document.querySelector("#role").value;

    let id=document.querySelector("#ID").value;

    let formData={fname,lname,age,email,role};
    fetch(`http://localhost:7000/api/users/${id}`,{
        method:'PUT',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        },
    }).catch((error)=>{
        console.log(error);
    })
    alert("User Updated Successfully");
    location.reload();
})


