import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../Redux/slices/wishlistSlice'
import { addToCart } from '../Redux/slices/cartSlice'


function View() {
  const { id } = useParams()
  const { loading } = useSelector((state) => state.productSlice)
  const [products, setProduct] = useState({})
  const { wishlist } = useSelector(state => state.wishlistSlice)
  const dispatch = useDispatch()
  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("products"))
    setProduct(product?.find(products => products.id == id))
  }, [])

  const handleWishlist = (products) => {
    const existingProduct = wishlist.find(item => item.id == products.id)
    if (existingProduct) {
      alert("product already exist!!!")
    } else {
      dispatch(addToWishlist(products))
    }
  }
  console.log(products);

  return (
    <div className='container mt-5'>
      {
        loading ? <div className='d-flex justify-content-center mt-5'> <Spinner animation='border' variant='danger' /> Loading... </div> :
          <div className="row mt-5 align-items-center">
            <div className="col-md-4">
              <img className='rounded shadow' style={{ height: '400px', width: '100%' }} src={products?.thumbnail} alt="product" />
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <p>PID: {products?.id}</p>
              <h1>{products?.title}</h1>
              <h5 className='fw-bolder'>$ {products?.price}</h5>
              <p style={{ textAlign: 'justify' }}><span className='fw-bolder'>Description:</span> {products?.description}
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque magnam id enim repudiandae cupiditate rerum at facilis quaerat fugiat accusamus dignissimos voluptatem quisquam sunt ea eius earum, autem explicabo? Ut.</p>
              <div className='d-flex justify-content-between mt-5'>
                <Button onClick={() => (handleWishlist(products))} variant="outline-dark" className='btn fs-5'><i className="fa-solid fa-heart text-danger"></i>Wish list</Button>
                <Button onClick={() => dispatch(addToCart(products))} variant="outline-dark" className='btn fs-5'><i className="fa-solid fa-cart-plus text-success"></i>Cart</Button>

              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default View