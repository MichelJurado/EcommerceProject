import React from 'react'
import './home.css'
import Product from './Product';

function home() {
  return (
    <div className='home'>
        <div className='home_container'>
            <img 
            className='home_image'
            src={require("./pictures/banner.jpg")}></img>

            <div className='home_row'>
              <Product
                id="123" 
                title= 'Mens Rolex Datejust Watch 16200 | 36Mm | Pearl Blue Dial | Jubilee Band'
                price={12700}
                image= {require("./pictures/rolex_datejust.jpg")}
                rating={5}
              />
              <Product
                id="122" 
                title= 'Gold & Steel Rolex Datejust Watch 16233 for Men | 36Mm | Diamond Red Roman Dial | Jubilee Band'
                price={9800}
                image= {require("./pictures/rolex_datejust2.jpg")}
                rating={5}
              />
            </div>

            <div className='home_row'>
              <Product 
                id="124" 
                title= 'Solid Gold Cuban Chain'
                price={5000}
                image= {require("./pictures/goldchain.jpg")}
                rating={5}
              />
            </div>

            <div className='home_row'>
              <Product 
                id="125" 
                title= 'Mens Iced Out Diamond Miami Cuban Link Bracelet 10K/14K Yellow Gold'
                price={5300}
                image= {require("./pictures/cuban_bracelet.jpg")}
                rating={5}
              />
              <Product 
                id="126" 
                title= '14K White Gold Bracelet Solid Miami Cuban Link'
                price={1867}
                image= {require("./pictures/cuban_bracelet2.jpg")}
                rating={5}
              />
              <Product 
                id="127" 
                title= 'Mens Iced Out Diamond Miami Cuban Link Bracelet 14K White Gold'
                price={4994}
                image= {require("./pictures/cuban_bracelet3.jpg")}
                rating={5}
              />
            </div>

        </div>
    </div>
  );
}

export default home