let elBox = document.getElementById("cardsBox");
let elSearch = document.getElementById("search");
let elFilter = document.getElementById("filter");
let elementsArray = [];

fetch("https://json-api.uz/api/project/fn44-amaliyot/cars")
.then((res)=>{
    return res.json();
}
).then((res)=>
{
    res.data.forEach(el=>elementsArray.push(el));
}).finally(()=>{
setTimeout(()=>document.getElementById("loader").style.display="none",5);
uiWrite(elementsArray);
});

function uiWrite(data){
data.forEach((el) => {
let elHTMLStucture = 
`<div class="card bg-base-100 w-96 lg:w-115 shadow-sm bg-[#f4f4f4] border-1 border-[#0002]">
    <figure>
        <img
        src="${el.image}"
        alt="${el.name}" class="bg-[#f1f1f1] h-[285px] w-full border-[#0001] border-b-1" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">
        ${el.name}
        </h2>
        <div>
        <p>Fuel: <span class="font-bold">${el.details.fuel}</span class="font-bold"></p>
        <p>Gearbox: <span class="font-bold">${el.details.gearbox}</span class="font-bold"></p>
        <p>Drive: <span class="font-bold">${el.drive}</span class="font-bold"></p>
        <p>Seats: <span class="font-bold">${el.details.seats}</span class="font-bold"></p>
        </div>
        <div class="card-actions justify-end">
        <div class="badge badge-outline">${el.type}</div>
        </div>
    </div>
</div>`;
setTimeout(()=>elBox.innerHTML+=elHTMLStucture,10)
});
};

function find(val){
    let arr = [];
    elementsArray.filter((el)=>{
        if(el.name.trim().toLowerCase().includes(val.trim().toLowerCase())==true) arr.push(el);
        else {    
        return false;
        }; 
    });
    uiWrite(arr);
    console.log(arr);
};

elSearch.addEventListener("input",(evt)=>{
    elBox.innerHTML=null;
    find(evt.target.value);
});

function filterCars(type){
    let arr = [];
    elementsArray.filter(el=>{
        if(type=="no") {
            arr=elementsArray;
        }
        else if(type.toLowerCase()==el.type.toLowerCase()) {return arr.push(el)};
    })
    elBox.innerHTML=null;
    uiWrite(arr)
    return arr;
}

elFilter.addEventListener("change",(evt)=>{
    filterCars(evt.target.value);
});