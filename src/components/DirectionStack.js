import { Autocomplete } from '@react-google-maps/api';
import car from '../assets/car.png'

function DirectionStack (props) {

    return (
        <>
            <div className='direction-stack boxes-geo'>
                <div className='mb-3'>
                    <label className='form-label'>¿From where yo want to start your ride?</label>
                    <Autocomplete>
                        <input type='text' className='form-control' id='fromInput' placeholder='From' ref={props.originRef} />
                    </Autocomplete>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>¿Where do you want to go?</label>
                    <Autocomplete>
                        <input type='text' className='form-control' id='destinationInput' placeholder='Destination' ref={props.destinationRef} />
                    </Autocomplete>
                </div>
                <div className='d-flex justify-content-between'>
                    <button type='submit' className='btn btn-primary' onClick={props.handleCalculateClick}>Calculate</button>
                </div>
            </div>
            <div className={`ride-info-stack boxes-geo ${props.showRideInfo ? 'open' : ''}`}>
                <div className='ride-info-header d-flex justify-content-between align-items-center px-2 pt-2'>
                    <section>
                        <p className='h6'>Ride info</p>
                        <small>$0.85 per minute.</small>
                    </section>
                    <img className='me-2' src={car} alt="Car"/>
                </div>
                <hr className='mt-2'/>
                <div className='ride-details px-2'>
                    <div className='d-flex justify-content-between'>
                        <p>Distance</p>
                        <p>{props.distanceRide}</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Duration</p>
                        <p>{props.durationRide}</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Cost</p>
                        <p>{`$${props.costRide}`}</p>
                    </div>
                </div>
            </div>
        </>
        
    )

}

export default DirectionStack