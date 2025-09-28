import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} =useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTlmZTg2NzQ3MDNkNDFjZTVmMGQ2YzU1YWYxMWQwOCIsIm5iZiI6MTc1ODk4OTMxMS4yMzksInN1YiI6IjY4ZDgwYmZmM2Y0OTM1N2E0NmI5OTc3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vhlJjSLgeO77W2dHsbgaEfHSSeFIqrFKNNHk5l8TT88'
    }
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(data => {
        console.log(data) // 👈 check in browser console
        if (data.results && data.results.length > 0) {
          setApiData(data.results[0]) // ✅ fix
        }
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="back" onClick={()=>{navigate(-2)}}/>
      <iframe
        width='90%'
        height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer'
        frameBorder='0'
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
