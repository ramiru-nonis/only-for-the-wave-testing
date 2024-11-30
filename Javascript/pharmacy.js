import { Medicines } from "./Products.js";
// function to the buy button
function Buy() {
  // Set the current order in local storage
  localStorage.setItem("currentOrder", JSON.stringify(cart));
  let currentCart = JSON.parse(localStorage.getItem("currentOrder"));
  

  if (currentCart.length === 0) {
    window.alert("Your cart is empty");
  } else {
    window.location.href = "checkout.html";
  }
}

// function to reset the favourites and the cart
function restFavourites() {
  localStorage.removeItem("favourites");
  localStorage.removeItem("currentOrder");
  cart =[];
  window.alert("favourite is reseted");

  resetCart();
}

// function to reset the cart
function resetCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("currentOrder");
  
  window.alert("cart is reseted");
}


// function to save the cart to the favourites
function saveToFavourites() {
  localStorage.setItem("favourites", JSON.stringify(cart));
  window.alert("Saved to the favourites");
}

// function to apply favourites
function getFromFavourites() {
  cart = JSON.parse(localStorage.getItem("favourites"));
  updateThetable(cart);
}


// display the products using js arrays

function displayProducts(number,Container){
    const products = Medicines[number];
    products.forEach((medicine) => {
        const container = document.getElementById(Container);
        const html = `
            <div class="product-item">
                <img src=${medicine.image} alt=${medicine.name}>
                <h4>${medicine.name}</h4>
                <p>RS.${(medicine.price / 1000).toFixed(2)}</p><br>
                <input type="number" min="1" placeholder="Quantity" id="${medicine.name}">
                <button class="add-to-cart-btn" data-product-id="${
                  medicine.name
                }">Add to Cart</button>
                
            </div>
            `;
        container.innerHTML += html;
    });
};

// delete the specific items from the cart
function deleteProduct(productName,cart) {
  const index = cart.findIndex( 
    (product) => product.productname === productName
  );
  if (index > -1) {
    cart.splice(index, 1);
    window.alert(`Deleted ${productName}`);
  } else {
    console.log(`${productName} not found`);
  }
  
}
// save the cart in the local storage
function saveStorage(){
  localStorage.setItem("cart", JSON.stringify(cart));
}


// update the cart table when the page loads
function updateThetable() {
  let Total = 0;
  const tbody = document.querySelector("#product-table tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  cart.forEach((item) => {
    const itemCost = item.price * item.quantity;
    Total += itemCost;
    const row = `<tr>
                    <td>${item.productname} </td>
                    <td class="image-col"id="image-col" ><img  src=${item.image} alt=${item.productname} class="product-Img"></td>
                    <td class="quantity-col"><input type="number" min="1" value=${item.quantity} class="quantity-input" data-product-name="${item.productname}"><button class="delete-product-btn" data-product-name="${item.productname}">Delete</button></td>
                    <td>Rs.${(item.price / 1000).toFixed(2)}</td>
                    <td><p class="cost">Rs.${(itemCost / 1000).toFixed(2)}</p></td>
                </tr>`;

    tbody.innerHTML += row;
  });

  const totalPriceElement = document.getElementById("total-cost");
  const cartsummery = document.getElementById("cart");
  if (cartsummery) {
    cartsummery.innerHTML = `Cart: Rs.${(Total / 1000).toFixed(2)}`;
  }
  if (totalPriceElement) {
    totalPriceElement.innerHTML = ` Rs.${(Total / 1000).toFixed(2)}`;
  }

  // Add delete button functionality
  const deleteBtns = document.querySelectorAll(".delete-product-btn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productName = btn.dataset.productName;
      deleteProduct(productName, cart);
      saveStorage();
      updateThetable();
    });
  });

  // Add event listeners to update cost when quantity changes
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("input", () => {
      const productName = input.dataset.productName;
      const newQuantity = Number(input.value);
      const product = cart.find((p) => p.productname === productName);
      if (product) {
        product.quantity = newQuantity;
        saveStorage();
        updateThetable();  // Refresh table to show updated cost and total
      }
    });
  });
}


// main function 
function mainFunction(){

    displayProducts(0, "Analgesics");
    displayProducts(1, "Antibiotics");
    displayProducts(2, "Antidepressants");
    displayProducts(3, "Antihistamines");
    displayProducts(4, "Antihypertensives");


    const buyBtn = document.getElementById("buy");
    const addFavouritesBtn = document.getElementById("favourites");
    const restFavouritesBtn = document.getElementById("favouritesReset");
    const applyFavouritesBtn = document.getElementById("favouritesApply");
    

    

    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productName = button.dataset.productId;
        const quantityInput = document.querySelector(`#${productName}`);

        let productExists = false;

        cart.forEach((item) => {
          if (item.productname === productName) {
            if(quantityInput.value==0){
              item.quantity += 1;
              productExists = true;
            }
            else{
              item.quantity += Number(quantityInput.value);
              productExists = true;
            }
          }
        });

        if(!productExists){
            Medicines.forEach((cateogory) => {
              cateogory.forEach((meds) => {
                if (meds.name === productName) {
                  if(quantityInput.value == 0){
                    cart.push({
                      productname: meds.name,
                      image: meds.image,
                      quantity: 1,
                      price: meds.price,
                    });
                    console.log(cart);
                  }else {
                    cart.push({
                      productname: meds.name,
                      image: meds.image,
                      quantity: Number(quantityInput.value),
                      price: meds.price,
                    });
                    
                  }
                }
              });
            });
        }
        
        saveStorage();
        updateThetable();
      });

    });  

    // button add event listners
    if (addFavouritesBtn) {
      addFavouritesBtn.onclick = saveToFavourites;
    }
    if (applyFavouritesBtn) {
      applyFavouritesBtn.addEventListener("click", getFromFavourites);
    }
    if (restFavouritesBtn) {
      restFavouritesBtn.addEventListener("click", restFavourites);
    }
    if (buyBtn) {
      buyBtn.addEventListener("click", Buy);
    }
}

function adjustTableLayout() {
  const screenWidth = window.innerWidth;
  const totalLabel = document.querySelector(".total-label");

  if (screenWidth < 768) {
    // On mobile screens
    totalLabel.setAttribute("colspan", "3"); // Adjust colspan for mobile
    document
      .querySelectorAll(".image-col")
      .forEach((col) => (col.style.display = "none")); // Hide image columns
  } else {
    // On desktop screens
    totalLabel.setAttribute("colspan", "4"); // Adjust colspan for desktop
    document
      .querySelectorAll(".image-col")
      .forEach((col) => (col.style.display = "table-cell")); // Show image columns
  }
}

// Add event listeners for loading and resizing


//-----------------------Main Program------------------------------------------------------------------------
window.addEventListener("load",()=>{
  restFavourites()
  
})
let cart = JSON.parse(localStorage.getItem("cart"));
if (cart === null) {
  cart = [];
}

window.addEventListener("resize", adjustTableLayout);
window.addEventListener("load", adjustTableLayout);
mainFunction();

