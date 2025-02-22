import "./login.scss";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {

  const { updateCurrentUser } = useContext(AuthContext)

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.target)

    const username = formData.get('username')
    const password = formData.get('password')

    try {
      const response = await apiRequest.post("/auth/login", {
        username,
        password
      })

      updateCurrentUser(response.data.userInfro)

      navigate("/")
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false)
    }


  }



  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input className="px-12" name="username" required minLength={1} maxLength={13} type="text" placeholder="Username" />
          <input name="password" required minLength={6} type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span className="error">{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer max-sm:hidden">
        <img className="w-10" src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
