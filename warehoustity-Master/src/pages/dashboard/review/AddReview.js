import React, { useEffect, useState } from 'react';
import Layout from '../../../layout/Layout';
import CustomerLayout from '../../../layout/CustomerLayout';
import { useParams, useHistory } from 'react-router-dom';
// import StarRatings from 'react-star-ratings';
import { useToasts } from "react-toast-notifications";
import { getReview, createReview, reviewDetail } from '../../../store/actions/reviewAction';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";


const AddReview = () => {
  const { warehouseId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(state => state.REVIEW_INFO);
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);

  const { addToast } = useToasts();
  const [updateRating, setUpdateRating] = useState({
    subject: "Subject",
    review: "",
    rating: 0,
  });

  const ratingChanged = (newRating) => {
    if (newRating >= 1) {
      setUpdateRating({ ...updateRating, rating: newRating });
    }
  };

  const reviewChange = (e) => {
    setUpdateRating({ ...updateRating, [e.target.name]: e.target.value })
  }


  const reviewSubmit = () => {
    if (updateRating.rating === 0) {
      addToast("Please give Rating", { appearance: "error", autoDismiss: true });
      return 0;
    }

    var user = JSON.parse(localStorage.getItem("userData"));

    let obj = {
      subject: updateRating.subject,
      review: updateRating.review,
      rating: updateRating.rating,
      user: user.id,
      warehouse: parseInt(warehouseId)
    }
    dispatch(createReview(obj, addToast))
  }

  useEffect(() => {
    if (state.reviewDetail?.rating > 0) {
      setUpdateRating({
        subject: state.reviewDetail?.subject,
        review: state.reviewDetail?.review,
        rating: state.reviewDetail?.rating,
      })
    }
  }, [state.reviewDetail])

  useEffect(() => {
    dispatch(getReview(warehouseId))
    return (() => {
      dispatch(reviewDetail(null))
    })
  }, [dispatch, warehouseId])

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>


      <CustomerLayout title="My Bookings">

        <div className="row">
          <div className="content col-12  booking-details">
            <div className="border-bottom mb-1 d-sm-flex justify-content-between">
              <div>
                <span className="btn name-breadcrumb px-0 text-dark font-heading mr-3">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  Review
                </span>
              </div>
            </div>


            <div className="row py-4">

              <div className="col-md-12 my-3 d-flex justify-content-between">
                <div className="">
                  {/* <span className={`text-success`}><i className="fas fa-star"></i></span>
                   <span className={`text-success`}><i className="fas fa-star"></i></span>
                   <span className={`text-success`}><i className="fas fa-star"></i></span>
                   <span className={`text-success`}><i className="fas fa-star"></i></span>
                   <span className={`text-gray`}><i className="fas fa-star"></i></span> */}
                
                  {updateRating.rating > 0 &&
                    <ReactStars
                      count={5}
                      value={updateRating.rating}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                    />
                  }

                  {updateRating.rating === 0 &&
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                    />
                  }

                  {/* <StarRatings
                    rating={updateRating.rating}
                    starRatedColor="#27AE60"
                    starHoverColor="#27AE60"
                    starDimension="23px"
                    starSpacing="0px"
                    changeRating={ratingChanged}
                    numberOfStars={5}
                    name='rating'
                  /> */}

                </div>
                {/* <div>
                    <button type="button" class="btn order-details text-gray" data-target="#order-details" data-target-dismis="#order-card">View Order Details</button>
                  </div> */}
              </div>

              {state.reviewDetail?.rating > 0 ?
                <div className="col-12">
                  {/* <label>Review</label> */}
                  <div className="form-control" style={{ backgroundColor: "#E0E0E0",minHeight:"120px" }}>{updateRating.review}</div>
                </div>
                :
                <div className="col-12">
                  {/* <input name="subject" value={updateRating.subject} onChange={reviewChange} className="form-control" style={{backgroundColor: "#E0E0E0"}} placeholder="Write you subject" /><br/> */}
                  <textarea name="review" value={updateRating.review} onChange={reviewChange} className="form-control " style={{ backgroundColor: "#E0E0E0", minHeight: "120px", height:"120px" }} placeholder="Write your review..." rows="5"></textarea>
                  <div className="text-right">
                    {/* <button type="button" className="btn btn-outline-primary mx-1 mt-3">Cancel</button> */}
                    <button onClick={() => reviewSubmit(warehouseId)} className={`btn btn-primary mx-1 mt-3 ${read ? "d-none" : ""}`}>Submit</button>
                  </div>
                </div>
              }

            </div>

          </div>
        </div>

      </CustomerLayout>
    </Layout>
  )
}

export default AddReview
