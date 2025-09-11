import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      dispatch(addConnections(res?.data?.data))
      console.log(res.data)
    }
    catch (err) {
      console.log(err, 'err')
    }
  }

  useEffect(() => { fetchConnections(); }, [])

  if (!connections) return;
  if (connections?.length === 0) return <h1>No Connections found</h1>
  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-white text-3xl'>Connections</h1>
      {connections?.map((connection, index) => {
        const { firstName, lastName, photoUrl, age, gender, about } = connection;
        return (
          <div className='flex m-4 p-4 rounded-lg bg-base-200 w-1/2 mx-auto' key={index}>
            <div>
              <img alt='Photo' className='w-20 h-20 rounded-full' src={photoUrl} />
            </div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{firstName + "" + lastName}</h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>

          </div>)

      }

      )}
    </div>
  )
}

export default Connections