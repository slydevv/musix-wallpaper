import React, { useState } from 'react'

export default function CustomWallpaper() {
    const [pic, setPic] = useState([])

    const handleChange = (e) => {
        console.log(e.target.files);
        setPic(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <div> <input type='file' onChange={handleChange} /></div>
  )
}
