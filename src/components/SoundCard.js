import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './SoundCard.css';

export default function SoundCard(props) {

    return (
        <Card className="card" key={props.title}>
            <Card.Img variant="top" src={props.imageUrl} />                  
            <Button 
              variant="primary"
              style={{width: "100%"}}
              onClick={() => props.setActiveSong(props.songUrl)}>
                Play!
            </Button>
            <Alert variant="secondary" className="alert">{props.genre}</Alert>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.description}</Card.Text>                  
        </Card>
    )
}

SoundCard.propTypes = {
    description: PropTypes.string,
    genre: PropTypes.string,
    imageUrl: PropTypes.string,
    setActiveSong: PropTypes.func,
    songUrl: PropTypes.string,
    title: PropTypes.string
}

SoundCard.defaultProps = {
    description: "",
    genre: "Unkown",
    imageUrl: "",
    setActiveSong: () => {},
    songUrl: "",
    title: "Unknown",
}