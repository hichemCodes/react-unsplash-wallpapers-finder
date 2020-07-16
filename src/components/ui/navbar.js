import React, {useState} from 'react'

const Navbar = ({get_query,favorites,new_favorite}) => {


    // query of the search 
    const [query,setQuery] = useState('paris');

    const change_query = (new_query) =>{

        get_query(new_query);
    }
    const show_pop_up = ()=>{

           document.querySelector('.pop-up-fav').classList.toggle('show_me');
    }
    const clear_fav = ()=>{

           localStorage.clear();
           new_favorite(0)
    }
    /// show all favorite
    const show_favorites = ()=>{
          
        /*const getPhotos = async() =>{
        
            setIsloading(true);
            const data = await axios (`https://api.unsplash.com/photos/?client_id=3auAiM7qzgoj3xqY_oRio1nZBz_Nkik265Z1ZIcpqow&id=${query}`);
              
                  setResult(data.data.results);
                  setIsloading(false);
                  setCptResult(data.data.total);
                  console.log(data)
                  setAllpages(data.data.total_pages);
    
                  
          }*/
    }
    return (
        <div className="navbar">

               <div className="logo"></div>
                <form onSubmit = { (e) =>{ e.preventDefault(); change_query(e.target[0].value)}  } action="get">
                     <div className="search_input">
                              <i class="fas fa-search"></i>
                              <input type="text"  id="search_input" placeholder='paris' />
                     </div>
                    
                            
                </form>
                <div className="favorite">
                           <i class="far fa-heart" onClick = { ()=> { show_pop_up();}}></i>
                           <div className="badge_fav">
                                <span> {favorites}</span>
                          </div>
                </div>
                
                <div className="pop-up-fav">
                          <span className="cpt_fav" onClick = { ()=> { show_favorites()}}> <span> {favorites} photos in favorites</span></span>   
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