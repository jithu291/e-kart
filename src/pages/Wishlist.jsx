import React from 'react'
import { Col, Row, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToWishlist, removeFromWishlist } from '../Redux/slices/wishlistSlice'
import { addToCart } from '../Redux/slices/cartSlice'
import Header from '../components/Header'


function WishList() {
  const dispatch = useDispatch()
  const wishlist = useSelector(state => state.wishlistSlice.wishlist)

  const handleCart = (products) => {
    dispatch(removeFromWishlist(products.id))
    dispatch(addToCart(products))
  }
  return (
    <>
    <Header/>
    <div style={{ marginTop: '60px' }}>
      <Row className='container mt-5'>
        {wishlist?.length > 0 ? wishlist?.map(products => (<Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
          <Card classNameshadow rounded style={{ width: '18rem' }}>
            <Link to={`/view/${products.id}`}><Card.Img style={{ height: '180px' }} variant="top" src={products.thumbnail} /></Link>
            <Card.Body>
              <Card.Title>{products.title.slice(0, 20)}...</Card.Title>
              <div className='d-flex justify-content-between'>
                <Button onClick={() => dispatch(removeFromWishlist(products.id))} className='btn btn-light fs-5'><i className="fa-solid fa-heart-circle-minus text-danger"></i></Button>
                <Button onClick={() => handleCart(products)} className='btn btn-light fs-5'><i className="fa-solid fa-cart-plus text-success"></i></Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        )) : <div className='text-danger d-flex justify-content-center align-items-center'>
          <img width={'25%'} height={'200px'} src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/first_white_girl_drbl.gif" alt="" />
          <h1 className='mt-3'>Your wishlist is Empty</h1>
        </div>
        }
      </Row>
    </div>
    </>
  )
}

export default WishList