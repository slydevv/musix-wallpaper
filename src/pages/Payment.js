import { useState } from 'react'
import { PaystackButton } from 'react-paystack'

export default function Payment() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [amount, setAmount] = useState('')
    const publicKey = "fkjgfmjjio5uijri54i3ijrfkm"
    const componentProps = {
        email,
        amount,
        metadata: {
          name,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () =>
          alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
      }
  return (
    <div className='mx-10'>
        <h3>Do you like your wallpaper? Kindly help my life with anything you get</h3>
        <div className="checkout-field">
    <label>Name</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>
  <div className="checkout-field">
    <label>Email</label>
    <input
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div className="checkout-field">
    <label>Amount</label>
    <input 
    type='number'
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
  </div>
        <PaystackButton className='bg-blue-200 p-4 rounded m-10' {...componentProps} />
    </div>
  )
}
