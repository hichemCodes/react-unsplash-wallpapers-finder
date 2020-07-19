import React, {useState,useRef} from 'react';
import axios from 'axios';
import logo from '../../logo.png';

const Navbar = ({get_query,favorites,new_favorite,show_choices,get_fav,get_per_page,get_show_choices,get_cpt_result}) => {


   let [allfavorites,setAllfavorites] = useState([]);

    /// show all favorites
    const show_favorites = (e)=>{

        
        if(favorites == 0  || show_choices){ return;} // if the favorites state is impty or we're already in favorite page
        // else
        let favorites_id = JSON.parse(localStorage.getItem('favorites'));
        var allfavorites_array = [];

     
        favorites_id.forEach ( async(image) =>{

            const data = await axios (`https://api.unsplash.com/photos/${image.id}?client_id=3auAiM7qzgoj3xqY_oRio1nZBz_Nkik265Z1ZIcpqow&id=`);
        
            allfavorites_array.push((data.data));

        });

        
        get_per_page(favorites);   // change the number of the all images
        get_show_choices(false); //hide chices component
        get_cpt_result(favorites); // change the cpt result
        document.querySelector('#current_action').innerHTML = 'favorites'; // change title 
        setAllfavorites(allfavorites_array); // set all favorites state and re render 
        get_fav(allfavorites); // re render image component
       
    
   }
    
    // query of the search 
    const [query,setQuery] = useState('paris');

    const show_pop_up = ()=>{

           document.querySelector('.pop-up-fav').classList.toggle('show_me');
    }
    const clear_fav = ()=>{

           localStorage.clear();
           new_favorite(0);
    }
    
   
    return (
        <div className="navbar">

               <div className="logo"> <img src={logo} alt=""/> </div>
                <form onSubmit = { (e) =>{ e.preventDefault(); get_query(e.target[0].value)}  } action="get">
                     <div className="search_input">
                              <i class="fas fa-search"></i>
                              <input type="text"  id="search_input" value={query} onChange = { (e)=>  setQuery(e.target.value)  }/>
                     </div>
                    
                            
                </form>
                <div className="favorite">
                           <i class="far fa-heart" onClick = { ()=> { show_pop_up()}}></i>
                           <div className="badge_fav">
                                <span> {favorites}</span>
                          </div>
                </div>
                
                <div className="pop-up-fav">
                          
                                  <span className={ (favorites ==0) ? 'cpt_fav not-allowed' : 'cpt_fav'} onClick = {   (e)=> show_favorites(e) }> 
                                        <span> {favorites} photos in favorites</span>
                                  </span>   
                          
                          {
                              //show clear btn only if favorites images is grather than 0
                              (favorites == 0) ? '' 
                                :    <div className="clear_fav">
                                             <span onClick = { ()=> { clear_fav()} }>Clear list</span>    
                                     </div> 
                          }
                        

                </div>

        </div>
    )
}

export default Navbar


// refce