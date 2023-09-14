import React, { Component, useCallback } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';

import { GoogleMapsAPI } from './clientconfig';
import { useField } from 'formik';
Geocode.setApiKey( GoogleMapsAPI );
Geocode.enableDebug();

class Map extends Component{
	constructor( props ) {
		super( props );
        console.log("dshjsd",this.props.google)
		this.state = {
			address: '',
			city: '',
			openInfoWindowMarkerId: ''
,
            marks:this.props.latlng,
			area: '',
			state: '',
      pincode:'',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			}
		}
	}

    
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
    localStorage.setItem("latitude",this.state.mapPosition.lat)
    localStorage.setItem("longitude", this.state.mapPosition.lng)
		Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray ),
              pincode=this.getPincode(addressArray)
              localStorage.setItem("Address",address)
             localStorage.setItem("City",city)
             localStorage.setItem("Area",area)
             localStorage.setItem("state",state)
             localStorage.setItem("PinCode",pincode)
				console.log( 'city', address );

				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
          pincode: ( pincode ) ? pincode : '',

					state: ( state ) ? state : '',
				} )
			},
			error => {
				console.error( error );
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
	shouldComponentUpdate( nextProps, nextState ){
		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.area !== nextState.area ||
			this.state.state !== nextState.state||
      this.state.pincode !== nextState.pincode
		) {
			return true
		} else if ( this.props.center.lat === nextProps.center.lat ){
			return false
		}
	}
	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCity = ( addressArray ) => {
		let city = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
				city = addressArray[ i ].long_name;
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
	getArea = ( addressArray ) => {
		let area = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0]  ) {
				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
					if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
						area = addressArray[ i ].long_name;
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
	getState = ( addressArray ) => {
		let state = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
					state = addressArray[ i ].long_name;
					return state;
				}
			}
		}
	};
    getPincode = ( addressArray ) => {
		let pincode = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'postal_code' === addressArray[ i ].types[0] ) {
					pincode = addressArray[ i ].long_name;
					return pincode;
				}
			}
		}
	};
	/**
	 * And function for city,state and address input
	 * @param event
	 */
	onChange = ( event ) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = ( event ) => {

	};
    InfoWindowaddress=(lat,lng)=>{
       let add='rohan'
    Geocode.fromLatLng( lat , lng ).then(
        response => {
			console.log("fjjdfj",response)
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
	onMarkerDragEnd = ( event ) => {
		let newLat = event.latLng.lat(),
		    newLng = event.latLng.lng();
        
        this.setNewValue(newLat, newLng);
        localStorage.setItem("latitude",newLat)
        localStorage.setItem("longitude", newLng)
		Geocode.fromLatLng( newLat , newLng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray ),
              pincode=this.getPincode(addressArray)
              console.log( 'city', this.getPincode(addressArray) );
              localStorage.setItem("Address",address)
              localStorage.setItem("City",city)
              localStorage.setItem("Area",area)
              localStorage.setItem("state",state)
              localStorage.setItem("PinCode",pincode)
				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
          pincode:(pincode)?pincode:'',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				} )
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
	onPlaceSelected = ( place ) => {
		console.log( 'plc', place );
 
		const address = place.formatted_address,

		      addressArray =  place.address_components,
		      city = this.getCity( addressArray ),
		      area = this.getArea( addressArray ),
		      state = this.getState( addressArray ),
          pincode=this.getPincode(addressArray),
		      latValue = place.geometry.location.lat(),
		      lngValue = place.geometry.location.lng();
			  this.setNewValue(latValue, lngValue);

          localStorage.setItem("latitude",latValue)
    localStorage.setItem("longitude", lngValue)
          console.log( 'city', this.getPincode(addressArray) );
          localStorage.setItem("Address",address)
          localStorage.setItem("City",city)
          localStorage.setItem("Area",area)
          localStorage.setItem("state",state)
          localStorage.setItem("PinCode",pincode)
		// Set these values in the state.
		this.setState({
			address: ( address ) ? address : '',
			area: ( area ) ? area : '',
			city: ( city ) ? city : '',
			state: ( state ) ? state : '',
      pincode: ( pincode ) ? pincode : '',

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

	handleToggleOpen = (markerId,lat,lng) => {
		console.log("here")
		Geocode.fromLatLng( lat , lng ).then(
			response => {
				 // eslint-disable-next-line
				const address = response.results[0].formatted_address,
				addressArray =  response.results[0].address_components,
				area = this.getArea( addressArray )
				// let   area = this.getArea( response.results[0].formatted_address )
				this.setState({
					openInfoWindowMarkerId: markerId,
					address:area
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
	
    setNewValue(lat, lng) {
        this.props.setNewValue({ lat, lng });
    }
    
    render(){
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
                    <div>
                  
				  <div style={{marginBottom:"15px"}}>
          <Autocomplete
		          ref={this.myRef}

          className={'form-control form-control-round'}
          onPlaceSelected={ this.onPlaceSelected }
          options={{
            // location: new google.maps.LatLng(-34, 151),
            // radius: 2000,
            // types: ['address']

            // location: "28.6429, 77.3402",
            // radius: "20", //100 km
            // components: "country:in", // country name
            // strictbounds: true,
        //  location :"28.6429, 77.3402",
        //     radius: 20,
        //     types: ['geocode'],
        //     strictbounds:true
		types: ['address'],          componentRestrictions: { country: "in" },
          }}
        />
		</div>
                          <GoogleMap 
                                     defaultZoom={ this.props.zoom }
                                     defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                          >
                              {/* InfoWindow on top of marker */}
                              <InfoWindow
                                  onClose={this.onInfoWindowClose}
                                  position={{ lat: ( this.state.markerPosition.lat - 0.0018 ), lng: this.state.markerPosition.lng }}
                              >
                                  <div>
                                      <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
                                  </div>
                              </InfoWindow>
                              {/*Marker*/}
                              <Marker
                                      name={'Dolores park'}
                                      draggable={true}
                                      onDragEnd={ this.onMarkerDragEnd }
                                      position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                              />
                              <Marker />
                              {/* For Auto complete Search Box */}
                          
                          </GoogleMap>
                          </div>
                
				)
			)
		);
		let map;
		if( this.props.center.lat !== undefined ) {
			map = <div className="business-details">
				<div >
        <AsyncMap
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
					loadingElement={
						<div style={{ height: `242%` }} />
					}
					containerElement={
						<div style={{ height: this.props.height }} />
					}
					mapElement={
						<div style={{ height: `242%`,width:`100%` }} />
					}
				/>
				
				</div>

			
			</div>
		} else {
			map = <div style={{height: this.props.height}} />
		}
		return( map )
	}
}
export default Map

export const FMap = (props) => {
    // eslint-disable-next-line
    const [latField, latMeta, latHelpers] = useField(props.latName);
    // eslint-disable-next-line
    const [lngField, lngMeta, lngHelpers] = useField(props.lngName);
// eslint-disable-next-line
    const { value: latValue } = latMeta;
    const { setValue: setLatValue } = latHelpers;
// eslint-disable-next-line
    const { value: lngValue } = lngMeta;
    const { setValue: setLngValue } = lngHelpers;
// eslint-disable-next-line
    const setNewValues = useCallback(({ lat, lng }) => {
        setLatValue(lat);
        setLngValue(lng);
    });

    return <Map {...props} setNewValue={setNewValues} />
}