class Contact{
  constructor({name,experience,contact}){
    this.name = name;
    this.experience = typeof experience == "object" ? experience: "desempleado";
    this.contact = typeof contact == "object" ? contact: "no tiene redes sociales";
    
  }
}

const profileContainer = document.querySelector(".profile-container");



//crear base de datos indexdb
function createIndexDB(){
  const indexDB = indexedDB.open("myDataBase",1);
  indexDB.addEventListener("upgradeneeded",()=>{
    const db = indexDB.result;
    db.createObjectStore("people",{autoIncrement:true});
    db.addEventListener(
      "success",()=>{
        console.log("Database created successfully");
      })
  });
}


function openIndexDB(db, format){
  const IDBtransaction = db.transaction("people", format);
  const objectStore = IDBtransaction.objectStore("people");
  return {IDBtransaction,objectStore}
}

function functionCursor(store){
  const request = store.openCursor();
  return new Promise((res,rej)=>{
    let data = [];
    request.addEventListener("success",event=>{
      const cursor = event.target.result;
      if (cursor){
        const {key,value} = cursor;
        data.push(value);
        cursor.continue()
      } 
      else {
        res(data)
      }
    })
  })
  
}

function addData(data){
  const indexDB = indexedDB.open("myDataBase",1);
  indexDB.addEventListener("success",()=>{
  const {IDBTransaction, objectStore}  = openIndexDB(indexDB.result,"readwrite")
  const request = objectStore.add(data);
    request.addEventListener("success",()=>{
      console.log(`${data.name} agregado exitosamente`);
    });
  });
}



function readData(){
  const indexDB = indexedDB.open("myDataBase",1);
  indexDB.addEventListener("success",async()=>{
    const {objectStore, IDBTransaction} = openIndexDB(indexDB.result,"readonly")
    let data = await functionCursor(objectStore)
    console.log(data)
})}

function deleteData(id){
  const indexDB = indexedDB.open("myDataBase",1);
  indexDB.addEventListener("success",()=>{
   const {IDBTransaction, objectStore} = openIndexDB(indexDB.result,"readwrite")
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