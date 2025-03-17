import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"

import LoginPage from "./pages/Loginpage/Loginpage"
import SignupPage from "./pages/Signuppage/SignupPage"





function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
