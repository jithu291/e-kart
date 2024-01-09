import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeFromCart } from '../Redux/slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'




function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state => state.cartReducer)
  const [cartAmount, setCartAmount] = useState(0)
  useEffect(() => {
    if (cart?.length > 0) {
      setCartAmount(cart?.map(products => products?.totalPrice).reduce((p1, p2) => p1 + p2))
    } else {
      setCartAmount(0)
    }
  }, [cart])
  const handleCheckout = ()=>{
    alert("Your order has successfully placed...")
    dispatch(emptyCart())
    navigate('/')
  }
const handleDecrementCart=(products)=>{
  if(products.quantity==1){
    dispatch(removeFromCart(products.id))
  }else{
    dispatch(decQuantity(products))
  }
}
  return (
   <>
   <Header/>
    <div className='container mt-5'>
      {cart?.length > 0 ? <div className="row mt-5">
        <div className="col-lg-8 mt-5">
          <Table className='shadow'>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Image </th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((products, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{products.title}</td>
                  <td><img style={{ height: '100px', width: '100px' }} src={products.thumbnail} alt="product" /></td>
                  <td>
                    <div className='d-flex'>
                      <Button  onClick={()=>(handleDecrementCart(products))} className='btn fw-bolder'>-</Button>
                  <input style={{ width: '50px' }} className='form-control' type="text" value={products.quantity} readOnly />
                  <Button onClick={()=>dispatch(incQuantity(products))} className='btn fw-bolder'>+</Button>
                  </div>
                  </td>
                  <td>$ {products.totalPrice}</td>
                  <td><button onClick={()=>dispatch(removeFromCart(products.id))} className='btn'><i className="fa-solid fa-trash text-danger"></i></button></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className='float-end'>
            <Button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-3'>Empty Cart</Button>
            <Link to={'/'} className='btn btn-primary'>Shop More</Link>
          </div>
        </div>
        <div className="col-lg-4 mt-5">
          <div className="border rounded shadow p-4">
            <h5>Total Product: <span className='fw-bolder'>{cart?.length}</span></h5>
            <h3>Total Amount: <span className='fw-bolder text-danger'>$ {cartAmount}</span></h3>
            <hr />
            <div className="d-grid">
              <button onClick={()=>handleCheckout()} className='btn btn-success'>CheckOut</button>
            </div>
          </div>
        </div>
      </div> :
        <div className='text-danger justify-content-center align-items-center text-center mt-5'>
          <img width={'25%'} height={'200px'} src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/first_white_girl_drbl.gif" alt="" />
          <h1 className='mt-3'>Your cart is Empty</h1>
          <Link to={'/'} className='btn btn-success'>Click here to showmore</Link>
        </div>
      }

    </div>
   </>
  )
}

export default Cart