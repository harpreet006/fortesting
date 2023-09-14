import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomLoader from "../../components/helper/CustomLoader";
import Layout from "../../layout/Layout";

const NewBlog = () => {
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get(`https://warehousity.com/wp-json/wp/v2/posts?_embed`)
      .then(function (response) {
        // handle success
        setPosts(response.data);
        console.log("mmmmmmmmmmmmm",response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        setLoading(false);
      });



    axios
      .get(`https://warehousity.com/wp-json/wp/v2/posts?per_page=4`)
      .then(function (response) {
        // handle success
        setRecentPosts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // setLoading(false);
      });
  }, []);

  console.log("posts-->", posts);
  return (
    <Layout>
      <div className="container">
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
      </div>
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="container-fluid px-md-5 news pt-4">
            <div className="row py-5">
              {posts?.length > 0 &&
                posts.slice(0, 2).map((post, i) => (
                  <div className="col-lg-6 col-md-6 mb-3">
                    <div class="card text-white position-relative">
                      <img
                        class="card-img img-fluid"
                        src={
                          post?._embedded?.["wp:featuredmedia"][0].source_url
                        }
                        alt="fashion5.jpeg"
                        style={{ objectFit: "cover", height: "333px" }}
                      />
                      <div class="card-img-overlay">
                        <div className="content-box-news">
                          {" "}
                          <Link to={`/new-blog/${post?.id}`}>
                            <h5 class="card-title">
                              {post?.title?.rendered?.slice(0, 60)}...{" "}
                            </h5>
                          </Link>
                          <p class="card-text pt-2">
                            <span className="font-weight-lighter">
                              {" "}
                              <i
                                class="fa fa-clock-o"
                                aria-hidden="true"
                              ></i>{" "}
                              {moment(post?.date).format("LL")}
                            </span>
                            {/* <Link to="/news">
                      <span className="pl-3 font-weight-lighter">
                        {" "}
                        <i class="fa fa-comment" aria-hidden="true"></i>{" "}
                        Comments
                      </span>
                    </Link> */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <section className="most_popular most_popular_slider pt-0">
            <div className="container-fluid px-md-5">
              <div className="row">
                <div className="col-lg-9 mb-3">
                  <div className="border p-3">
                    <div className="row">
                      <div className="">
                        <h2 className="line font-weight-normal main_heading">
                          Most Popular
                        </h2>
                      </div>
                      <div className="row mx-auto">
                        {posts?.length > 0 &&
                          posts.map((post, index) => (
                            <div className="col-lg-4 col-md-4 mb-3" key={index}>
                              <div class="card rounded-0">
                                <div className="img-holder overflow-hidden">
                                  <img
                                    src={
                                      post?._embedded?.["wp:featuredmedia"][0]
                                        .source_url
                                    }
                                    class="card-img-top rounded-0"
                                    alt="img"
                                  />
                                </div>
                                <Link to={`/new-blog/${post?.id}`} className="text-decoration-none">
                                  {" "}
                                  {console.log("kkkkkk",post?.id)}
                                  <div class="card-body px-2 pt-2 pb-1">
                                    <p class="card-text mb-1">
                                      <span className="">
                                        <i
                                          class="fa fa-clock-o"
                                          aria-hidden="true"
                                        ></i>{" "}
                                        {moment(post?.date).format("LL")}
                                      </span>
                                    </p>
                                    <h5 class="card-title mb-1 text-truncate2" style={{fontSize:"18px", lineHeight:"24px"}}>
                                      {" "}
                                      {post?.title?.rendered?.slice(
                                        0,
                                        60
                                      )}...{" "}
                                    </h5>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="border news p-3 mb-2 sticky-top-custom">
                    <div className="row">
                      <div className="">
                        <h2 className="line main-heading font-weight-normal mb-2">
                          Recent Posts
                        </h2>
                      </div>
                      {console.log(recentPosts, "check ===============>")}
                      {recentPosts?.length > 0 &&
                        recentPosts?.map((recentpost, index) => (
                          <div className="col-12 mb-2" key={index}>
                           <Link to={`/new-blog/${recentpost?.id}`} className="text-decoration-none">  
                              <div className="row no-gutters">
                                <div className="col-auto">
                                  <div
                                    className="img-holder"
                                    style={{ width: "90px" }}
                                  >
                                    <img
                                      className="img-fluid object-fit-cover"
                                      src="assets/images/news/travel2.jpeg"
                                      style={{
                                        minHeight: "50px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <p
                                    className="mb-0 pl-2 fs-15px font-weight-bold text-dark text-truncate2"
                                    style={{ lineHeight: "17px" }}
                                  >
                                    {recentpost?.title?.rendered}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="" style={{backgroundColor:"#fbfbfd"}}>
           <div className="container">
           <div className="row">
                <div className="col-12 text-center py-4">
                    <h3>Featured Posts</h3>
                </div>
            </div>
            <div className="row">
                
              {posts?.length > 0 &&
                posts.slice(0, 4).map((post, index) => (
                  <div className="col-lg-3 col-md-4 mb-3" key={index}>
                    <div class="card  rounded-0">
                      <div className="img-holder overflow-hidden">
                        <img
                          src={
                            post?._embedded?.["wp:featuredmedia"][0].source_url
                          }
                          class="card-img-top rounded-0"
                          alt="img"
                        />
                      </div>
                      <Link to={`/new-blog/${post?.id}`} className="text-decoration-none">
                        {" "}
                        <div class="card-body px-2 pt-2 pb-1">
                          <p class="card-text mb-1">
                            <span className="">
                              <i class="fa fa-clock-o" aria-hidden="true"></i>{" "}
                              {moment(post?.date).format("LL")}
                            </span>
                          </p>
                          <h5 class="card-title mb-1 text-truncate2"  style={{fontSize:"18px", lineHeight:"24px"}}>
                            {" "}
                            {post?.title?.rendered?.slice(0, 60)}...{" "}
                          </h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
           </div>
          </section>
        </>
      )}
    </Layout>
  );
};

export default NewBlog;
