import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Alert from 'react-bootstrap/Alert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import soundcloud from './data/soundcloud.json';
import Chirbit from './components/Chirbit';
import JumboImage from './components/JumboImage';
import TabBody from './components/TabBody';
import * as Constants from './constants';

function App() {
  const [activeSong, setActiveSong] = useState("");
  const [activeTab, setActiveTab] = useState("");

  /*
    Note: Soundcloud does not allow getting a client id anymore.
    While I did use one that someone negligently posted on a forum
    to pull my data via the users/{userId}/tracks endpoint I am
    using the json output of that call and not using someone else's
    client id in my application.
   */
  function getSoundCloudData() {
    return soundcloud.map((item) => {
      return {
        description: item.description,
        genre: item.genre,
        imageUrl: item.artwork_url,
        setActiveSong: activateNewSong,
        songUrl: item.uri,
        title: item.title
      }
    });
  }

  const getMixCloudData = async () => {
    let output = [];
    await fetch("https://api.mixcloud.com/search/?q=neoresolution&type=cloudcast")
        .then(response => response.json())
        .then((result) => {
            if (result && result.data && result.data.length > 0) {
                 output = result.data.map((item) => {
                  return {
                    description: "",
                    genre: "Mixtape",
                    imageUrl: item.pictures.medium,
                    setActiveSong: activateNewSong,
                    songUrl: item.url,
                    title: item.name
                  }
                })
            }
        });
    return output;
  }

  function tabClicked(key) {
    setActiveTab(key);
    setActiveSong("");
  }

  function activateNewSong(url) {
    if (activeTab === "mixCloud" && activeSong.length > 0) {
      // MixCloud is rejecting if clicking too quickly so maybe sleep will help?
      setTimeout(() => {setActiveSong(url);}, 2000);
    } else {
      setActiveSong(url);
    }    
  }

  return (
    <div className="Window">
      {JumboImage()}
      <div className="extra-centered">
        { activeSong.length > 0 && 
            <ReactPlayer className="react-player" playing stopOnUnmount height="180px" width="100%" url={activeSong} />
        }
      </div>
      <Tabs defaultActiveKey="soundCloud" onSelect={tabClicked}>
        <Tab eventKey="hosted" title="Self Hosted">
          <TabBody 
            text={Constants.SELF_HOSTED}
          />                 
        </Tab>
        <Tab eventKey="soundCloud" title="SoundCloud" className="tab">
          <TabBody
            text={Constants.SOUNDCLOUD} 
            getApiData={getSoundCloudData}
          />      
        </Tab>
        <Tab eventKey="mixCloud" title="MixCloud" className="tab">
          <TabBody
            text={Constants.MIXCLOUD}
            getApiData={getMixCloudData}
          />
        </Tab>
        <Tab eventKey="chirbit" title="Chirbit" className="tab">
          <Alert className="alert">
              <Alert.Heading>{Constants.CHIRBIT}</Alert.Heading>
          </Alert>
          <Chirbit/>
        </Tab>        
      </Tabs>
    </div>
  );
}

export default App;
