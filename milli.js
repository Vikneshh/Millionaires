const main=document.getElementById('main');
const addUserBtn=document.getElementById('add-user');
const doubleBtn=document.getElementById('double');
const showMillionairesBtn=document.getElementById('show-millionaires');
const sortBtn=document.getElementById('sort');
const calculateWealthBtn=document.getElementById('calculate-wealth');

// This is where the array of objects is gonna be present 
let data=[];
//Initially we want three users objects so are calling these three times.
getRandomUser();
getRandomUser();
getRandomUser();


// now we are gonna fetch random users and generate money

 async function getRandomUser(){
    const response= await fetch("https://randomuser.me/api");
    const data=await response.json();

    const user=data.results[0];
    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
    }
    // console.log(data.results[0].name.first,data.results[0].name.last)

    addData(newUser);
    
}

//doubling the money 
//reasssigning the datas
function doubleMoney(){
    data=data.map((item)=>{
        return{...item,money:item.money*2};
    })
    updateDOM();
    
}

//sorting the money

function sortMoney(){
    data=data.sort((a,b)=>b.money-a.money);

    updateDOM()
}

//showing only the  millionaires

function showMilli(){;
    data=data.filter(element => element.money>1000000);
    updateDOM();
}


//Calculating the total wealth

function calculateTotalWealth(){

    
    const wealth=data.reduce((acc,user)=>acc+=user.money,0);
    const wealthEl=document.createElement("div");
    wealthEl.innerHTML=`<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}


//add new objects to the data arrays 
function addData(obj){
    data.push(obj)
    updateDOM()
}

//Updating the dom elements

function updateDOM(providedData=data){
//We are passing the default parameters as data array 

//clearing the main division
    main.innerHTML=`<h2><strong>Person</strong>Wealth</h2>`;
    providedData.forEach((value)=>{
            const element=document.createElement("div");
            element.classList.add("person");
            element.innerHTML=`<strong>${value.name}</strong> ${formatMoney(value.money)}`;//formatting money
            main.appendChild(element);
    })
}

//formating number as money
//copied from stack overflow it is a regEx 
//please learn about regex bcoz it plays a crucial role and their methods too from programiz website
function formatMoney(number){
    return `₹` + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//event listeners

addUserBtn.addEventListener("click",getRandomUser);
doubleBtn.addEventListener("click",doubleMoney);
sortBtn.addEventListener("click",sortMoney);
showMillionairesBtn.addEventListener("click",showMilli);
calculateWealthBtn.addEventListener("click",calculateTotalWealth);