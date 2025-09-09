
import React, { useEffect, useState } from 'react'
import './gallery.css'
import testImage from '../../assets/image.jpg'
import { jpAxios } from '../../JpAxios';
import useTitle from '../../hooks/useTitle';


const GalleryCompo = ()=>{
    const [photos, setPhotos] = useState([]);
    const [searchPhotos, setSearchPhotos] = useState('');
    const [currentPage, setCurrenPage] = useState(1);
    const [allPages, setAllPages] = useState(0);
    const limit = 12;
    
    
    useEffect(()=>{
        if(allPages == 0){
            
            jpAxios.get('/photos')
            .then(res=>{
                setAllPages(Math.ceil(parseInt(res.data.length) / limit))
                console.log(Math.ceil(parseInt(res.data.length) / limit)); 
            })
        }
        
        jpAxios.get(`photos?_page=${currentPage}&_limit=${limit}`)
        .then(res=>{
            console.log(res.data)
            setPhotos(res.data)
            
            
        })
    },[currentPage, allPages])
    useTitle('gallery')
    
    const handleNextPage = ()=>{
        setCurrenPage(prev=>{
            return prev + 1
        })
    }
    const handlePrevPage = ()=>{
        setCurrenPage(prev=>{
            return prev - 1
        })
    }
    
    return(
        
        <div className="gallery-con-grid">
        <div className='gallery-top'>
        
        <h1>گالری</h1>
        <div className="input-submit">
        
        <input type="text" onChange={e=> setSearchPhotos(e.target.value)} placeholder='جستجو عکس' />
        </div>
        
        </div>
        
        <div className="gallery-bottom">
        <ul className='image-list'>
        
        {photos.filter(p=>{
            if (searchPhotos === '') {
                return true;
            }
            return p.title.toLowerCase().includes(searchPhotos.toLowerCase());
        }).map(p=>(
            <li>
            <div className="g-item">
            <div className='picture'>
            <img src={testImage} alt="image" />
            </div>
            <div className='desc'>
            
            <h4>{p.id}</h4>
            <h4>{p.title}</h4>
            
            
            </div>
            </div>
            </li>
        ))}
        
        </ul>
        
        
        
        </div>
        <div className='g-btns'>
        <button disabled={currentPage == 1} onClick={handlePrevPage} className='g-btn g-prev'>
        <i className='bx bxs-chevrons-left'  ></i>
        </button>
        <h4>{currentPage}</h4>
        <button disabled={currentPage == allPages} className='g-btn g-next' onClick={handleNextPage} >
        <i className='bx bxs-chevrons-right'  ></i>
        </button>
        </div>
        </div>
        
    )
}



export default GalleryCompo;