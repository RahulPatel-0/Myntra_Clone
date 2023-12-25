let bagitems;
onload()


function onload(){
   let bagitemstr=localStorage.getItem('bagitems');
   bagitems=bagitemstr?JSON.parse(bagitemstr):[];
    displayitemsonhomepage();
    displayBagIcon();

}

function addToBag(itemid){
    bagitems.push(itemid)
    localStorage.setItem('bagitems',JSON.stringify(bagitems));
    displayBagIcon();

}
function displayitemsonhomepage(){
    let itemcontainer=document.querySelector('.items-container');
    if (!itemcontainer){
        return;
    }
    let innerHTML='';
    items.forEach(item=>{
        innerHTML+=`
        <div class="item-container">
            <img class="item-image" src="${item.image}" alt="item image">
            <div class="rating">
                ${item.rating.stars} ⭐|${item.rating.count}
            </div>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discunt">(${item.discount_percentage}% off)</span>
            </div>'
            <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
        </div>
        `
    });
    
    itemcontainer.innerHTML=innerHTML;
}

function displayBagIcon(){
    let bagitemcountelement=document.querySelector('.bag-item-count')
    if(bagitems.length>0){
        bagitemcountelement.style.visibility='visible';
        bagitemcountelement.innerText=bagitems.length
    }
    else{
        bagitemcountelement.style.visibility='hidden';
    }
    


}













