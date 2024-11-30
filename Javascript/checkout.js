// function to update the table with the products
function updateTheTable(cart) {
  

  let total = 0;
  const tbody = document.querySelector("#product-table tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  cart.forEach((item) => {
    const itemCost = item.price * item.quantity;
    total += itemCost;
    const row = `<tr>
                        <td>${item.productname}</td>
                        <td class="cost" id="image-col"><img src="${
                          item.image
                        }" alt="${item.productname}" class="product-Img"></td>
                        <td>${item.quantity}</td>
                        <td class="cost" >Rs.${(item.price / 1000).toFixed(
                          2
                        )}</td>
                        <td><p >Rs.${(itemCost / 1000).toFixed(2)}</p></td>
                    </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });

  const totalPriceElement = document.getElementById("total-cost");
  const cartSummary = document.getElementById("total-price");
  const formattedTotal = `Rs.${(total / 1000).toFixed(2)}`;

  if (cartSummary) {
    cartSummary.innerHTML = formattedTotal;
  }
  if (totalPriceElement) {
    totalPriceElement.innerHTML = formattedTotal;
  }
}


// function to check the form validity and proceed the payments and the dates
function pay() {
  const form = document.getElementById("checkout-form");
  if (form.checkValidity()) {
    alert(
      "Thank you for your purchase! Your delivery date is " +
        new Date(new Date().setDate(new Date().getDate() + 3)).toDateString()
    );
  } else {
    alert("Please fill out all fields correctly.");
  }
}
function adjustTableLayout() {
  const screenWidth = window.innerWidth;
  const totalLabel = document.querySelector(".total-label");

  if (screenWidth < 768) {
    // On mobile screens
    totalLabel.setAttribute("colspan", "2"); // Adjust colspan for mobile
    document
      .querySelectorAll(".cost")
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


//-----------------------------main programm-----------------------------------------------------------------------
const cart = JSON.parse(localStorage.getItem("currentOrder")) || [];
updateTheTable(cart);
window.addEventListener("resize", adjustTableLayout);
window.addEventListener("load", adjustTableLayout);


document.getElementById("checkout").addEventListener("click",pay);
document.getElementById(
  "Delivery"
).textContent = `Estimated Delivery :${new Date(new Date().setDate(new Date().getDate() + 3)).toDateString()}`;