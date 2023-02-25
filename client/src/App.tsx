import { Login } from "./pages/login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Form } from "./pages/Form";
import { Accout } from "./pages/Accout";
import { useContext } from "react";
import { UserContext } from "./context/AuthContext"
import { BrowserRouter,Routes,Route, Navigate, useParams } from "react-router-dom";
import { Blog } from "./pages/Blog";

function App() {
  const context = useContext(UserContext)
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!context.user ? <Login /> : <Navigate to="/home" />}/>
          <Route path="/register" element={!context.user ? <Register /> : <Navigate to="/home" />}/>
          <Route path="/home" element={context.user ? <Home /> : <Navigate to="/" />}/>
          <Route path="/form" element={context.user ? <Form /> : <Navigate to="/" />}/>
          <Route path="/:id" element={context.user ? <Blog /> : <Navigate to="/" />}/>
          <Route path={`/${context.user?.username}blogs`} element={context.user ? <Accout /> : <Navigate to="/" />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
