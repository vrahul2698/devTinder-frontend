import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("dravid@gmail.com")
  const [password, setPassword] = useState("Dravid@123");
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
      console.log(err , "err")
      console.error(err);
      setError(err?.response?.data || "Something went wrong")
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email Id</legend>
              <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login