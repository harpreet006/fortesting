import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import { GoogleMapsAPI } from './clientconfig';
Geocode.setApiKey(GoogleMapsAPI);
Geocode.enableDebug();

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			city: '',
			openInfoWindowMarkerId: '',
			marks: this.props.latlng,
			area: '',
			state: '',
			pincode: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			dialogopen: false
		}
	}
	/**
	 * Get the current address from the default map position and set those values in the state
	 */


	componentDidMount() {

		localStorage.setItem("latitude", this.state.mapPosition.lat)
		localStorage.setItem("longitude", this.state.mapPosition.lng)
		Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = this.getCity(addressArray),
					area = this.getArea(addressArray),
					state = this.getState(addressArray),
					pincode = this.getPincode(addressArray)
				localStorage.setItem("Address", address)
				localStorage.setItem("City", city)
				localStorage.setItem("Area", area)
				localStorage.setItem("state", state)
				localStorage.setItem("PinCode", pincode)
				console.log('city', address);

				this.setState({
					address: (address) ? address : '',
					area: (area) ? area : '',
					city: (city) ? city : '',
					pincode: (pincode) ? pincode : '',

					state: (state) ? state : '',
				})
			},
			error => {
				console.error(error);
			}
		);
	};
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */

	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.props.latlng !== nextProps.latlng

		) {
			return true
		} else if (this.state.openInfoWindowMarkerId !== nextState.openInfoWindowMarkerId) {
			return true;
		}
		else if (this.props.latlng === nextProps.latlng) {
			return false
		}
	}

	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCity = (addressArray) => {
		let city = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
				city = addressArray[i].long_name;
				return city;
			}
		}
	};
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getArea = (addressArray) => {
		let area = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0]) {
				for (let j = 0; j < addressArray[i].types.length; j++) {
					if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
						area = addressArray[i].long_name;
						return area;
					}
				}
			}
		}
	};
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getState = (addressArray) => {
		let state = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
					state = addressArray[i].long_name;
					return state;
				}
			}
		}
	};
	getPincode = (addressArray) => {
		let pincode = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (addressArray[i].types[0] && 'postal_code' === addressArray[i].types[0]) {
					pincode = addressArray[i].long_name;
					return pincode;
				}
			}
		}
	};
	/**
	 * And function for city,state and address input
	 * @param event
	 */
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = (event) => {

		// let   area = this.getArea( response.results[0].formatted_address )
		this.setState({
			dialogopen: false
		});
	};
	InfoWindowaddress = (lat, lng) => {
		let add = 'rohan'
		Geocode.fromLatLng(lat, lng).then(
			response => {
				console.log("fjjdfj", response)
				add = response.results[0].formatted_address
				//    return add
			},
			error => {
				console.error(error);
			}
		);

		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		async function demo() {
			console.log('Taking a break...');
			await sleep(2000);
			console.log('Two seconds later, showing sleep in a loop...');

			// Sleep in loop
			for (let i = 0; i < 5; i++) {
				if (i === 3)
					await sleep(2000);
				console.log(i);
			}
		}

		demo();
		return add
		// return  asyncFunctionCall();


		// return add
	}
	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = (event) => {
		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();
		localStorage.setItem("latitude", newLat)
		localStorage.setItem("longitude", newLng)
		Geocode.fromLatLng(newLat, newLng).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = this.getCity(addressArray),
					area = this.getArea(addressArray),
					state = this.getState(addressArray),
					pincode = this.getPincode(addressArray)
				console.log('city', this.getPincode(addressArray));
				localStorage.setItem("Address", address)
				localStorage.setItem("City", city)
				localStorage.setItem("Area", area)
				localStorage.setItem("state", state)
				localStorage.setItem("PinCode", pincode)
				this.setState({
					address: (address) ? address : '',
					area: (area) ? area : '',
					city: (city) ? city : '',
					state: (state) ? state : '',
					pincode: (pincode) ? pincode : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				})
			},
			error => {
				console.error(error);
			}
		);
	};

	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onPlaceSelected = (place) => {
		console.log('plc', place);

		const address = place.formatted_address,

			addressArray = place.address_components,
			city = this.getCity(addressArray),
			area = this.getArea(addressArray),
			state = this.getState(addressArray),
			pincode = this.getPincode(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		localStorage.setItem("latitude", latValue)
		localStorage.setItem("longitude", lngValue)
		console.log('city', this.getPincode(addressArray));
		localStorage.setItem("Address", address)
		localStorage.setItem("City", city)
		localStorage.setItem("Area", area)
		localStorage.setItem("state", state)
		localStorage.setItem("PinCode", pincode)
		// Set these values in the state.
		this.setState({
			address: (address) ? address : '111',
			area: (area) ? area : '111',
			city: (city) ? city : '1111',
			state: (state) ? state : '33432423',
			pincode: (pincode) ? pincode : '111231231',

			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};

	handleToggleOpen = (markerId, lat, lng) => {
		console.log("markerId-->", markerId)
		console.log("lat-->", lat)
		console.log("lng-->", lng)
		Geocode.fromLatLng(lat, lng).then(
			response => {
				// eslint-disable-next-line
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					area = this.getArea(addressArray)
				console.log("lng-->clicked")
				console.log("area-->", area)
				console.log("dialogopen1-->", this.state.dialogopen)
				// let   area = this.getArea( response.results[0].formatted_address )
				this.setState({
					openInfoWindowMarkerId: markerId,
					address: area,
					dialogopen: true
				});

			},
			error => {
				console.error(error);
			}
		);
		// this.setState({
		// 	openInfoWindowMarkerId: markerId,
		// 	// marks:this.props.latlng
		// 	// address:response.results[0].formatted_address
		// });
	}
	render() {
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<div>

						<GoogleMap
							google={this.props.google}
							defaultZoom={this.props.zoom}
							defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
						>
							{/* InfoWindow on top of marker */}


							{/*Marker*/}
							{/* <Marker google={this.props.google}
						        name={'Dolores park'}
						        draggable={true}
						        onDragEnd={ this.onMarkerDragEnd }
						        position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
						<Marker /> */}






							{this.state.marks.map((mark, index) => (
								<>

									{this.state.openInfoWindowMarkerId === index ? (<InfoWindow
										onClose={this.onInfoWindowClose}
										position={{ lat: (this.state.marks[this.state.openInfoWindowMarkerId].lat + 0.0018), lng: this.state.marks[this.state.openInfoWindowMarkerId].lng }}
									>
										<div style={{ backgroundColor: "#fff" }}>
											{/* <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span> */}
											<div className="row">
												{/* <div className="col-md-4">
										</div> */}

												<div className="col-md-4">
													<img alt="" style={{
														width: "130px",
														height: "170px",
														objectFit: "cover"
													}} src={mark.image}></img>
												</div>
												<div className="col-md-6 col-6">
													<p style={{
														color: "#1E1E1E",
														"fontFamily": "Mulish", "fontSize": "14px", "fontStyle": "normal", "fontWeight": "700", "lineHeight": "24px", "letterSpacing": "0em", "textAlign": "left"
													}} className="ml-5 mt-3">ID: {mark.warehouseId}</p>
													<div className="row ml-3">
														<div className="col-4">
															<span style={{
																color: "#1E1E1E",
																"fontFamily": "Muli", "fontSize": "11px", "fontStyle": "normal", "fontWeight": "500", "lineHeight": "24px", "letterSpacing": "0em", "textAlign": "left"
															}}>Location: </span>
														</div>
														<div className="col-8">
															<span style={{
																color: "#989898",
																"fontFamily": "Muli", "fontSize": "9.5px", "fontStyle": "normal", "fontWeight": "500", "lineHeight": "24px", "letterSpacing": "0em", "textAlign": "left"
															}}>{mark?.location}</span>

														</div>
													</div>

													<div className="row ml-3">
														<div className="col-4">
															<span style={{
																color: "#1E1E1E",
																"fontFamily": "Muli", "fontSize": "11px", "fontStyle": "normal", "fontWeight": "500", "lineHeight": "24px", "letterSpacing": "0em", "textAlign": "left"
															}}> Category</span>
														</div>
														<div className="col-8">
															<span style={{
																color: "#989898",
																"fontFamily": "Muli", "fontSize": "9.5px", "fontStyle": "normal", "fontWeight": "500", "lineHeight": "24px", "letterSpacing": "0em", "textAlign": "left"
															}}>{mark?.category.categoryName}</span>

														</div>
													</div>

													<div className="row ml-3">
														<div className="col-4">
															<span style={{
																color: "#1E1E1E",
																"fontFamily": "Muli", "fontSize": "11px", "fontStyle": "normal", "fontWeight": "500", "lineHeight": "24px", "letterSpacing": "0em", "textAlign": "left"
															}}> Type</span>
														</div>
														<div className="col-8">
															<span style={{
																color: "#989898",
																"fontFamily": "Muli", "fontSize": "9.5px", "fontStyle": "normal", "fontWeight": "500", "lineHeight": "24px", "letterSpacing": "0em", "textAlign": "left"
															}}>{mark?.type.type}</span>

														</div>
													</div>
													<div className="row ml-3">
														<div className="col-4">
															<span style={{
																color: "#1E1E1E",
																"fontFamily": "Muli", "fontSize": "11px", "fontStyle": "normal", "fontWeight": "500", "lineHeight": "24px", "letterSpacing": "0em", "textAlign": "left"
															}}>  Area</span>
														</div>
														<div className="col-8">
															<span style={{
																color: "#989898",
																"fontFamily": "Muli", "fontSize": "9.5px", "fontStyle": "normal", "fontWeight": "500", "lineHeight": "24px", "letterSpacing": "0em", "textAlign": "left"
															}}>{mark?.totalArea} sq.ft.</span>

														</div>
													</div>
												</div>
											</div>
										</div>
									</InfoWindow>
									) : null}


									<Marker google={this.props.google}
										name={'Dolores park'}
										onClick={() => this.handleToggleOpen(index, mark.lat, mark.lng)}
										// draggable={true}
										// onDragEnd={ this.onMarkerDragEnd }
										position={mark}
									/>
								</>
							))}
							{/* For Auto complete Search Box */}

						</GoogleMap>

					</div>
				)
			)
		);


		let map;
		if (this.props.center.lat !== undefined) {
			map = <div class="business-details">
				<div >
					<AsyncMap
						googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
						loadingElement={
							<div style={{ height: `100vh` }} />
						}
						containerElement={
							<div style={{ height: this.props.height }} />
						}
						mapElement={
							<div style={{ height: `100vh`, width: `100%` }} />
						}
					/>

				</div>


			</div>
		} else {
			map = <div style={{ height: this.props.height }} />
		}
		return (map)
	}
}
export default Map
