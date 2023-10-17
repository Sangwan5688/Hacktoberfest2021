import React, { useState, useEffect } from 'react';
import PlayerSprite from '../Images/player-placeholder.png'

export default function GameScene(props) {

    return (
        <section className='game-scene'>
            <div className='enemy-section'></div>
            <div className='player-section'>
                <div className='player'>
                    <div className='player-info'>
                        <h3>Player name</h3>
                        <div className='player-health bar'></div>
                        <div className='player-mana bar'></div>
                    </div>
                    <div className='player-sprite'>
                        <img src={PlayerSprite}></img>
                    </div>
                </div>
                <div className='player-speech-bubble'></div>
            </div>
        </section>
    )


}