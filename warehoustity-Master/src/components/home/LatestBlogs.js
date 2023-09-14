import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LatestBlogs = () => {
  const [posts, setPosts] = useState([]);

  // console.log(posts, "testing ==================>")

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
        // always executed
      });
  }, []);

  return (
    <section className={`suggested-for-you bg-deep-gray ${posts?.length === 0 && "d-none"}`}>
      <div className="sectionWidth  pt-4">
        <div className="row section-heading text-center">
          <div className="col-12 text-center">
            <h2 className="largHeading">Latest Blogs</h2>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual</p>
            {/* <Link to="/blog">
              <span className="mt-2">View All</span>
            </Link> */}
          </div>
        </div>
      </div>

      <div className="container pt-0">
        <div className="row">
          {posts?.length > 0 &&
            posts?.slice(0, 6).map((post, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3"
              >
                <Link to={`/blog/${post?.id }`}>
                  <div className="custom-card-overlay card">
                    <div className="img-holder card-img">
                      <img
                        src={
                          post?._embedded?.["wp:featuredmedia"][0].source_url
                        }
                        // src={"/assets/images/blog/blog.png"}
                        alt="warehouse"
                        className="img-fluid w-100"
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    </div>

                    <div className="card-img-overlay d-flex align-items-end">
                      <div className="card-body d-flex align-items-center">
                        <div className="bg-white pt-3 py-3 px-4 rounded w-100">
                          <p className="card-title text-left">
                            {post?.title?.rendered?.slice(0, 60)}...{" "}
                            <i className="fas fa-arrow-circle-right text-right"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        <div className="py-3 col-2 mx-auto" style={{cursor:"pointer"}}>
          <Link to="/new-blog" className="btn btn-deep-primary w-100" >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
