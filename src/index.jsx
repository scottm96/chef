//import the the create root function from react-dom/client and the App component

import { createRoot } from "react-dom/client";
import App from "./App";

//create a root variable and for the div with id 'root' in the html document and render the variable with the render functioon with the App component
const root = createRoot(document.getElementById("root"))
root.render(
  <App />
) 
