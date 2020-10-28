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

function App() {
  const [activeSong, setActiveSong] = useState("");
  const [activeTab, setActiveTab] = useState("");

  const SelfHostedText = `This is where all my music will be from now on because I do not want to deal 
  with paying for the cost of a service (like SoundCloud) and I also do have a
  server just sitting here anyways. So this is likely to be the place that tracks
  will be added from now on. It will also at some point contain the entirety of
  all of my music.`

  const SoundCloudText = `Here are the tracks that are left on SoundCloud after they have removed many of them
    and also lowered the maximum data I am allowed to have on a free account. I do not
    endorse most of this music as I think most of it isn't that good and in all honesty
    is kind of embarassing; however, much of it was created before I was an adult.... so...
    I think that should be taken into acccount when listening to the trash.`

  const ChirbitText = `This was a solution to get rid of SoundCloud at one point but I ended up abandoning it
  rather quickly since there was no community around it and the UI was poor.
  Also I have to use their embedded player and they have no API... so that sucks.`

  const MixCloudText = `As the name suggests this is for only mixes. They don't seem to have problems with
  copywrites. I will probably continue to update this in the future if I release any more.
  Additionally: for some reason the player has a hard time swapping songs. So if it doesn't load try it again.`

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
            text={SelfHostedText}
          />                 
        </Tab>
        <Tab eventKey="soundCloud" title="SoundCloud" className="tab">
          <TabBody
            text={SoundCloudText} 
            getApiData={getSoundCloudData}
          />      
        </Tab>
        <Tab eventKey="mixCloud" title="MixCloud" className="tab">
          <TabBody
            text={MixCloudText}
            getApiData={getMixCloudData}
          />
        </Tab>
        <Tab eventKey="chirbit" title="Chirbit" className="tab">
          <Alert className="alert">
              <Alert.Heading>{ChirbitText}</Alert.Heading>
          </Alert>
          <Chirbit/>
        </Tab>        
      </Tabs>
    </div>
  );
}

export default App;
