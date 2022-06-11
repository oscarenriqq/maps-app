import { useEffect, useState, useRef } from "react"
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import DirectionStack from "./DirectionStack";
import Alert from "./Alert";

function Maps() {

    const ZOOM = 12
    const COST = 0.85
    const originRef = useRef()
    const destinationRef = useRef()

    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [showRideInfo, setShowRideInfo] = useState(false)
    const [distanceRide, setDistanceRide] = useState(null)
    const [durationRide, setDurationRide] = useState(null)
    const [costRide, setCostRide] = useState(null)
    const [showError, setShowError] = useState(false)
    const [libraries] = useState(['places', 'directions'])

    const [userCoords, setUserCoords] = useState({
        lat: 8.98295083777963,
        lng: -79.5204152450319
    })

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries
    })  

    const options = {
        disableDoubleClickZoom: true,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
    }

    const containerStyle = {
        width: '100%',
        height: '600px',
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setUserCoords({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        });
    }, [])

    const handleCloseAlert = () => {
        setShowError(!showError)
    }

    const handleCalculateClick = () => {

        if (originRef.current.value === "" || destinationRef.current.value === "") {
            setShowError(true)
            return
        }

        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
        })

        results.then((data) => {

            const total = parseFloat(COST * (data.routes[0].legs[0].duration.value / 60)).toFixed(2)
            
            setDirectionsResponse(data)
            setDurationRide(data.routes[0].legs[0].duration.text)
            setDistanceRide(data.routes[0].legs[0].distance.text)
            setCostRide(total)
            setShowRideInfo(true)
        })
    }

    if (!isLoaded) {
        return <h1 className="display-6">Loading Google Maps...</h1>
    }

    return (
        <>
            {showError && <Alert handleCloseAlert={handleCloseAlert} />}
            <GoogleMap
                options={options}
                mapContainerStyle={containerStyle}
                center={userCoords}
                zoom={ZOOM}
            >
                <DirectionStack 
                    originRef={originRef} 
                    destinationRef={destinationRef} 
                    handleCalculateClick={handleCalculateClick}
                    showRideInfo={showRideInfo}
                    distanceRide={distanceRide}
                    durationRide={durationRide}
                    costRide={costRide}
                />
                <Marker position={userCoords} />
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} /> }
            </GoogleMap>
        </>
    )
}

export default Maps

