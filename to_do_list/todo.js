function updateProgress() {
  let checkboxes=document.querySelectorAll(`.task-list input[type="checkbox"]`);
  let total = checkboxes.length;
  let checked=0;
  checkboxes.forEach(cb=> {
    if(cb.checked)
       checked++;
  });
  let progressPercent = total >0?(checked/total)*100:0;
  document.getElementById("progress").style.width=progressPercent+"%";
    document.getElementById("numbers").textContent=`${checked}/${total}`;
}
const body=document.querySelector(`body`);
const form=document.querySelector(`form`);
const ul=document.querySelector(`.task-list`);
const inp=document.querySelector(`input`);
const addbtn=document.querySelector(`.newTask`);
const mode=document.querySelector(`.mode`);


mode.addEventListener(`click`,()=>{
  body.classList.toggle(`blue`);
  body.classList.toggle(`pink`);
});


form.addEventListener(`submit`, function(evt){
     evt.preventDefault();
     let li=document.createElement(`li`);
     li.classList.add(`list_items`);
     li.innerText=inp.value;

      let box =document.createElement(`input`);
      box.setAttribute(`type`,`checkbox`);
      box.setAttribute(`name`,`todo`);
      box.setAttribute(`value`,li.innerText);

     box.addEventListener(`change`,function (){
        updateProgress();
        if(box.checked) {
          li.classList.add(`completed`);
        } else {
          li.classList.remove(`completed`);
        }
      });
     let icon=document.createElement(`span`);
     let delbtn=document.createElement(`i`);
     let editbtn=document.createElement(`i`);

     delbtn.className=`fa-solid fa-trash-can`;
    editbtn.className=`fa-solid fa-pen-to-square`;

    icon.classList.add(`icon`);
    delbtn.classList.add(`delete`);
    editbtn.classList.add(`edit`);

    delbtn.style.color=`red`;
    editbtn.style.color=`blue`;

    ul.appendChild(li);
    li.prepend(box);
    li.appendChild(icon);
    icon.appendChild(editbtn);
    icon.appendChild(delbtn);
    inp.value=``;
    updateProgress();

  //delete functionality
      let del=document.querySelectorAll(`.delete`);
      for(el of del) {
      let par=el.parentElement.lastChild;
      par.addEventListener(`click`,()=> {
      par.parentElement.parentElement.remove();
      updateProgress();
        });
         }

 //edit functionality
     let edit=document.querySelectorAll(`.edit`);
     let par=el.parentElement.firstChild;
          par.addEventListener(`click`,()=> {   
             let update = inp.value=par.parentElement.parentElement.innerText;
            par.parentElement.parentElement.remove();
              });
     
           });
           updateProgress();