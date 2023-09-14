import React from "react";
import Layout from "../../../../layout/Layout";
import CustomerLayout from "../../../../layout/CustomerLayout";
import { Link } from "react-router-dom";
import GoogleMap from 'google-map-react';

const K_WIDTH = 40;
const K_HEIGHT = 40;

const greatPlaceStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid #f44336',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};

const AnyReactComponent = ({ text }) => <div style={greatPlaceStyle}>{text}</div>;

const WarehouseStatsByMap = () => {

    // const [centerZoom, setCenterZoom] = useState({
    //     center: [28.535517, 77.391029],
    //     zoom: 9,
    //     greatPlaceCoords: { lat: 28.535517, lng: 77.391029 }
    // })


    let mapData = [{
        lat: 28.7041,
        lng: 77.1025,
        text: '5'
    },
    {
        lat: 28.535517,
        lng: 77.391029,
        text: '54'
    },
    {
        lat: 28.4070,
        lng: 77.8498,
        text: '9'
    },
    {
        lat: 28.4595,
        lng: 77.0266,
        text: '5'
    }]


    return (
        <Layout>

            <CustomerLayout title={`Dashboard`} subtitle={"My Operations"}>
                <div className="row">
                    <div className="content col-12">
                        <div className="dashboard-btns pb-1 border-bottom mb-2">
                            <ul
                                className="nav nav-pills common-tabs3 mb-1"
                                id="pills-tab"
                                role="tablist"
                            >
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link btn-md btn py-2 ">
                                        My Dashboard
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-table" className="nav-link btn-md btn py-2">
                                        Stats By List
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-chart" className="nav-link btn-md btn py-2">
                                        Stats By Chart
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-map" className="nav-link btn-md btn py-2 active">
                                        Stats By Map
                                    </Link>
                                </li>

                            </ul>
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="dashboard-cards pr-5 pb-5">
                                <div style={{ height: '50vh', width: '100%' }}>
                                    <GoogleMap
                                        bootstrapURLKeys={{ key: "" }}
                                        defaultCenter={[28.535517, 77.391029]}
                                        defaultZoom={9}
                                    >

                                        {mapData.map((item, index) =>
                                            <AnyReactComponent
                                                index={index}
                                                lat={item.lat}
                                                lng={item.lng}
                                                text={item.text}
                                            />
                                        )}

                                    </GoogleMap>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </CustomerLayout>
        </Layout>
    )
}

export default WarehouseStatsByMap
