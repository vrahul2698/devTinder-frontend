import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './../utils/constants';

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false)
    useEffect(() => {
        verifyPremiumUser()
    }, []);
    const verifyPremiumUser = async () => {
        try {
            const res = await axios.get(BASE_URL + "/premium/verify", { withCredentials: true });
            if (res?.data?.isPremium) {
                setIsUserPremium(true)
            }
        }
        catch (err) {
            console.log("Error in Premium Page " + err.message)
        }
    }

    const handleBuyClick = async (type) => {
        try {
            const order = await axios.post(BASE_URL + "/payment/create", {
                membershipType: type
            }, { withCredentials: true });

            //It should open the RAZORPAY dialog Box
            const { amount, keyId, currency, notes, orderId } = order.data
            const options = {
                key: keyId, // Replace with your Razorpay key_id
                amount,
                currency,
                name: 'Dev Rahul',
                description: 'Connect to other developers',
                order_id: orderId, // This is the order_id created in the backend
                //callback_url: 'http://localhost:3000/payment-success', // Your success URL
                prefill: {
                    name: notes?.firstName + " " + notes.lastName,
                    email: notes?.email,
                    contact: '9999999999'
                },
                theme: {
                    color: '#F37254'
                },
                handler: verifyPremiumUser
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        catch (err) {
            console.log(err, "10-Premium")
        }
    }
    return (
        isUserPremium ? ("You are already an Premium User") :
            (<div className='m-10'>
                <div className="flex w-full">
                    <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center">
                        <h1 className='font-bold text-3xl'>Silver Membership</h1>
                        <ul>
                            <li>-chat with other people</li>
                            <li>-100 connection requests per day</li>
                            <li>-Blue tick</li>
                            <li>-3 Months</li>
                        </ul>
                        <button onClick={() => handleBuyClick("silver")} className='btn btn-primary'>Buy Silver</button>
                    </div>
                    <div className="divider divider-horizontal">OR</div>
                    <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center">
                        <h1 className='font-bold text-3xl'>Gold Membership</h1>
                        <ul>
                            <li>-chat with other people</li>
                            <li>-Infinite connection requests per day</li>
                            <li>-Blue tick</li>
                            <li>-6 Months</li>
                        </ul>
                        <button onClick={() => handleBuyClick("gold")} className='btn btn-accent'>Buy Gold</button>
                    </div>
                </div>
            </div>)
    )
}

export default Premium