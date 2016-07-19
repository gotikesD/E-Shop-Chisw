import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <aside className="col-lg-3 col-md-3 col-sm-3 hidden-xs">
                <ul className="sibebar">
                    <li><a href="#">Sport</a></li>
                    <li><a href="#">Family</a></li>
                    <li><a href="#">Cheap</a></li>
                    <li><a href="#">Expensive</a></li>
                </ul>
            </aside>
        );
    }
}

export default About;