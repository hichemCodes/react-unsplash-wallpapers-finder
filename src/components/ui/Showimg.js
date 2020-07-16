import React from 'react'

const Showimg = ({current_img,per_page})=> {

    // change the current image 
    const slide_prev_or_next = (action)=>{
         
             document.querySelector('.close_img').click(); // close the current image
             document.querySelector('#img-'+( (action == 'prev') ? current_img-1 : current_img+1 )).click(); // opne the left or right image
    }
    return (
        <div className="show_img">
                    <div class="img_header">
                          <span class="close_img" 
                                      onClick ={ () => 
                                        { 
                                            document.querySelector('.img_full').style.backgroundImage = false;
                                            document.querySelector('.show_img').classList.toggle('show_me');
                                        }
                                      }>
                                        <i class="fas fa-times"> </i>
                                         close
                            </span>

                                    <span className="c_image"> { current_img+' / '+per_page }</span>
                           <span class="">
                               <a className="d_full_img" href="" rel="nofollow" download="" target="_blank" > <i class="fas fa-download"></i></a>
                          </span>
                    </div>
                    <div class = "img_full">
                                
                    </div>
                   { (current_img > 1)
                         ?<div className="slide_left" onClick={()=> {slide_prev_or_next('prev')}}><i class="fas fa-angle-left"></i></div>
                         : '' }
                   { (current_img < per_page)
                         ?<div className="slide_right" onClick={()=> {slide_prev_or_next('next')}}><i class="fas fa-angle-right"></i></div>
                         : '' }
                         
                   
        </div>
    )
}

export default  Showimg;
