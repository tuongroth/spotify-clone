import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import AlbumItem from './AlbumItem'

const DisplayHome = () => {
  return (
    <><Navbar />
    <div className='my-5 font-bold text-2xl'>			
Featured Albums			
</div>			
			
{albumsData.map((item) => (			
<AlbumItem			
key={item.id}			
id={item.id}			
image={item.image}			
name={item.name}			
desc={item.desc}			
/>			
))}			</>

  )
}

export default DisplayHome
