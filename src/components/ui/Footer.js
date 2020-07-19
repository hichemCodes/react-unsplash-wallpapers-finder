import React from 'react'

const Fotter =() =>{
    return (
        <div className="fotter">
                <div className="a-git">
                <i class="fab fa-github"></i>
                      <a href="https://github.com/hichemCodes/react-unsplash-wallpapers-finder" target="_blanck"
                              >Project available on github
                      </a>
                </div>
                <div className="licences">
                      <span>
                           Designed and Developed by 
                          <a href="https://hichemcodes.netlify.app/" target="_blanck">Laouar Mohamed Hichem</a>
                      </span>
                </div>
                <div className="powred_by"> 
                      <i class="fab fa-unsplash"></i>
                      <span>This product uses the Unsplash API but is not endorsed or certified by Unsplash.</span>
                </div>
        </div>
    )
}

export default Fotter
