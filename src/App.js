import React, {useState,useEffect} from 'react';
import './App.css';
import '../src/fontawesome-free-5.13.1-web/css/all.min.css';
import axios from 'axios';
import Images from '../src/components/images';
import Navbar from '../src/components/ui/navbar';
import Choices from '../src/components/ui/choices';
import Showimg from '../src/components/ui/Showimg';

function App() {

  const [query,setQuery] = useState('paris');
  const [result,setResult] = useState('');
  const [is_loading,setIsloading] = useState(true);
  const [cpt_results,setCptResult] = useState(0);
  const [orderBy,setOrderBy] = useState('relevant');
  const [page,setPage] = useState(1);
  const [all_pages,setAllpages] = useState(1);
  const [per_page,setPerpage] = useState(30);
  const [current_img,setCurrentimg] = useState(0);

  const [favorites,setFavorites] = useState(
     (localStorage.getItem('favorites')) != null
     ? JSON.parse(localStorage.getItem('favorites')).length
     : 0
  );

   //results par page

 

  useEffect( () =>{

      const getPhotos = async() =>{
        
        setIsloading(true);
        const data = await axios (`https://api.unsplash.com/search/photos/?client_id=3auAiM7qzgoj3xqY_oRio1nZBz_Nkik265Z1ZIcpqow&query=${query}&per_page=${per_page}&order_by=${orderBy}&page=${page}`);
          
              setResult(data.data.results);
              setIsloading(false);
              setCptResult(data.data.total);
              console.log(data)
              setAllpages(data.data.total_pages);

              
      }

      getPhotos();
      



  },[query,orderBy,page])


  return (
    <div className="App">

            <Navbar get_query = { (new_query) =>{ setQuery(new_query)} } 
                    favorites = {favorites}
                    new_favorite = { (new_favorite) =>{ setFavorites(new_favorite) }}/> 

            <span class="cpt_results"> {'+ '+cpt_results+ ' photos'}</span>
            <span id="current_action">{'Search : '+query}</span>

            <Choices orderBy = {orderBy}
                     get_order = { (new_order) =>{ setOrderBy(new_order) } } 
                     current_page = {page} all_pages = {all_pages }
                     change_page = { (new_page)=> { setPage(new_page)}}/> 

            <Images images = {result}  is_loading = {is_loading}
                    new_favorite = { (new_favorite) =>{ setFavorites(new_favorite) } }
                    get_current_img = { (current_img) =>{ setCurrentimg(current_img) } } />

            <Showimg current_img = {current_img} per_page = {per_page}/>


           

            
            


    </div>
  );
}

export default App;
