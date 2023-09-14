import React, { useEffect, useState } from "react";
import axiosauth from "../api/axios-auth";
import ReactHtmlParser from "react-html-parser";

const TermAndCondition = (props) => {
  const { setModalShow, onPage, setCheckTerm } = props;
  const [content, setContent] = useState(null);

  useEffect(() => {
    function getCMS() {
      try {
        axiosauth
          .get(`/api/v1/cms/cmstype/tandc`)
          .then((response) => {
            let res = JSON.parse(response.data);
            // console.log("")
            if (res.statusCode === 200) {
              setContent(ReactHtmlParser(res.data?.data));
            }
          })
          .catch((error) => {})
          .then(() => {
            console.log("-----always executes");
          });
      } catch (e) {}
    }

    getCMS();

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* <div className="modal px-0" id="terms-and-conditions-modal" tabindex="-1" role="dialog" aria-hidden="true"> */}
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content border-0">
          <div className="modal-body py-0">
            <div className="row px-3">
              <div className="py-lg-4 my-1 p-sm-4 p-3">
                <div className="row">
                  <div className="col-12">
                    <button
                      type="button"
                      onClick={() => setModalShow(false)}
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      {!onPage ? <span aria-hidden="true">&times;</span> : null}
                    </button>
                    <div>
                      <h5 className="mb-3 modal-title">Terms & Conditions</h5>
                      {/* <p className="text-gray">Last updated on February 26, 2020</p> */}
                    </div>
                  </div>
                </div>

                <div className="terms-and-condition-content">
                  <div className="content">
                    {content}
                    {/* <h6>1. Terms</h6>
                  <div>
                    <p className="text-gray">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus morbi nisl tincidunt at volutpat nibh. Amet nam porttitor consectetur urna ornare. Orci, hendrerit posuere mi vel elit enim tincidunt arcu in. Lectus mi elit tortor lacinia integer. Morbi consequat sit tristique turpis leo. Vestibulum, nibh metus, volutpat quam ultrices ut tortor non consequat. Non morbi lectus in neque felis eu nec. Mollis consectetur id egestas est blandit sodales elementum vestibulum.</p>
                    <p className="text-gray">Feugiat in dignissim suspendisse est aliquet varius rutrum porta dolor. Diam tortor eget bibendum arcu in pellentesque. Phasellus eros, libero integer lectus arcu, eu lobortis blandit ut. Quam viverra sed tortor mauris gravida aliquam bibendum posuere id. Tempor rutrum est quis duis libero sagittis amet. Porttitor velit suspendisse id ullamcorper mattis vel. Neque vestibulum, amet, neque consectetur duis aenean mi tempor. Ut in vitae est maecenas vestibulum et viverra sollicitudin feugiat. Nec cras vitae et id at. Viverra curabitur phasellus tempus, sociis et id fermentum sollicitudin. Sit lectus et nulla diam quis lacus vel ultricies.</p>
                    <p className="text-gray">Morbi amet sed pretium nibh feugiat lacus velit, ante mi. Leo interdum vel viverra sit praesent lorem cursus tempus. Eu ut rhoncus pellentesque proin imperdiet sed amet fermentum. Nibh vitae lorem in laoreet senectus ut. Eu sit.</p>
                    <p className="text-gray">Morbi amet sed pretium nibh feugiat lacus velit, ante mi. Leo interdum vel viverra sit praesent lorem cursus tempus. Eu ut rhoncus pellentesque proin imperdiet sed amet fermentum. Nibh vitae lorem in laoreet senectus ut. Eu sit.</p>
                    <p className="text-gray">Morbi amet sed pretium nibh feugiat lacus velit, ante mi. Leo interdum vel viverra sit praesent lorem cursus tempus. Eu ut rhoncus pellentesque proin imperdiet sed amet fermentum. Nibh vitae lorem in laoreet senectus ut. Eu sit.</p>
                  </div> */}
                  </div>
                  {/* <div className="content">
                  <h6>2. Conditions</h6>
                  <div>
                    <p className="text-gray">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus morbi nisl tincidunt at volutpat nibh. Amet nam porttitor consectetur urna ornare. Orci, hendrerit posuere mi vel elit enim tincidunt arcu in. Lectus mi elit tortor lacinia integer. Morbi consequat sit tristique turpis leo. Vestibulum, nibh metus, volutpat quam ultrices ut tortor non consequat. Non morbi lectus in neque felis eu nec. Mollis consectetur id egestas est blandit sodales elementum vestibulum.</p>
                    <p className="text-gray">Feugiat in dignissim suspendisse est aliquet varius rutrum porta dolor. Diam tortor eget bibendum arcu in pellentesque. Phasellus eros, libero integer lectus arcu, eu lobortis blandit ut. Quam viverra sed tortor mauris gravida aliquam bibendum posuere id. Tempor rutrum est quis duis libero sagittis amet. Porttitor velit suspendisse id ullamcorper mattis vel. Neque vestibulum, amet, neque consectetur duis aenean mi tempor. Ut in vitae est maecenas vestibulum et viverra sollicitudin feugiat. Nec cras vitae et id at. Viverra curabitur phasellus tempus, sociis et id fermentum sollicitudin. Sit lectus et nulla diam quis lacus vel ultricies.</p>
                    <p className="text-gray">Morbi amet sed pretium nibh feugiat lacus velit, ante mi. Leo interdum vel viverra sit praesent lorem cursus tempus. Eu ut rhoncus pellentesque proin imperdiet sed amet fermentum. Nibh vitae lorem in laoreet senectus ut. Eu sit.</p>
                    <p className="text-gray">Morbi amet sed pretium nibh feugiat lacus velit, ante mi. Leo interdum vel viverra sit praesent lorem cursus tempus. Eu ut rhoncus pellentesque proin imperdiet sed amet fermentum. Nibh vitae lorem in laoreet senectus ut. Eu sit.</p>
                    <p className="text-gray">Morbi amet sed pretium nibh feugiat lacus velit, ante mi. Leo interdum vel viverra sit praesent lorem cursus tempus. Eu ut rhoncus pellentesque proin imperdiet sed amet fermentum. Nibh vitae lorem in laoreet senectus ut. Eu sit.</p>
                  </div>
                </div> */}
                </div>
                {!onPage ? (
                  <div className="btns pt-1">
                    <button
                      onClick={() => {
                        setCheckTerm(false);
                        setModalShow(false);
                      }}
                      data-dismiss="modal"
                      className="btn btn-outline-dark-primary col-auto mr-2"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => {
                        setCheckTerm(true);
                        setModalShow(false);
                      }}
                      data-dismiss="modal"
                      className="btn btn-deep-primary col-auto"
                    >
                      Accept
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default TermAndCondition;
