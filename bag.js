let bagitemobjects=[];
function onLoad(){
    loadBagItemObjects();
    displayBagItems();
    totalPrice();
}
function loadBagItemObjects(){
    bagitemobjects=bagitems.map((itemId)=>{
        for(let i=0;i<items.length;i++){
            if(itemId== items[i].id){
                return items[i];
            }
        }
    })
    console.log(bagitemobjects)
}
function displayBagItems(){
    let bagitemscontainer=document.querySelector('.bag-items-container')
    bagitemscontainer.innerHTML=''
     bagitemobjects.forEach((item)=>{
        bagitemscontainer.innerHTML+=generateItemHtml(item)
     })

}
function removeFromBag(itemid){
   bagitems= bagitems.filter((bagitemid)=>{
        return bagitemid != itemid;
    })
    displayBagIcon()
    localStorage.setItem('bagitems',JSON.stringify(bagitems))
    loadBagItemObjects();
    displayBagItems();
    totalPrice();
}
function generateItemHtml(item){
   return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">${item.current_price}</span>
        <span class="original-price">${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period}</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>
    

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
    </div>`
}
function totalPrice(){
    let totalmrp=0
    let totaldiscount=0
    let finalpayment=0
    bagitemobjects.forEach((item)=>{
        totalmrp+=item.original_price
        totaldiscount+=(item.original_price*item.discount_percentage)/100;
        
    })
    finalpayment=totalmrp-totaldiscount;

    let bagsummaryelement=document.querySelector('.bag-summary');
    bagsummaryelement.innerHTML=`<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${bagitemobjects.length} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs${totalmrp}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs${totaldiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${finalpayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`
}
onLoad();


