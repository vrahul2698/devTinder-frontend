import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/")
    }
    catch (err) {
      console.log(err, "err")
      setError(err?.response?.data || "Something went wrong")
    }
  }
  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
       dispatch(addUser(res.data?.data));
       return navigate("/profile")
    }
    catch (err) {
      console.log(err, "signUP");
      setError(err?.response?.data || "Something went wrong")
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
          <div>
            {!isLoginForm &&
              <>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">First Name</legend>
                  <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </fieldset></>}
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email Id</legend>
              <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "SignUp"}</button>
          </div>
          <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm((prev) => !prev)}>{isLoginForm ? "New User ? SignUp Here" : "Existing User ? Login Here"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login