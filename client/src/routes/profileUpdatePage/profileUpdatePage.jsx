import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";


function ProfileUpdatePage() {

  const [error, setError] = useState("")

  const { currentUser, updateCurrentUser } = useContext(AuthContext);

  const navigate= useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    const avatar = formData.get("avatar")

    try {

      const res = await apiRequest.put(`/user/${currentUser.id}`, {
        username,
        email,
        password,

      })

      updateCurrentUser(res.data)
      navigate('/profile')

    } catch (error) {
      console.log(error);
      setError(error.response.data.message)
    }

  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img alt="" className="avatar" src={currentUser.avatar || "../../../public/noavatar.png"} />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
