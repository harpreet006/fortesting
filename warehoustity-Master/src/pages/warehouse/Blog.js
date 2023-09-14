import React, { useEffect, useState } from "react";
import CustomLoader from "../../components/helper/CustomLoader";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import moment from "moment";
 
const axios = require("axios");

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get(`https://warehousity.com/wp-json/wp/v2/posts?_embed`)
      .then(function (response) {
        // handle success
        setPosts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        setLoading(false);
      });
  }, []);

  console.log("posts-->", posts);

  return (
    <Layout>
      <div className="container px-sm-0 py-5 mt-5">
        <nav className="" aria-label="breadcrumb">
          <ol
            className="breadcrumb h5 common-breadcrumb text-gray mb-0"
            style={{ width: 200 }}
          >
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item active" aria-current="page">
              Blogs
            </li>
          </ol>
        </nav>
        {loading ? (
          <CustomLoader />
        ) : (
          <div className="row mt-3">
            {posts?.length > 0 &&
              posts.map((post, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 d-flex"
                >
                  <div className="custom-card-overlay2 card rounded-3">
                    <div className="img-holder card-img">
                      <img
                        src={
                          post?._embedded?.["wp:featuredmedia"][0].source_url
                        }
                        // src={"/assets/images/blog/blog.png"}
                        alt="warehouse"
                        className="img-fluid w-100"
                        // style={{height:200}}
                      />
                    </div>
                    <div className="card-body px-1 pb-0">
                      <Link to={`/blog/${post?.id}`} className="p-0 text-decoration-none">
                        <div className="p-1">
                        <p class="card-text mb-0">
                        <span className="">
                          {" "}
                          <i class="fa fa-clock-o pr-2" aria-hidden="true"></i>
                          {moment(post?.date).format('LL')}
                        </span>
                       
                      </p>
                       
                          <p className="card-title text-left">
                            {post?.title?.rendered?.slice(0, 60)}...{" "}
                            {/* <i class="fas fa-arrow-circle-right text-right"></i> */}
                           <span className="font-weight-bold"> Read More</span>
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
