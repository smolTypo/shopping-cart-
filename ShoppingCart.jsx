// write out all items with their stock number
// provide a button and use onClick to move 1 item into the Shopping Cart
// use React.useState to keep track of items in the Cart

// the shopping cart component contains two sections:
// Stock: this is a list of the avail. products that can be added to cart
// Shopping Cart: this is a list of products that have been added to the cart

// users can click any product in the Stock list, and if that product is in stock, it will be added to the cart

// visually, the desired state of this application is having a row of buttons 
// that display the available stock and another row of buttons that display what 
// items are in your cart. You click the buttons of available stock to add the items to your cart.

// React.useState is used to store and update the items in the cart, the total price of the items in the cart, 
// and any other data related to the shopping cart. It can also be used to trigger UI updates when the state 
// is changed, such as updating the cart display when items are added or removed.

// list out the Cart items in another column
function NavBar({ menuitems }) {
  const { Card, Button } = ReactBootstrap;
  
  // create state for stock and cart using React.useState
  // The following codes use React Hooks to create a state variable called stock and a function called setStock. 
  // The initial value of the stock variable is set to the value of the menuitems variable, 
  // which is an array of items in the menu. The setStock function can be used to update the value of the stock variable. 
  
  const [stock, setStock] = React.useState(menuitems); // stock initialized with menuitems
  
  // The following codes use uses React Hooks to create a state variable called cart and a function called setCart.
  // The initial value of the cart variable is set to an empty array. The setCart function can be used to update 
  // the value of the cart variable, allowing developers to add and remove items from the cart. 
  // This is useful for tracking which items are in the user's shopping cart.
  
  const [cart, setCart] = React.useState([]);
  
  
  // The following codes is a function that is used to move an item from the stock to the cart when the user clicks on it. 
  // The function takes an event object as an argument and extracts the item name and quantity from the innerHTML of the clicked element. 
  // It then uses the stock variable to filter out the item that was clicked. 
  // The item is then added to the cart using the setCart function, and the stock is updated to reflect the new item quantity using the setStock function. 
  // This function allows users to easily add items to their cart.
  
  // create product and num variables
  const moveToCart = (e) => { // moveToCart function triggered everytime a product is clicked
    let [name, num] = e.target.innerHTML.split(":");
    if (num <= 0) return; // zero items in stock
    // get item with name from stock and update stock
    let item = stock.filter((item) => item.name == name);
    // check if its in stock ie item instock > 0
    let newStock = stock.map((item) => {
      if (item.name == name) {
        item.instock--;
      }
      return item;
    });
    
    // now filter out stock items == 0;
  
    // The following codes on line 65 uses the spread operator to create a new array from the newStock variable 
    // and then uses the setStock function to update the stock state variable with the new array. This allows developers 
    // to update the stock state variable whenever necessary, such as when an item is added or removed from the cart.
    
    // update the stock state to include the new stock
    setStock([...newStock]);
    
    // This codes below on line 72 uses the spread operator to create a new array from the cart and item variables and 
    // then uses the setCart function to update the cart state variable with the new array. This allows developers to add
    // an item to the cart by updating the cart state variable.
    
    // update the cart state to include the updated item
    setCart([...cart, ...item]);  
    console.log(`Cart: ${JSON.stringify(cart)}`);
  };
  
  // The following section of codes is used to create a list of menu items that can be added to the cart. It uses the map method 
  // to loop through the menuitems array and returns a Button element for each item in the array. The Button element has an onClick event handler 
  // that calls the moveToCart function when it is clicked. The innerHTML of the Button element is set to the item name and its stock quantity, 
  // allowing the user to see how many items are in stock.
  
  const updatedList = menuitems.map((item, index) => {
    return (
      <Button key={index} onClick={moveToCart}>
        {item.name}:{item.instock}
      </Button>
    );
  });

  // The following blocks of codes are used to render the shopping cart application. It returns a React Fragment containing a list of menu items, 
  // a heading, and a Cart component. The list of menu items is created using the updatedList variable which contains the Button elements for 
  // each menu item. The Cart component is passed the cart state variable as a prop, which allows it to display the items in the user's cart.
  // note that React needs to have a single Parent element, so used < >

  return (
    <>
      <ul key="stock" style={{ listStyleType: "none" }}>
        {updatedList}
      </ul>
      <h1>Shopping Cart</h1>
      <Cart cartitems={cart}> Cart Items</Cart>
    </>
  );
}

// The following function is a React component that is used to render the items in the user's cart. It takes a cartitems prop which contains the 
// items in the user's cart. It uses the map method to loop through the cartitems array and returns a Button element for each item in the array. 
// The Button element has the name of the item as its innerHTML, allowing the user to see which items are in their cart. 
// The component then returns a list containing the Button elements.

function Cart({ cartitems }) {
  const { Card, Button } = ReactBootstrap;
  console.log("rendering Cart");
  const updatedList = cartitems.map((item, index) => {
    return <Button key={index}>{item.name}</Button>;
  });
  return (
    <ul style={{ listStyleType: "none" }} key="cart">
      {updatedList}
    </ul>
  );
}

const menuItems = [
  { name: "apple", instock: 2 },
  { name: "pineapple", instock: 3 },
  { name: "pear", instock: 0 },
  { name: "peach", instock: 3 },
  { name: "orange", instock: 1 },
];
ReactDOM.render(
  <NavBar menuitems={menuItems} />,
  document.getElementById("root")
);
