let elStatus = document.getElementById("status");
let elBox = document.getElementById("cardsBox");
let elErrorBox = document.getElementById("errorBox");
let elSearch = document.getElementById("search");
let elFilter = document.getElementById("filter");
let elementsArray = [];

window.addEventListener("load",()=>{
    setTimeout(() => {    
        document.getElementById("loaderMain").style.transform="translateY(-100%)";
    }, 500);
});

fetch("https://json-api.uz/api/project/fn44-amaliyot/cars")
.then((res)=>{
    statusAPI(res.status)
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
    console.log(res);
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
<h2 class="text-[20px] card-title">
${el.name}
</h2>
<div class="text-[15px]">
<p>Fuel:    <span class="font-[550]">${el.details.fuel}</span></p>
<p>Gearbox: <span class="font-[550]">${el.details.gearbox}</span></p>
<p>Drive:   <span class="font-[550]">${el.drive}</span></p>
<p>Seats:   <span class="font-[550]">${el.details.seats}</span></p>
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

function statusAPI(sc) {
if(sc > 99 && sc < 200) {
    elStatus.style.backgroundColor="#ffee00ff";
    elFilter.style.pointerEvents="none";
    document.getElementById("searchLab").style.pointerEvents="none";
    document.getElementById("scTitle").innerHTML=
    `${sc}
    `;
} else if(sc > 199 && sc < 300) { 
    elStatus.style.backgroundColor="#00ff00";
} else if(sc > 299 && sc < 400) { 
    elStatus.style.backgroundColor="#0088ffff";
    elFilter.style.pointerEvents="none";
    document.getElementById("searchLab").style.pointerEvents="none";
    document.getElementById("scTitle").innerHTML=
    `${sc}
    `;
} else if(sc > 399 && sc < 500) { 
    elStatus.style.backgroundColor="#ff0000ff";
    elFilter.style.pointerEvents="none";
    document.getElementById("searchLab").style.pointerEvents="none";
    document.getElementById("scTitle").innerHTML=
    `${sc}
    `;
} else if(sc > 499 && sc < 600) { 
    elStatus.style.backgroundColor="#ff6f00ff";
    elFilter.style.pointerEvents="none";
    document.getElementById("searchLab").style.pointerEvents="none";
    document.getElementById("scTitle").innerHTML=
    `${sc}
    `;
}
}