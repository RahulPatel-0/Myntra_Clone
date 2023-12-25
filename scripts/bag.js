const Convenience=99;
let bagitemobjects;
onload();
function onload() {
    loadbagitemobjects();
    displaybagitems();
    dispalybagsummary();
}

function loadbagitemobjects() {
    console.log(bagitems)
    bagitemobjects = bagitems.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i];
            }
        }
    });
    console.log(bagitemobjects)

}










function displaybagitems() {

    let containerelement = document.querySelector('.bag-items-container');


    let innerhtml = '';
    bagitemobjects.forEach(bagitem => {
        innerhtml += generateitemhtml(bagitem);

    });
    containerelement.innerHTML = innerhtml;
}



function removefrombag(itemid) {
    bagitems = bagitems.filter(bagitemid => bagitemid != itemid)
    localStorage.setItem('bagitems', JSON.stringify(bagitems))
    loadbagitemobjects();
    displaybagitems();
    displayBagIcon();
    dispalybagsummary();

}










function generateitemhtml(item) {
    return `
    <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removefrombag(${item.id})">X</div>
  </div>
    
    `
}


function dispalybagsummary() {
    let bagsummaryelement = document.querySelector('.bag-summary');
    let totalitem=bagitemobjects.length;
    let totalMRP=0;
    let totaldiscount=0;
    let finalpaymnet=0;

    bagitemobjects.forEach(bagitem=>{
        totalMRP+=bagitem.original_price;
        totaldiscount+=bagitem.original_price-bagitem.current_price;

    })
    finalpaymnet=totalMRP-totaldiscount+Convenience;

    bagsummaryelement.innerHTML = `
    <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalitem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹ ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹ ${totaldiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹ ${finalpaymnet}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
    
    `

}
