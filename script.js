class Contact{
  constructor({name,experience,contact}){
    this.name = name;
    this.experience = typeof experience == "object" ? experience: "desempleado";
    this.contact = typeof contact == "object" ? contact: "no tiene redes sociales";
    
  }
}

const profileContainer = document.querySelector(".profile-container");

function createProfile({name,experience,img,contact},id){
  const article = document.createElement("article");
  const h2 = document.createElement("h2");
  const button = document.createElement("button");
  const profileContainer = document.createElement("DIV");
  const profileResume = document.createElement("ul");
  const imgContainer = document.createElement("img");
  const footer = document.createElement("footer");
  const footerTittle = document.createElement("h3");
  const footerContact = document.createElement("ul");
  const buttonIcon = document.createElement("i");
  article.setAttribute("data",id);
  [h2,button,profileContainer,footer].forEach(child=> article.appendChild(child));
  [profileResume,imgContainer].forEach(child=> profileContainer.appendChild(child));
  [footerTittle,footerContact].forEach(child=> footer.appendChild(child));

  h2.textContent = name;
  Object.entries(experience).forEach(([key,value])=> {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`
    profileResume.appendChild(li)
  });
  Object.entries(contact).forEach(([social,url])=>{
    const li = document.createElement("li");
    const a = document.createElement("a");
    const span = document.createElement("span");
    const i = document.createElement("i");
    i.className =`fa-brands fa-${social.toLowerCase().split(" ").join("-")}`;
    span.textContent = social;
    span.appendChild(i);
    a.href = url;
    li.appendChild(a);
    a.appendChild(span);
    footerContact.appendChild(li);
  });
    imgContainer.src = img;
    article.classList.add("profile");
    h2.classList.add("profile__name");
    button.classList.add("profile__delete");
    profileContainer.classList.add("profile__body");
    profileResume.classList.add("profile__resume");
    imgContainer.classList.add("profile__pic");
    footer.classList.add("profile__contact");
    footerTittle.classList.add("profile__contact__tittle");
    footerContact.classList.add("profile__rrss");
    buttonIcon.classList.add("fa-solid","fa-trash");
    button.appendChild(buttonIcon);
    button.addEventListener("click",function(){
      article.remove();
      deleteData(article.data);
      readData();
    
    });
    return article
}


//crear base de datos indexdb
function createIndexDB(){
  const indexDB = indexedDB.open("myDataBase",1);
  indexDB.addEventListener("upgradeneeded",()=>{
    const db = indexDB.result;
    db.createObjectStore("people",{autoIncrement:true});
    db.addEventListener(
      "success",()=>{
        console.log("Database created successfully");
      },false)
  });
  
}

function addData(data){
  const indexDB = indexedDB.open("myDataBase",1);
  indexDB.addEventListener("success",()=>{
    const db = indexDB.result;
    const transaction = db.transaction("people", "readwrite");
    const objectStore = transaction.objectStore("people");
    const request = objectStore.add(data);
    request.addEventListener("success",()=>{
      console.log(`${data.name} agregado exitosamente`);
    },false);
  },false);
}

function readData(){
  const indexDB = indexedDB.open("myDataBase",1);
  indexDB.addEventListener("success",()=>{
    const db = indexDB.result;
    const transaction = db.transaction("people", "readonly");
    const objectStore = transaction.objectStore("people");
    const request = objectStore.openCursor();
    request.addEventListener("success",(event)=>{
        const cursor = event.target.result;
        if (cursor){
        const {key,value} = cursor
        profileContainer.appendChild(createProfile(value,key));
        cursor.continue();
        }
    },false);
  },false);
}

function deleteData(id){
  const indexDB = indexedDB.open("myDataBase",1);
  indexDB.addEventListener("success",()=>{
    const db = indexDB.result;
    const transaction = db.transaction("people", "readwrite");
    const objectStore = transaction.objectStore("people");
    objectStore.delete(id)
})}

/*addData(new Contact({name:"Juan",experience:{
  "2010-2012" : "Base de datos",
  "2012-2015" : "Marketing",
  "2015-2020" : "Desarrollo web"
},contact:{"x-twitter":"@juan",facebook:"@juan",instagram:"@juan"}}))*/


createIndexDB();
/*[
  new Contact({name:"Alice",experience:{"2010-2012":"Frontend Development","2012-2015":"UI/UX Design","2015-2020":"Full Stack Development"},contact:{"x-twitter":"@alice",facebook:"@alice",instagram:"@alice"}}),
    new Contact({name:"Bob",experience:{"2010-2012":"Mobile App Development","2012-2015":"Database Management","2015-2020":"DevOps"},contact:{"x-twitter":"@bob",facebook:"@bob",instagram:"@bob"}}),
    new Contact({name:"Carol",experience:{"2010-2012":"Data Analysis","2012-2015":"Machine Learning","2015-2020":"Artificial Intelligence"},contact:{"x-twitter":"@carol",facebook:"@carol",instagram:"@carol"}}),
    new Contact({name:"Dave",experience:{"2010-2012":"Network Security","2012-2015":"Cloud Computing","2015-2020":"Blockchain"},contact:{"x-twitter":"@dave",facebook:"@dave",instagram:"@dave"}}),
  new Contact({name:"Eva",experience:{"2010-2012":"Frontend Development","2015-2018":"UI/UX Design"},contact:{"x-twitter":"@eva","facebook":"@eva","instagram":"@eva","youtube":"Eva", "tiktok":"@eva"}}),
  new Contact({name:"Frank",experience:{"2015-2020":"Full Stack Development"},contact:{"x-twitter":"@frank","facebook":"@frank","instagram":"@frank","youtube":"Frank", "tiktok":"@frank"}}),
  new Contact({name:"Grace",experience:{"2008-2011":"Data Analysis","2012-2016":"Machine Learning","2017-2020":"Artificial Intelligence"},contact:{"x-twitter":"@grace","facebook":"@grace","instagram":"@grace","youtube":"Grace", "tiktok":"@grace"}}),
  new Contact({name:"Henry",experience:{"2016-2018":"Mobile App Development","2019-2020":"DevOps"},contact:{"x-twitter":"@henry","facebook":"@henry","instagram":"@henry","youtube":"Henry", "tiktok":"@henry"}}),
  new Contact({name:"Isabella",experience:{"2012-2014":"Network Security","2016-2019":"Cloud Computing","2020":"Blockchain"},contact:{"x-twitter":"@isabella","facebook":"@isabella","instagram":"@isabella","youtube":"Isabella", "tiktok":"@isabella"}})
].forEach(profile=> addData(profile));*/


readData()