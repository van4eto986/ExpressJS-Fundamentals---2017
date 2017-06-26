import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ajaxAnimationClass: ''
        }
    }

    componentDidMount() {
        $(document).ajaxStart(() => {
            this.setState({
                ajaxAnimationClass: 'fadeIn'
            })
        })

        $(document).ajaxComplete(() => {
            this.setState({
                ajaxAnimationClass: 'fadeOut'
            })
        })
    }
    
    render() {
        return (
            <nav className='navbar navbar-default navbar-static-top'>
                <div className='navbar-header'>
                    <button type='button'
                            className='navbar-toggle collapsed'
                            data-toggle='collapse'
                            data-target='#navbar'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar' />
                        <span className='icon-bar' />
                        <span className='icon-bar' />
                    </button>
                    <Link to='/' className='navbar-brand'>
                        <span
                            ref='triangles'
                            className={'triangles animated ' + this.state.ajaxAnimationClass}>
                            <div className='tri invert' />
                            <div className='tri invert' />
                            <div className='tri ' />
                            <div className='tri invert' />
                            <div className='tri invert' />
                            <div className='tri ' />
                            <div className='tri invert' />
                            <div className='tri ' />
                            <div className='tri invert' />
                        </span>
                        MDB
                    </Link>
                </div>
                <div id='navbar' className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='movie/add'>Add Movie</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}