import React from 'react';
import {useState, useEffect} from 'react';
import Structureclock from './Structureclock';


const Clock = ({timezone}) => {
  const [hourhand, setHourhand] = useState(() => {
    const styles = {
      '--rotation': 360
    }
    return styles
  })
  const [minuteshand, setminuteshand] = useState(() => {
    const styles = {
      '--rotation': 360
    }
    return styles
  })
  const [sechand, setSecchand] = useState(() => {
    const styles = {
      '--rotation': 360
    }
    return styles
  })

  const setClock = () => {
    const calc = timezone / 3600
    const now = new Date()
    const utcTime = now.getTime()
    const timeZoneOffset = calc * 60 * 60 * 1000
    const currentUTC = utcTime + timeZoneOffset
    const date = new Date(currentUTC)

    setSecchand(() => {
      const secondsRatio = date.getUTCSeconds() / 60
      const styles = {
        '--rotation': secondsRatio * 360
      }
      return styles
    })

    setminuteshand(() => {
      const minutesRatio = ((date.getUTCSeconds() / 60) + date.getUTCMinutes()) / 60
      const styles = {
        '--rotation': minutesRatio * 360
      }
      return styles
    })

    setHourhand(() => {
      const hourHand = ((date.getUTCMinutes() / 60) + date.getUTCHours()) / 12
      const styles = {
        '--rotation': hourHand * 360
      }
      return styles
    })
  }

useEffect(() => {
  const timer = setInterval(setClock, 1000)
  return (() => {
    clearInterval(timer)
  })
}, [timezone])

  return (
    <div>
        <Structureclock hourhand={hourhand} sechand={sechand} minuteshand={minuteshand}/>
    </div>
  )
}

export default Clock;