import React from "react";
import colorData from "./colorData";

export default function App(){

  const [dvdLogo, setDvdLogo] = React.useState({
    positionX : 0,
    positionY : 0,
    velocityX : 0,
    velocityY : 0,
    color: "white"
  })

  // set initial position and velocity
  React.useEffect(() => {
    const signVelocityX = [-1, 1];
    const signVelocityY = [-1, 1];
    const initVelocityX = (Math.random() * 2 * signVelocityX[Math.round(Math.random())]);
    const initVelocityY = (Math.sqrt(4 - (initVelocityX * initVelocityX)) * signVelocityY[Math.round(Math.random())]);
    setDvdLogo(prevValue => ({...prevValue, 
      positionX : Math.floor(Math.random() * (window.innerWidth - 180)),
      positionY : Math.floor(Math.random() * (window.innerHeight - 180)),
      velocityX : initVelocityX,
      velocityY : initVelocityY
    }))
  }, [])

  // set initial dvd's color
  React.useEffect(() => {
    const keys = Object.keys(colorData);
    const idxKeys = Math.floor(Math.random() * keys.length);  // this is a number
    setDvdLogo(prevValue => ({...prevValue, 
      color: colorData[keys[idxKeys]]
    }))
  }, [])

  // continuously move the dvd
  React.useEffect(() => {
    const oneInterval = setInterval(() => {
      setDvdLogo(prevValue => ({...prevValue, 
        positionX: prevValue.positionX + prevValue.velocityX,
        positionY: prevValue.positionY + prevValue.velocityY
      }))
    }, 15)
  
    return () => clearInterval(oneInterval)
  }, [dvdLogo.velocityX || dvdLogo.velocityY])

  // change the velocity
  React.useEffect(() => {
    if(
      dvdLogo.positionX + dvdLogo.velocityX >= (window.innerWidth - 180) ||
      dvdLogo.positionX + dvdLogo.velocityX <= 0){
        setDvdLogo(prevValue => ({...prevValue, 
          velocityX : -1 * prevValue.velocityX
        }))
      }
    
    if(
      dvdLogo.positionY + dvdLogo.velocityY >= (window.innerHeight - 80) ||
      dvdLogo.positionY + dvdLogo.velocityY <= 0) {
        setDvdLogo(prevValue => ({...prevValue,
          velocityY : -1 * prevValue.velocityY
        }))
      }
  })

  // change the color when it bounces
  React.useEffect(() => {
    const keys = Object.keys(colorData);
    let idxKeys;

    do {
      idxKeys = Math.floor(Math.random() * keys.length);  // this is a number
    }
    while(colorData[keys[idxKeys]] === dvdLogo.color);

    setDvdLogo(prevValue => ({...prevValue, 
      color: colorData[keys[idxKeys]]
    }))
  },
[dvdLogo.velocityX, dvdLogo.velocityY])

  return(
    <div>
      <img src='/DVD_logo.png' alt="dvdLogo"
      style={{
        position:"absolute",
        backgroundColor: "transparent",
        top:`${dvdLogo.positionY}px`,
        left:`${dvdLogo.positionX}px`,
        width:"180px",
        filter: `${dvdLogo.color}`}}/>
    </div>
  )
}