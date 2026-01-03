let elStatus = document.getElementById("status");
let elBox = document.getElementById("cardsBox");
let elErrorBox = document.getElementById("errorBox");
let elSearch = document.getElementById("search");
let elFilter = document.getElementById("filter");
let elementsArray = [];

fetch("https://json-api.uz/api/project/fn44-amaliyot/cars")
.then((res)=>{
if(res.status > 99 && res.status < 200) {
    elStatus.style.backgroundColor="#ffee00ff";
} else if(res.status > 199 && res.status < 300) { 
    elStatus.style.backgroundColor="#00ff00";
} else if(res.status > 299 && res.status < 400) { 
    elStatus.style.backgroundColor="#0088ffff";
} else if(res.status > 399 && res.status < 500) { 
    elStatus.style.backgroundColor="#ff0000ff";
} else if(res.status > 499 && res.status < 600) { 
    elStatus.style.backgroundColor="#ff6f00ff";
}
    return res.json();
}
)
.then((res)=>
{
res.data.forEach(el=>elementsArray.push(el));
return res;
})
.catch((res)=>
{
console.log(res.json());
})
.finally(()=>{
setTimeout(()=>document.getElementById("loader").style.display="none",500);
setTimeout(() => {uiWrite(elementsArray);}, 1200);});

function uiWrite(arr) {
elBox.innerHTML='';
if(arr!='') {
elBox.style.display="flex";
elErrorBox.style.display="none";
arr.forEach((el)=>{
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
elBox.innerHTML+=elHTMLStucture;
});
}
else if(arr=='') {
    elBox.style.display="none";
    elErrorBox.style.display="flex";
}

};

function uiFindWrite(val) {
    let arr = [];
    elementsArray.filter((el)=>{
        if(el.name.toLowerCase().includes(val.trim().toLowerCase())==true) return arr.push(el);
    });
    uiWrite(arr);
};

elSearch.addEventListener("input",(evt)=>{
    uiFindWrite(evt.target.value);
})

function uiFilteredWrite(val) {
    let arr = [];
    elementsArray.filter((el)=>{
        if(el.type.toLowerCase()==val.toLowerCase()) return arr.push(el);
    });
    uiWrite(arr);
    if(val.toLowerCase()=="no") {
        uiWrite(elementsArray);
    };
}

elFilter.addEventListener("change",(evt)=>{
    uiFilteredWrite(evt.target.value);
});

window.addEventListener("scroll",()=>{
    let str = "bg-white border-1 border-[#ddd] fixed z-2 top-0 py-4 pb-6 px-10 rounded-[0px_0px_40px_40px] shadow-sm"
    str=str.split(" ")
    if(window.scrollY>220) {
        str.forEach(el=>document.getElementById("filterBox").classList.add(el));
    } else {
        str.forEach(el=>document.getElementById("filterBox").classList.remove(el));
    };
});
