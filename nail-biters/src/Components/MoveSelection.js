import React, { useState, useEffect } from 'react';
import Move from './Move';

export default function MoveSelection(props) {

    const moves = [1, 2, 3, 4]

    const moveElements = moves.map(move => 
        <Move 
            key={move} 
            moveNumber={move}
        />
    )

    return (
        <section className='move-selection'>
          <div className='move-grid'>
            {moveElements}
          </div>
        </section>
    )


}