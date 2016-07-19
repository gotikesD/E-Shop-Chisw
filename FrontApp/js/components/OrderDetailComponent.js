import React, { Component } from 'react';

class OrderDetailComponent extends  Component {

    render(){

        let prod = this.props.order.products.map((i) => {
           return (
               <div key={i.id +2}>
                   <p>
                       <span>What you make order -</span>
                       <strong>{i.title}</strong>
                       <img style={{'width' : '20px', 'height' : '20px'}} src={`./img/iphone.jpg`} alt="#" />
                   </p>
                   <p>
                       <span>How many you want - </span>
                       <strong>{i.count}</strong>
                   </p>
               </div>
           )
        });

        return (
            <li>
                <div className="singleOrder" style={{'marginBottom' : '20px'}}>
                    <p>
                        <span>Total sum of your order - </span>
                        <strong>{this.props.order.totalSumOfOrder}</strong>
                    </p>
                        {prod}
                </div>
            </li>


        )
    }

}


export default OrderDetailComponent;


