
import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();
    const saveProfile = async () => {
        setError("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                age,
                gender,
                photoUrl,
                about
            }, { withCredentials: true });


            dispatch(addUser(res?.data?.data));
            setShowToast(true)
            setTimeout(() => { setShowToast(false) }, 3000)
        }
        catch (err) {
            console.log(BASE_URL + "/profile/edit")
            console.log(err, "err")
            setError(err.message)
        }
    }
    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                    <div className="card card-border bg-base-300 w-96">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Photo</legend>
                                    <input type="text" className="input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Age</legend>
                                    <input type="text" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <select defaultValue="Pick a browser" className="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option disabled={true}>Pick Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                </fieldset>
                                {/* <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Gender</legend>

                                    <input type="text" className="input" value={gender} onChange={(e) => setGender(e.target.value)} />
                                </fieldset> */}
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">About</legend>
                                    <textarea placeholder="Bio" className="textarea textarea-md" value={about} onChange={(e) => setAbout(e.target.value)} />
                                </fieldset>

                            </div>
                            <p className="text-red-600">{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary"
                                    onClick={saveProfile}
                                >
                                    Update Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
            {showToast &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile updated successfully.</span>
                    </div>
                </div>}
        </>
    )
}

export default EditProfile