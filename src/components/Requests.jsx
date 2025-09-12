import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests", { withCredentials: true });
            dispatch(addRequest(res?.data?.data))
        }
        catch (err) {
            console.log(err, 'err')
        }
    }

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id))
        }
        catch (err) {
            console.log(err, "Review Requests")
        }
    }


    useEffect(() => {
        fetchRequests()
    }, [])
    if (!requests) return;
    if (requests?.length === 0) return <h1 className='font-bold text-center my-10'>No Connections Reuqests found</h1>
    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-white text-3xl'>Connection Requests</h1>
            {requests?.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
                return (
                    <div className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-200 w-2/3 mx-auto' key={_id}>
                        <div>
                            <img alt='Photo' className='w-20 h-20 rounded-full' src={photoUrl} />
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + " " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div>
                            <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                            <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                        </div>
                    </div>)

            }

            )}
        </div>
    )
}

export default Requests