import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import ReactPlayer from "react-player";
import BrowserTitle from "../components/helper/BrowserTitle";

const Tutorials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <BrowserTitle title="Tutorials" />
      <section class="about-deatail mt-5">
        <div class="container mt-5">
          <h3 className="font-weight-bold">Tutorials</h3>
          <div class="row">
            <div class="col-md-4 my-2">
              <ReactPlayer
                width="350"
                height="350"
                url="https://www.youtube.com/watch?v=9W71xi9os8U"
              />
            </div>

            <div class="col-md-4  my-2">
              <ReactPlayer
                width="350"
                height="350"
                url="https://www.youtube.com/watch?v=ZqdbgW67Emc"
              />
            </div>

            <div class="col-md-4  my-2">
              <ReactPlayer
                width="350"
                height="350"
                url="https://www.youtube.com/watch?v=bx2K9vyzDV8"
              />
            </div>

            <div class="col-md-4  my-2">
              <ReactPlayer
                width="350"
                height="350"
                url="https://www.youtube.com/watch?v=gs9UTVjeINE"
              />
            </div>

            <div class="col-md-4 my-2">
              <ReactPlayer
                width="350"
                height="350"
                url="https://www.youtube.com/watch?v=9W71xi9os8U"
              />
            </div>

            <div class="col-md-4  my-2">
              <ReactPlayer
                width="350"
                height="350"
                url="https://www.youtube.com/watch?v=ZqdbgW67Emc"
              />
            </div>

            <div class="col-md-4  my-2">
              <ReactPlayer
                width="350"
                height="350"
                url="https://www.youtube.com/watch?v=bx2K9vyzDV8"
              />
            </div>

            <div class="col-md-4  my-2">
              <ReactPlayer
                width="350"
                height="350"
                url="https://www.youtube.com/watch?v=gs9UTVjeINE"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tutorials;
