// login credentials
let username = "cashier1";
let password = "password123";

// Grocery items grouped by category with their prices
let items = {
  fruits: { apple: 22, banana: 22, orange: 32, mango: 42, grapes: 52 },
  drinks: { water: 12, soda: 22, juice: 12, coffee: 12, tea: 22 },
  hygienes: { soap: 22, shampoo: 12, toothpaste: 32, deodorant: 42, lotion: 62 },
  sweets: { chocolate: 132, candy: 2, cookie: 12, cake: 272, icecream: 62 }
};

// Shopping cart (stores selected items)
let cart = {};

// Function to handle user login
function login() {
  let user = prompt("Enter username:");
  let pass = prompt("Enter password:");

  // Check if the entered credentials match the predefined ones
  if (user === username && pass === password) {
    alert("Login successful. Welcome, " + user + "!");
    mainMenu(); // Go to main menu if login is successful
  } else {
    alert("Invalid username or password.");
    login(); // Retry login if credentials are wrong
  }
}

// Function to show the main menu using switch-case
function mainMenu() {
  let choice = prompt(
    "MAIN MENU:\n" +
    "1. Add Item\n" +
    "2. View Cart\n" +
    "3. Remove Item\n" +
    "4. Checkout\n" +
    "5. Logout\n" +
    "Enter choice (1-5):"
  );

  // Use switch to execute selected menu option
  switch (choice) {
    case "1":
      addItem(); // Add item to cart
      break;
    case "2":
      viewCart(); // Display cart items
      break;
    case "3":
      removeItem(); // Remove item from cart
      break;
    case "4":
      checkout(); // Finalize and pay
      break;
    case "5":
      logout(); // Log out and restart login
      return;
    default:
      alert("Invalid choice. Try again.");
  }

  mainMenu(); // Show menu again after action
}

// Function to add an item to the cart
function addItem() {
  let categories = Object.keys(items); // Get list of categories
  let categoryText = "";

  // Show numbered category options
  for (let i = 0; i < categories.length; i++) {
    categoryText += (i + 1) + ". " + categories[i] + "\n";
  }

  // Ask user to select a category
  let catChoice = parseInt(prompt("Select Category:\n" + categoryText));

  if (!isNaN(catChoice) && catChoice >= 1 && catChoice <= categories.length) {
    // proceed with valid input
  } else {
    alert("Invalid category.");
    return;
  }

  let selectedCategory = categories[catChoice - 1];
  let productNames = Object.keys(items[selectedCategory]); // Get item names in selected category

  let productText = "";

  // Show numbered items in the selected category with their prices
  for (let i = 0; i < productNames.length; i++) {
    let itemName = productNames[i];
    let price = items[selectedCategory][itemName];
    productText += (i + 1) + ". " + itemName + " - â±" + price + "\n";
  }

  // Ask user to choose item
  let itemChoice = parseInt(prompt("Select Item:\n" + productText));
  if (!( !isNaN(itemChoice) && itemChoice >= 1 && itemChoice <= productNames.length )) {
    alert("Invalid item.");
    return;
  }

  // Get selected item name and price
  let itemName = productNames[itemChoice - 1];
  let price = items[selectedCategory][itemName];

  // Ask how many units to add
  let quantity = parseInt(prompt("Enter quantity:"));
  if (isNaN(quantity) || quantity <= 0) {
  alert("Invalid quantity.");
  return;
}

  // Add to cart or update quantity if already exists
  if (cart[itemName]) {
    cart[itemName].quantity += quantity;
  } else {
    cart[itemName] = { price: price, quantity: quantity };
  }

  alert(quantity + " x " + itemName + " added to cart.");
}

// Function to display all items in the cart
function viewCart() {
  let message = "CART :\n";
  let hasItems = false;

  // Loop through cart and show each item
  for (let item in cart) {
    let info = cart[item];
    message += item + ": " + info.quantity + " x â±" + info.price + " = â±" + (info.quantity * info.price) + "\n";
    hasItems = true;
  }

  // Show cart or say it's empty
  if (!hasItems) {
    alert("Your cart is empty.");
  } else {
    alert(message);
  }
}

// Updated function to remove one or more items from the cart
function removeItem() {
  let itemsInCart = Object.keys(cart);

  if (itemsInCart.length === 0) {
    alert("Cart is empty.");
    return;
  }

  // Ask how many items the user wants to remove
  let howMany = parseInt(prompt("How many items do you want to remove? (Max " + itemsInCart.length + ")"));
  if (isNaN(howMany) || howMany < 1 || howMany > itemsInCart.length) {
    alert("Invalid number.");
    return;
  }

  for (let i = 0; i < howMany; i++) {
    // Refresh the list of items because cart may change during removal
    itemsInCart = Object.keys(cart);
    if (itemsInCart.length === 0) {
      alert("Cart is empty now.");
      return;
    }

    let itemList = "";
    for (let j = 0; j < itemsInCart.length; j++) {
      itemList += (j + 1) + ". " + itemsInCart[j] + " (Qty: " + cart[itemsInCart[j]].quantity + ")\n";
    }

    let choice = parseInt(prompt("Select item to remove (" + (i + 1) + " of " + howMany + "):\n" + itemList));
    if (isNaN(choice) || choice < 1 || choice > itemsInCart.length) {
      alert("Invalid choice.");
      i--; // retry current iteration
      continue;
    }

    let itemName = itemsInCart[choice - 1];
    delete cart[itemName];
    alert(itemName + " removed from cart.");
  }
}

// Function to handle checkout and payment
function checkout() {
  let keys = Object.keys(cart);
  if (keys.length === 0) {
    alert("Cart is empty.");
    return;
  }

  let receipt = "RECEIPT:\n";
  let total = 0;

  // List all items with total amount
  for (let item in cart) {
    let info = cart[item];
    let lineTotal = info.price * info.quantity;
    receipt += item + " - " + info.quantity + " x â±" + info.price + " = â±" + lineTotal + "\n";
    total += lineTotal;
  }

  receipt += "TOTAL: â±" + total;
  alert(receipt); // Show receipt

  // Ask for payment
  let payment = parseFloat(prompt("Enter payment amount (â±" + total + "):"));
  if (isNaN(payment) || payment < total) {
    alert("Payment not enough.");
    return;
  }

  // Show change and clear cart
  let change = payment - total;
  alert("Payment accepted. Change: â±" + change);
  cart = {};
}

// Function to log out and return to login screen
function logout() {
  cart = {}; // Clear cart
  alert("You are now logged out.");
  login(); // Start login again
}

// Start the program by asking for login
login();