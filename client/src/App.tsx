import { Login } from "./pages/login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Form } from "./pages/Form";

import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/form" element={<Form />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
