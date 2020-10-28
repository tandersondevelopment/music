import React, { Component } from 'react';
import chirbit from '../data/chirbit.json'
import './Chirbit.css';

//Note: Chirbit has no API so we have to use a manually created JSON file
export default class Chirbit extends Component {
    render() {
        return(
          <div className="flex-container">
            {
            chirbit.map((item) => {
              return (
                <iframe 
                  className="item"
                  key={item.id} 
                  title={item.id} 
                  src={item.url} 
                  scrolling="NO" 
                  frameBorder="0">
                    If you can not see this chirbit, listen to it here {item.url}
                </iframe>
              )
            })
          }
          </div>
        )
      }
}