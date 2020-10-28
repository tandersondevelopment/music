import React from 'react'
import './JumboImage.css';

//This was stolen a bit from https://codepen.io/waltir/pen/prGZPp
export default function JumboImage(props) {
    return(
        <div id="cover">        
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="title display-3 text-center" style={{weight:100}}>
                The Music of Troy Anderson
            </h1>
            <p class="lead string-1 text-center">
                A portfolio of my music from age 12 to now.
            </p>
            <div className="center">
                <a 
                href="https://soundcloud.com/neo-resolution"
                rel="noopener noreferrer"
                target="_blank">
                    <button class="btn btn-outline-primary">SoundCloud</button>
                </a>
                <a 
                href="https://www.mixcloud.com/NeoResolution"
                rel="noopener noreferrer"
                target="_blank">
                    <button class="btn btn-outline-primary">MixCloud</button>
                </a>
                <a 
                href="https://www.chirbit.com/Neoresolution"
                rel="noopener noreferrer"
                target="_blank">
                    <button class="btn btn-outline-primary">Chirbit</button>
                </a>
                <a 
                href="https://www.youtube.com/user/Neoresolution"
                rel="noopener noreferrer"
                target="_blank">
                    <button class="btn btn-outline-primary">YouTube</button>
                </a>
                <a 
                href="https://www.facebook.com/Neo-Resolution-520702754640065"
                rel="noopener noreferrer"
                target="_blank">
                    <button class="btn btn-outline-primary">Facebook</button>
                </a>                
            </div>
          </div>
        </div>
      </div>
    )
}