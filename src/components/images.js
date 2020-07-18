import React from 'react';
import Loader from '../components/ui/loader';
import Footer from '../components/ui/Footer';


const images = ({images,is_loading,new_favorite,get_current_img}) => {


     //show_a_image and close a image

     const show_this_img = (link,download_link,index,event)=>{
             
          let target = event.target.className; //class of the target elemet
          if(target.includes('d_item') || target.includes('fa-heart') || target.includes('fa-download')) //if the target element is the like icon or download icon
          {
                return;
          }
          
           document.querySelector('.show_img').classList.toggle('show_me');
           
           document.querySelector('.img_full').style.backgroundImage = 'url('+link+')'; 

           document.querySelector('.d_full_img').setAttribute('href',download_link+'?force=true');
          
           get_current_img(index);
     }

   
     //like a image
     const like = (id)=>{
              
              
               let favorites;

               if(localStorage.getItem('favorites') === null)
               {
                      favorites = [{ id : id }];
               }
               else
               {
                      favorites = JSON.parse(localStorage.getItem('favorites'));
                      favorites.push({ id : id  });
               }    
               localStorage.setItem('favorites',JSON.stringify(favorites));

               //set the state 
               new_favorite(JSON.parse(localStorage.getItem('favorites')).length);
     }
     //dislike a image
     const dislike = (id)=>{
              
               let all_favorites = JSON.parse(localStorage.getItem('favorites'));
               
               let index = all_favorites.findIndex(x => x.id === id);  // find the index of the element that we want to remove

               all_favorites.splice(index,1);  // remove the id from the array
               console.log(all_favorites);

               localStorage.setItem('favorites',JSON.stringify(all_favorites));

               //set the state
               new_favorite(JSON.stringify(all_favorites));
     }

     // check if a image is already in the favotites list
     const already_liked = (image_id)=>{

               let all_favorites = JSON.parse(localStorage.getItem('favorites'));
               let is_liked = false;

               // if already ther'are  items in the localstorage 
               if(localStorage.getItem('favorites') != null)
               {
                    all_favorites.forEach ( (image) => { 
                              
                         if(image.id === image_id) { is_liked = true; return}
                     
                    });
               }
              

              return is_liked;
               
     }
    

    return  (is_loading) ? (<Loader/>)   : (
            
     <React.Fragment>
            <div className="imgs">
             { 
                images.map( (image,index) => (
                    
                    
                    <div style = { { backgroundImage : "url("+image.urls.regular+")" }}  className = "small_img">
                             <div className="cover" id={'img-'+(index+1)} onClick={(event)=> show_this_img(image.urls.regular,image.links.download,index+1,event) }>
                                <div className="details">
                                     <div className="d_header">
                                         <div className="d_item" onClick = { (event)=> { (!already_liked(image.id) ? like(image.id) : dislike(image.id) ) }}>

                                                <i class={  (!already_liked(image.id) ? 'far fa-heart' : 'fas fa-heart liked' )  }></i>

                                          </div>

                                          <div className="d_item">
                                                <a href={image.links.download+'?force=true'} rel="nofollow" download="" target="_blank">
                                                     <i class="fas fa-download"></i>
                                                </a>
                                          </div>
                                     </div>
                                     
                                </div>  
                            </div>
                    </div>
                  
                 ))
                

            }
          </div>
          <Footer/>
     </React.Fragment>     
         )
}

export default images
