import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";


function ProfileUpdatePage() {

  const [error, setError] = useState("")

  const { currentUser, updateCurrentUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")


    try {

      const res = await apiRequest.put(`/user/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
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
        <img alt="" className="avatar" name="avatar" src={avatar[0] || currentUser.avatar || "../../../public/noavatar.png"} />
        <UploadWidget
          uwConfig={
            {
              cloudName: "daw1wllc4",
              uploadPreset: "estate",
              multiple: false,
              maxImageFileSize: 5000000,
              folder: "avatars"
            }
          }
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
