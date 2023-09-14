import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import axios from "../../api/axios-auth";
import { ExcelRenderer } from "react-excel-renderer";

const PriceGraph = ({ setCheckPrice, addCart, data, location }) => {
  const [charts, setCharts] = useState([]);

  const labels = [
    100, 250, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000,
    7000, 8000, 9000, 10000,
  ];



function colorPicker(){
    const items = ['rgb(157, 0, 157)', 'rgb(31, 120, 22)', 'rgb(6, 7, 65)', 'rgb(239, 87, 239)', 'rgba(48, 252, 0, 1)', 'rgba(255, 0, 34, 0.8)']
    return items[Math.floor(Math.random() * items.length)];
}


 

  const chartData = {
    labels,
    datasets: charts
  };

  useEffect(() => {
    axios
      .get("/api/v1/rate-matrix")
      .then((response) => {
        let res = JSON.parse(response.data);
        console.log("sdsd", res.data.filePath);
        fetch(res.data.filePath)
          .then((e) => {
            return e.blob();
          })
          .then((blob) => {
            let b = blob;
            b.lastModifiedDate = new Date();
            b.name = "test";

            ExcelRenderer(b, (err, resp) => {
              if (err) {
                console.log(err);
              } else {
                let mapData = [];
                let stateName;
                for (let row = 4; row < resp.rows.length; row++) {
                  if (typeof resp.rows[row][0] === "string") {
                    stateName = resp.rows[row][0];
                  }

                  mapData.push({
                    stateName: stateName,
                    label: resp.rows[row][2],
                    data: resp.rows[row].filter(
                      (item) => typeof item !== "string"
                    ),
                    borderColor:
                      resp.rows[row][2] === "Warehousity Price"
                        ? "#5A86C5"
                        : colorPicker(),
                    backgroundColor:
                      resp.rows[row][2] === "Warehousity Price"
                        ? "#5A86C5"
                        : colorPicker(),
                  });
                }
                mapData = mapData.filter((item) => item.stateName?.toLowerCase() === location?.toLowerCase());
                setCharts(mapData);
              }
            });
          });
      })
      .catch((error) => {})
      .then(() => {
        console.log("-----always executes");
      });
  }, [location]);

  return (
    <div className="modal-content border-0">
      <div className="modal-body py-0">
        <div className="row px-3">
          <div className="modal-body-right-content w-100 py-lg-4 my-1 p-sm-4 p-3">
            <div className="row">
              <div className="col-12">
                <button
                  onClick={() => setCheckPrice(false)}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="text-center">
                  <h5 className="mb-4 modal-title">
                    Warehouse Price Trend - Warehousity
                  </h5>
                </div>
              </div>
            </div>
            <div>
              {/* ============================= */}

              <Line
                //  options={options}

                data={chartData}
              />

              <span className="text-center">Rate Per Sqft</span>

              {/* =========================== */}
              {/* <div className="row">
                <div className="col-lg-9 mx-auto">
                  <img
                    className="img-fluid w-100"
                    src="/assets/images/check-price.png"
                    alt="images"
                  />
                </div>
              </div> */}

              <div onClick={() => setCheckPrice(false)} className="text-right">
                {data.authenticated ? (
                  <button
                    type="submit"
                    className="btn btn-deep-primary my-3"
                    data-dismiss="modal"
                    data-target="#mobile-number-modal"
                    data-toggle="modal"
                  >
                    Proceed
                  </button>
                ) : (
                  <button
                    onClick={addCart}
                    type="button"
                    className="btn btn-deep-primary my-3"
                  >
                    Proceed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceGraph;
