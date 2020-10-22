import React, { Component } from 'react';
import chirbit from '../data/chirbit.json'
import './Chirbit.css';

export default class Chirbit extends Component {
    render() {
        return(
          <div className="flex-container">
            {
            chirbit.map((item) => {
              return (
                <iframe className="Item" title={item.id} src={item.url} scrolling="NO" frameborder="0">
                    If you can not see this chirbit, listen to it here {item.url}
                </iframe>
              )
            })
          }
          </div>
        )
      }
}