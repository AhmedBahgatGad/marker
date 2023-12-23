var nameInput = document.getElementById("bookmarkname");
var siteInput = document.getElementById("Site");
var addBtn = document.getElementById("addBtn");
var linksList = [];
if (localStorage.getItem("list") != null) {
    linksList = JSON.parse(localStorage.getItem("list"))
    displayLinks()
}
function addLink() {
    if (validUrl() == true){
        var link = {
            name: nameInput.value,
            url: siteInput.value
        }
        linksList.push(link)
        localStorage.setItem("list",JSON.stringify(linksList))
        displayLinks()
        clearForm()
    }
    else{
        addBtn.setAttribute("data-bs-target","#exampleModalToggle")
        addBtn.setAttribute("data-bs-toggle","modal")
    }
}
function clearForm() {
    nameInput.value=""
    siteInput.value=""
    nameInput.classList.remove("is-valid")
    nameInput.classList.remove("is-invalid")
    addBtn.removeAttribute("data-bs-target")
    addBtn.removeAttribute("data-bs-toggle")
}
function displayLinks() {
    var temp = ""
    for (var i = 0; i < linksList.length; i++) {
        temp += `<tr><td>`+(i+1)+`</td><td>`+linksList[i].name+`</td>
       <td><a href="`+linksList[i].url +`" target="_blank"><button class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
       <td><button onclick = "deleteLink(`+i+`)" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></td></tr>`
    }
    document.getElementById("body").innerHTML = temp
}
function deleteLink(x){
linksList.splice(x,1)
localStorage.setItem("list",JSON.stringify(linksList))
displayLinks()
}
function validUrl(){
    var regex = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})$/;
    if (regex.test(siteInput.value)== true){
        return true
    }
    else{
        return false
    }
}
var nameRegex = /^([A-z]|[0-9]){3,}\s?[A-z]{0,}?[0-9]{0,}?$/;
function inName() {
    if (nameRegex.test(nameInput.value)==true) {
        nameInput.classList.add("is-valid")
        nameInput.classList.remove("is-invalid")
    }
    if (!nameRegex.test(nameInput.value)==true) {
        nameInput.classList.remove("is-valid")
        nameInput.classList.add("is-invalid")
    }
    if (nameInput.value == "") {
        nameInput.classList.remove("is-valid")
        nameInput.classList.remove("is-invalid")
    }
}