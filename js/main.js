const time=document.getElementById('time'),
greeting=document.getElementById('greeting'),
name=document.getElementById('name'),
focus=document.getElementById('focus');
const degree=document.querySelector('#degree');
const tempratureDiscription=document.querySelector('#tempreature-discription');
const tempretureSection=document.querySelector('.temperature span');



function showTime(){
    let today= new Date(),
    hour=today.getHours(),
    min=today.getMinutes(),
    sec=today.getSeconds();
    time.innerHTML=`${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    setTimeout(showTime,1000);
}
function addZero(n){
    return(parseInt(n,10)<10 ? '0' : '')+n;
}
function setBgGreet(){
    let today = new Date(),
    hour=today.getHours();

    if(hour<12) {
       
        document.body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?nature,sunrise,water)";
        greeting.textContent='Good Morning';
       
    }
    else if(hour <18) {
        
        document.body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?Lion)";
        greeting.textContent='Good Afternoon';
        

    }
    else {
       document.body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?Animal";
        greeting.textContent='Good Evening';
        document.body.style.color='white';

    }
}
function setName(e){
    if(e.type==='keypress'){
        if(e.which==13 || e.keyCode==13){
            localStorage.setItem('name',e.target.innerText);
            name.blur();
        }
    
    }
    else{
       
        localStorage.setItem('name',e.target.innerText);
    }

}
function getName(){
    if(localStorage.getItem('name')===null){
        name.textContent='[Enter name]';


    }
    else{
        name.textContent=localStorage.getItem('name');
    }
}
function getFocus(){
    if(localStorage.getItem('focus')===null){
        focus.textContent='[Enter focus]';


    }
    else{
        focus.textContent=localStorage.getItem('focus');
    }
}
function setFocus(e){
    if(e.type==='keypress'){
        if(e.which==13 || e.keyCode==13){
            localStorage.setItem('focus',e.target.innerText);
            focus.blur();
        }
    
    }
    else{
       
        localStorage.setItem('focus',e.target.innerText);
    }
}
function find(){
    var val=document.getElementById("search-input").href="www.google.se";
}
window.addEventListener('load', ()=>{
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(postion =>{
            long=postion.coords.longitude;
            lat=postion.coords.latitude;

            const proxy=`https://cors-anywhere.herokuapp.com/`;

            const api=`${proxy}https://api.darksky.net/forecast/ba78308949c4dabfe106a7f4c356777b/${lat},${long}`;

            fetch(api)
                .then(data => {
                  return data.json();
               })
               .then(response => {
                    
                const {temperature, summary, icon}=response.currently;
                let celcius= (temperature-32)*(5/9);
                degree.textContent=Math.floor(celcius);
                tempratureDiscription.textContent=summary;
                
                setIcon(icon, document.querySelector(".icon"));
                
               
              tempretureSection.addEventListener('click',()=>{
              if(tempretureSection.textContent==="°F"){
                tempretureSection.textContent="°C";
                degree.textContent= Math.floor(celcius);
                

            }
             else{
               tempretureSection.textContent="°F";
               degree.textContent=temperature;
             }

    });
               })

             
       
        })
    }
    else {
        h1.textContent="Enable your location"
    }

    function setIcon (icon, iconId){
        const skycons = new Skycons({ color:"white"});
        const currentIcon=icon.replace(/-/g, "_").toUpperCase();
       skycons.play();
       return skycons.set(iconId, Skycons[currentIcon]);
    }
   
    
})


name.addEventListener('keypress',setName);
name.addEventListener('blur',setName);
focus.addEventListener('keypress',setFocus);
focus.addEventListener('blur',setFocus);
getFocus();
getName();
showTime();
setBgGreet();

