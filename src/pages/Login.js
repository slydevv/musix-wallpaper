import { useEffect, useState } from 'react'
import React from 'react'
import { accessToken, logout, getUserProfile, getAllPlaylist, getTopTracks } from '../spotify';
import { Link } from 'react-router-dom';
import newCover from '../assets/newCover.jpg'


export default function Login() {
  const [token, setToken] = useState(null)
  const [profile, setProfile] = useState('')
  const [topTracks, setTopTracks] = useState([])
  const [playlists, setPlaylists] = useState([])
  const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://musix-wallpaper-api.onrender.com/login';

  

    useEffect(() => {
      setToken(accessToken)

      const fetchData = async () => {
        try{
          const {data} = await getUserProfile();
          setProfile(data)
          console.log(data)
        }catch (error){
          console.log(error)
        }
      }
      const fetchTopTracks = async () => {
        try{
          const {data} = await getTopTracks();
          setTopTracks(data.items)
          console.log(topTracks)
        }catch (error){ 
          console.log(error)
        }
      
      }

      const fetchPlaylist = async () => {
        try{
          const {data} = await getAllPlaylist();
          const list = data.items
          const shuffled =  list.sort(() => 0.5 - Math.random());
          const topThree =  shuffled.slice(0, 3); 
          setPlaylists(topThree)
        }catch (error){
          console.log(error)
        }
      }
      
      fetchTopTracks();
      fetchData()
      fetchPlaylist()
    }, [])
    
  return (
    <div className="bg-black px-5 pb-8">
      { !token ? 
      <div >
       <div className='lg:grid lg:grid-cols-2 py-10'> 
          <div className='lg:px-10'> 
            <h2 className='text-4xl lg:text-7xl text-left font-extrabold font-display leading-[55px]'>
              Create unique Music wallpaper based on your Favorite Playlist</h2>
              <div className='lg:my-12 hidden md:block lg:block'><a className='bg-pry py-3 px-6 rounded-lg text-lg font-bold ' href={LOGIN_URI}>Login with spotify</a></div>
          </div>
          <div className='drop-shadow-md hidden lg:block lg:px-16'>
            <img  src={newCover}/>
          </div>
        </div>
        {/* mobile btn */}
        <div className='lg:my-12 md:hidden lg:hidden flex justify-center'><a className='bg-pry py-3 px-6 rounded-lg text-lg font-bold' href={LOGIN_URI}>Login with spotify</a></div>

        <div className='my-16 text-center'>
          
            <section className='bg-gray-800 my-10 font-basic lg:m-[25px]'>
              <h3 className='text-3xl font-extrabold py-4'>It's Easy to Create</h3>
              <h5 className='text-base'>Follow the steps below and create your music wallpaper using your own playlist</h5>
              <div className='mx-7 my-6 bg-gray-400 lg:w-1/2 lg:my-6 lg:mx-auto px-3 py-6'>
                <h4 className='text-xl text-black'>Step 1</h4>
                <p>Login to your spotify account, via e-mail, Facebook, Apple-id, Google</p>
                <small>Please note the app is still in demo, to use the app, send your registered spotify email to agubatasylvester@gmail.com</small>
              </div>
              <div className='mx-7 my-6 lg:w-1/2 lg:my-6 lg:mx-auto bg-gray-400 px-3 py-6'>
                <h4 className='text-xl text-black'>Step 2</h4>
                <p>Select a playlist from your library </p>
              </div>
              <div className='mx-7 my-6 lg:w-1/2 lg:my-6 lg:mx-auto bg-gray-400 px-3 py-6'>
                <h4 className='text-xl text-black'>Step 3</h4>
                <p>Add your background Image</p>
              </div>
              <div className='mx-7 my-6 lg:w-1/2 lg:my-6 lg:mx-auto bg-gray-400 px-3 py-6'>
                <h4 className='text-xl text-black'>Step 4</h4>
                <p>Download ypur wallpaper</p>
              </div>
             <div className='text-center py-5'> <a className='text-3xl text-pry underline underline-offset-4'  href="http://localhost:8888/login">Get started </a></div>
            </section>
        </div>
      </div> :
      // -----------------profile data------------------------
      <div>
            {profile && (<div>
              <h1 className='text-center text-2xl font-display'> Welcome back <span className='text-pry'>{profile.display_name}</span>!</h1>
           {profile.images.length && profile.images[0].url && (
                  <div className='my-8 flex justify-center'>
                    <img src={profile.images[0].url} className='img_header' alt="Avatar"/>
                  </div>
                )}
                <div className='flex justify-center space-x-4'>
                 <div> Followers: {profile.followers.total && <h4>{profile.followers.total}</h4>}</div>
                <div> {profile.product && <span>{profile.product}</span>} User</div>
               </div>
            </div>)}
          
          
{/* -------------display top tracks------------- */}
          <section className='my-10 lg:mx-16'>
            <h3 className='text-center text-3xl text-pry py-6 underline underline-offset-2'>Top Listens</h3>
            {topTracks && topTracks.length ? (
              <div className='grid grid-cols-3 gap-3 '>
                {topTracks && topTracks.slice(0, 6).map((track, i) => (
                <div key={i} className='my-5 '>
                  
                  {track.album.images.length && track.album.images[0] && (
                <div className="flex justify-center ">
                  <img className='w-40' src={track.album.images[0].url} alt={track.name} />
                </div>
              )}
              <h2 className='font-basic text-base font-bold text-center truncate'>{track.name}</h2>
              <div>
              {track.artists.map((artist, i) => (
                    <h2 className='text-xs text-center font-display truncate' key={i}>
                      {artist.name}{i !== track.artists.length - 1 && ', '}
                    </h2>
                  ))}
              </div>
                </div>
                  ))}
               </div>
            ):  <div>
              <h5>No tracks available </h5>
              <h6>Kindly refresh the page</h6>
              </div>}
            </section>
{/* -------------display playlist------------- */}
          <section className='my-10 lg:mx-16'>
            <h3 className='text-center text-3xl text-pry py-6 underline underline-offset-2'>Playlist</h3>
            {playlists && playlists.length ? (
              <div className='grid grid-cols-3 gap-3 '>
                {playlists && playlists.map((playlist, i) => (
                <div key={playlist.id} className='my-5 '>
                  
                  {playlist.images.length && playlist.images[0] && (
                <div className="flex justify-center ">
                  <img className='w-40' src={playlist.images[0].url} alt={playlist.name} />
                </div>
              )}
              <h2 className='font-basic text-base font-bold text-center truncate'>{playlist.name}</h2>
              <div>
             
              </div>
                </div>
                  ))}
               </div>
            ):  <div>
              <h5>No tracks available </h5>
              <h6>Kindly refresh the page</h6>
              </div>}
            </section>
            
           <div className='text-center text-2xl underline hover:text-pry my-5'> <Link to='/playlists'>View all Playlist</Link></div>
             <div className='flex justify-center'> <button className='text-white bg-pry px-4 py-2 rounded-md' onClick={logout}>Log Out</button></div>
        </div>
       }
       
    </div>
    
    
  )
} 
