import Register from "./components/Register";
import Product from "./components/Products";
import Login from "./components/Login";
import Checkout from "./components/Checkout";

import {Switch,Route} from "react-router-dom";

export const config = {
  endpoint: `https://qkart-frontend-10h6.onrender.com/api/v1`,
};

function App() {
  return (
    <div className="App">
  
        <Switch>
            <Route  path="/register">
             <Register />
            </Route>
            <Route  path="/login">
              <Login />
            </Route>   
            <Route  path="/checkout">
             <Checkout /> 
            </Route>
            
            <Route  path="/">
             <Product /> 
            </Route>
        </Switch>
  
    </div>
  );
}

export default App;