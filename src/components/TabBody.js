import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert'
import SoundCard from './SoundCard';
import './TabBody.css';

export default function TabBody(props) {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        async function getData() {
            const result = await props.getApiData();
            setApiData(result);
        }
        getData();
    }, [props]);

    

    return(
        <div>
            <Alert className="alert">
                <Alert.Heading>
                    {props.text}
                </Alert.Heading>
            </Alert>  
            <div className="flex-container">
                {
                    apiData && apiData.map((item) => {
                        return(
                            SoundCard(item)
                        )
                    })
                }
            </div>
        </div>        
    )
}

TabBody.propTypes = {
    getApiData: PropTypes.func,
    text: PropTypes.string,
}

TabBody.defaultProps = {
    getApiData: () => { return [] },
    text: "Not Provided",
}