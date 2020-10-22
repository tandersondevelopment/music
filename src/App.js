import React, { useState } from 'react';
import ReactPlayer from "react-player"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import soundcloud from './data/soundcloud.json';
import Chirbit from './components/Chirbit';


function App() {
  const [activeSong, setActiveSong] = useState("");

  return (
    <div className="Window">
      <Jumbotron fluid className="Centered">
        <h1>Welcome to the musical stylings of Troy Anderson (Neo Resolution)!</h1>
        <p>
          Used to test consume APIs and self host some of my music but still allow access to others :D
        </p>
        <ButtonGroup size="lg">
          <Button 
            variant="dark" 
            href="https://soundcloud.com/neo-resolution" 
            target="_blank">
              SoundCloud
          </Button>
          <Button
            variant="dark"
            href="https://www.mixcloud.com/NeoResolution"
            target="_blank">
              MixCloud
          </Button>
          <Button
            variant="dark"
            href="https://www.chirbit.com/Neoresolution"
            target="_blank">
              Chirbit
          </Button>
          <Button
            variant="dark"
            href="https://www.facebook.com/Neo-Resolution-520702754640065"
            target="_blank">
              Facebook
          </Button>        
        </ButtonGroup>
      </Jumbotron>
      <div className="ExtraCentered">
        { activeSong.length > 0 && 
            <ReactPlayer url={activeSong} playing className="ExtraCentered"/>
        }
      </div>
      <Tabs defaultActiveKey="soundCloud">
        <Tab eventKey="hosted" title="Self Hosted">
          <h4>
            This is where all my music will be from now on because I do not want to deal 
            with paying for the cost of a service (like SoundCloud) and I also do have a
            server just sitting here anyways. So this is likely to be the place that tracks
            will be added from now on. It will also at some point contain the entirety of
            all of my music.
          </h4>                  
        </Tab>
        <Tab eventKey="soundCloud" title="SoundCloud" className="SoundCloudTab">
          <Alert className="Centered" style={{ background: "#ff7700", padding: "25px 50px 25px 50px" }}>
            <Alert.Heading>
              Here are the tracks that are left on SoundCloud after they have removed many of them
              and also lowered the maximum data I am allowed to have on a free account. I do not
              endorse most of this music as I think most of it isn't that good and in all honesty
              is kind of embarassing; however, much of it was created before I was an adult.... so...
              I think that should be taken into acccount when listening to the trash. BTW I know
              this color is atrocious but this is the color that SoundCloud chose!
            </Alert.Heading>
          </Alert>
          <div className="flex-container">
          {
            soundcloud.map((item) => {
              return (
                <Card style={{ width: '18rem'}}>
                  <Card.Img variant="top" src={item.artwork_url} />                  
                  <Button variant="warning" onClick={() => setActiveSong(item.uri)}>
                      Play!
                  </Button>
                  <Alert variant="secondary" className = "Centered" style={{ padding: "10px 0px 10px 0x" }}>{item.genre}</Alert>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>                  
                </Card>                
              )
            })
          }
          </div>           
        </Tab>
        <Tab eventKey="mixCloud" title="MixCloud">
          As the name suggests this is for only mixes. They don't seem to have problems with
          copywrites. I will probably continue to update this in the future if I release any more.
        </Tab>
        <Tab eventKey="chirbit" title="Chirbit">
          <div>
            This was a solution to get rid of SoundCloud at one point but I ended up abandoning it
            rather quickly since there was no community around it and the UI was poor.
          </div>
          <Chirbit/>
        </Tab>        
      </Tabs>
    </div>
  );
}

export default App;
