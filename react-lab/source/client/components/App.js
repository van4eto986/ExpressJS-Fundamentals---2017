import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                { this.props.children }
                <Footer />
            </div>
        );
    }
}