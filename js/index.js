var bookmarkName =document.getElementById("bookmarkName")
var bookmarkUrl =document.getElementById("bookmarkUrl")
var boxModel =document.querySelector(".box-info")
var closeBtn = document.getElementById("close-btn")
var bookmarkContainer =[]
if(localStorage.getItem('bookmarkes')!=null){
    bookmarkContainer =JSON.parse(localStorage.getItem('bookmarkes')) 
    display()
}
function addSite (){
    if(valid(/^[-'a-zA-ZÀ-ÖØ-öø-ſ1-9]+$/,bookmarkName)==true,
    valid(/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,bookmarkUrl)==true){
        var site ={
            name:bookmarkName.value,
            url:bookmarkUrl.value
        }
        bookmarkContainer.push(site) 
        localStorage.setItem("bookmarkes",JSON.stringify(bookmarkContainer))
        display ()
        clearForm ()
    }else
    {
    boxModel.classList.replace("d-none","d-flex")
    }
}
function display (){
    var temp = ``
    for(i=0;i<bookmarkContainer.length;i++){
        temp+=`<tr>
        <td>${i+1}</td>
        <td>${bookmarkContainer[i].name}</td>
        <td><button class="btn btn-danger" onclick="visit(${i})" ><i class="fa-solid fa-eye me-2"></i>Visit</button></td>
        <td><button class="btn btn-primary" onclick="deleteSite(${i})"><i class="fa-solid fa-trash me-2
        "></i>delete</button></td>
      </tr>`
    }
    document.getElementById("myData").innerHTML=temp
}
function deleteSite (index){
    bookmarkContainer.splice(index,1)
    localStorage.setItem("bookmarkes",JSON.stringify(bookmarkContainer))
    display ()
}
function visit(index) {
    var regexUrl = /^(ftp|http|https):\/\/[^ "]+/
    if(regexUrl.test(bookmarkContainer[index].url)==true){
        open(bookmarkContainer[index].url);
    }else{
        open(`https"//${bookmarkContainer[index].url}`)

    }
}
bookmarkName.addEventListener('blur',function(){
    var regexName = /^[-'a-zA-ZÀ-ÖØ-öø-ſ1-9]+$/
    valid(regexName,bookmarkName)
})
bookmarkUrl.addEventListener('blur',function(){
    var regexUrl = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
    valid(regexUrl,bookmarkUrl)
})
function valid(regex,inputEl){
    if(regex.test(inputEl.value)==true){
      inputEl.classList.add("is-valid")
      inputEl.classList.remove("is-invalid")
      return true
    }else{
      inputEl.classList.add("is-invalid")
      inputEl.classList.remove("is-valid")
       return false
    }
  }
  function closeModel (){
    boxModel.classList.add("d-none")
  }
closeBtn.addEventListener("click",closeModel)
 
document.addEventListener("keydown",function(e){
    if(e.key == "Escape"){
        closeModel()
    }
})
document.addEventListener("click",function(e){
    if(e.target.classList.contains("box-info")){
        closeModel()
    }
})
function clearForm (){
    bookmarkName.value=""
    bookmarkUrl.value=""
}