import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
            dispatch(removeFeed(userId));
        }
        catch (err) {
            console.log(err, "User Card 12")
        }
    }
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="User"
                    className="object-contain rounded-t-xl bg-base-100"
                    height={200} width={200}
                />

            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                {about && <p>{about}</p>}
                <div className="card-actions justify-center my-5">
                    <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;