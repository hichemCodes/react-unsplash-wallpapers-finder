import React, {useState,useEffect} from 'react';
import './App.css';
import '../src/fontawesome-free-5.13.1-web/css/all.min.css';
import axios from 'axios';
// components
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
  const [show_choices,setShowchoices] = useState(true);
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
        setPerpage(30); 

        const data = await axios (`https://api.unsplash.com/search/photos/?client_id=3auAiM7qzgoj3xqY_oRio1nZBz_Nkik265Z1ZIcpqow&query=${query}&per_page=${per_page}&order_by=${orderBy}&page=${page}`);
          
              setResult(data.data.results);
              setIsloading(false);
              setCptResult(data.data.total);
              setAllpages(data.data.total_pages);
              setShowchoices(true);

              
      }

      getPhotos();
      



  },[query,orderBy,page]);

  // close pop ups when clicking in any element diffirent of pop ups 
  const close_popups = (event)=>{
  
        const fav_pop_up = document.querySelectorAll('.pop-up-fav');
        const all_pages_pop_up = document.querySelectorAll('.all_pages');
        const order_pop_up = document.querySelectorAll('.orders');

        const all_popups = [fav_pop_up,all_pages_pop_up,order_pop_up];

        const target = event.target; // the element that we clicking in

        if( target.closest('.c_item') || target.closest('.fa-heart') ||
            target.closest('.cpt_fav') || target.closest('.orders') || target.closest('.clear_fav')) 
        { return; }
        else 
        {
            all_popups.forEach( (element)=>
            {
                 if (element[0].classList.contains('show_me'))  element[0].classList.remove('show_me');
            });
        }

  }

  return (
    <div className="App" onClick = { (e)=> close_popups(e)}>
            
           
           
            <Navbar get_query = { (new_query) =>{ setQuery(new_query)} } 
                    favorites = {favorites}
                    new_favorite = { (new_favorite) =>{ setFavorites(new_favorite) }}
                    show_choices = {show_choices}
                    get_fav = { (fav)=> setResult(fav) }
                    get_per_page = { (new_per_page)=> setPerpage(new_per_page)}
                    get_show_choices = { (new_show_choices)=> setShowchoices(new_show_choices)}
                    get_cpt_result = { (new_cpt_result) => setCptResult(new_cpt_result)}
                  /> 

            <span class="cpt_results"> {cpt_results+ ' photos'}</span>
            <span id="current_action">{'Search : '+query}</span>

            {(!show_choices) ? '' : // show choices component when show choices state is true
            <Choices orderBy = {orderBy}
                     get_order = { (new_order) =>{ setOrderBy(new_order) } } 
                     current_page = {page} all_pages = {all_pages }
                     change_page = { (new_page)=> { setPage(new_page)}}/>}  

            <Images images = {result}  is_loading = {is_loading}
                    new_favorite = { (new_favorite) =>{ setFavorites(new_favorite) } }
                    get_current_img = { (current_img) =>{ setCurrentimg(current_img) } }
                    get_show_choices = { (new_show_choices)=> setShowchoices(new_show_choices)}
                   />
            
            

            <Showimg current_img = {current_img} per_page = {per_page}/>

         


           

            
            


    </div>
  );
}

export default App;
