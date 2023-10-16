import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    // const stylesImages = {
    //     width:10;
    //     height:10;
    // }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num"><img style={{width: 50, height: 50}} src={props.value}/></h2>
        </div>
    )
}