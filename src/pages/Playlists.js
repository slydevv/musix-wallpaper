import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { accessToken, getAllPlaylist } from '../spotify';


export default function Playlists() {
  const [token, setToken] = useState(null)
  const [playlists, setPlaylists] = useState([])
 
  const navigate = useNavigate()

  useEffect(() => {
    setToken(accessToken); 
      const fetchPlaylist = async () => {
        try{
          const {data} = await getAllPlaylist();
          setPlaylists(data.items)
          console.log(playlists)
        }catch (error){
          console.log(error)
        }
      
      }
    
    fetchPlaylist()
  }, [playlists])
 
  return (
    
    <div className='mx-4 px-2'>
      
      <h2 className='text-center text-2xl underline'>Choose a Playlist</h2>
      <p className='font-display text-center'>Click on a playlist and we would select random songs from that playlist to create your wallpaper</p>
     
       {!token ? <Link to='/login' >login here</Link>: 
       <div>
          {playlists.length ? <div  className=' py-8 grid grid-cols-3 gap-3 my-5'>{ playlists && playlists.map( playlist => (
           
            <div className='bg-gray-700 rounded-md  my-4 lg:w-72 hover:bg-gray-500  lg:mx-auto ' key={playlist.id}>
              <div onClick={() => navigate(`/playlists/${playlist.id}`)}>
                <h2  className='text-center font-display text-xl p-1 truncate '>{playlist.name}</h2>
                {playlist.images.length && playlist.images[0] && (
                      <div className=" lg:flex lg:justify-center">
                        <img className='shadow-2xl rounded-lg lg:h-56 lg:w-56' src={playlist.images[0].url} alt={playlist.name} />
                      </div>
                    )}
                <h6 className='text-center text-xs p-1 font-basic'>Tracks:{playlist.tracks.total}</h6>
              </div>
            
            </div>
            
          ) 
          
          )}</div>:<div >
            <h3 className='text-center'>Loading...</h3>
            <small className='text-center'>Please refresh the page if this taking longer than usual</small> 
            </div>}
     </div>
     }
    </div>
   
    
  )
}
