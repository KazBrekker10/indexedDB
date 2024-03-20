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
  