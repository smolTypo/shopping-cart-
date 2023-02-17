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

// list out the Cart items in another column
function NavBar({ menuitems }) {
  const { Card, Button } = ReactBootstrap;
  // create state for stock and cart using React.useState
  const [stock, setStock] = React.useState(menuitems); // stock initialized with menuitems
  const [cart, setCart] = React.useState([]);
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
    // update the stock state to include the new stock
    setStock([...newStock]);
    // update the cart state to include the updated item
    setCart([...cart, ...item]);  
    console.log(`Cart: ${JSON.stringify(cart)}`);
  };
  const updatedList = menuitems.map((item, index) => {
    return (
      <Button key={index} onClick={moveToCart}>
        {item.name}:{item.instock}
      </Button>
    );
  });
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
