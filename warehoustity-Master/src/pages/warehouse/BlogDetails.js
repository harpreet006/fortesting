import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import ReactHtmlParser from "react-html-parser";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CustomLoader from "../../components/helper/CustomLoader";

const BlogDetails = () => {
  const { slug } = useParams();

  const [posts, setPosts] = useState({});
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get(`https://warehousity.com/wp-json/wp/v2/posts/${slug}`)
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
  }, [slug]);

  return (
    <Layout>
       {loading ? (
        <CustomLoader />
       ):( 
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

       <div className="row mt-3">
         <div className="col-md-9 col-12 my-1 blog-details-content mb-3">
           <div className="card p-3">
             <h4>{posts?.title?.rendered}</h4>
             <hr />
             <div className="text-justify"></div>
             {ReactHtmlParser(posts?.content?.rendered)}
           </div>
         </div>
         <div className="col-md-3 col-12">
           <div className="card border-0">
             <div className="card-header bg-white pt-0">
               <h4 className="line mb-0"> Recent Posts</h4>
              </div>
             <div className="card-body ">
               {recentPosts?.length > 0 &&
                 recentPosts.map((post, index) => (
                   <>
                     <Link to={`/blog/${post?.id}`} className="text-dark position-relative">
                       <p className="card-text widget" key={index}>
                         {" "}
                         {/* <i className="fas fa-arrow-right"></i> */}
                         <ul className="pl-3">
                          <li> {` ${post?.title?.rendered}`}</li>
                         </ul>
                       </p>
                     </Link>
                     <hr />
                   </>
                 ))}
             </div>
           </div>
         </div>
       </div>
     </div>)}
    </Layout>
  );
};

export default BlogDetails;
