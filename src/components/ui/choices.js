import React from 'react'
import Allpages from '../ui/all_pages';

const choices = ({orderBy,get_order,current_page,all_pages,change_page}) => {

    const show_orders = () =>{
        
        document.querySelector('.orders').classList.toggle('show_me');
          
    } 
    return (
        <div className="choices">
                <span className="current_order c_item" onClick = {() => {show_orders() }}>Order by :  <strong> {orderBy} </strong> </span>
                <div className="orders">
                       <div className="o_item first_o" onClick = {() => {get_order('latest') }}>
                                    
                                   <div className={ (orderBy == 'latest' ) ? 'checkbox c_check' : 'checkbox' } id="by_latest">
                                         <div className="white_space"></div>
                                   </div>
                                   <label htmlFor="by_latest">latest</label>
                       </div>
                       <div className="o_item" onClick = {() => {get_order('relevant') }}>
                                    
                                    <div className={(orderBy == 'relevant' ) ? 'checkbox c_check' : 'checkbox' } id="by_relevant">
                                        <div className="white_space"></div>
                                    </div>
                                    <label htmlFor="by_relevant" >relevant</label>
                        </div>
                      
                </div>
                <Allpages 
                         current_page = {current_page} all_pages = {all_pages} 
                         get_page = { (new_page)=> { change_page(new_page)}}
                />


        </div>
    )
}

export default choices
