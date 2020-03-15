import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import { Input } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import ls from 'local-storage';

export default function InputAutocomplete(props) {

    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    });

    const sendDataToParent = (val) => {
        props.getVal(val);
    }

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        // console.log(latLng['lat']);
        setAddress(value);
        setCoordinates(latLng);
        ls.set('destination', value);
        ls.set('latLng', latLng);
        sendDataToParent([value, latLng]);
    };

    return (
        <div>
            <PlacesAutocomplete 
                value={address} 
                onChange={setAddress} 
                onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <Input {...getInputProps({placeholder:"Select Destination"}) } size="large"  prefix={<RightCircleOutlined />}/>
                <div>
                    { loading ? <div>...loading</div> : null}
                    { suggestions.map(suggestion => {
                        const style = {
                            backgroundColor: suggestion.active ? "#6783AB" : "#fff"
                        }
                        return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
                    }) }
                </div>
            </div>
            )}
            </PlacesAutocomplete>
        </div>
    );
}
