import React from 'react';
import { Link } from 'react-router';

export default class Footer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mostRecentMovies: []
        };

        this.getFiveRecentMovies = this.getFiveRecentMovies.bind(this);
    }

    componentDidMount(){
        this.getFiveRecentMovies();
        this.interval = setInterval(() => this.getFiveRecentMovies(), 30000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    getFiveRecentMovies(){
        let request = {
            method:'get',
            url: '/api/movies/five-recent',
         };
         $.ajax(request)
            .done(data => {
                this.setState({
                    mostRecentMovies: data
                });
            })
            .fail(err => toastr.error(err.responseJSON.message));
    }
    render() {
        let mostRecentMovies = this.state.mostRecentMovies.map(movie => {
            return (
                <li key={movie._id}>
                    <Link to={`/...`}>{movie.name}</Link>
                </li>
            )
        });

        return (
            <footer>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-5'>
                            <h3 className='lead'>
                                <strong>Information</strong> and
                                <strong> Copyright</strong>
                            </h3>
                            <p>
                                Rowered by
                                <strong>Express</strong>,
                                <strong>MongoDB</strong> and
                                <strong>React</strong>
                            </p>
                            <p>&copy; 2017 SoftUni.</p>
                        </div>
                        <div className='col-sm-4 hidden-xs'>
                            <h3 className='lead'>
                                <strong>Newest</strong> 5 Movies
                            </h3>
                            <ul className='list-inline'>
                                {mostRecentMovies}
                            </ul>
                        </div>
                        <div className='col-sm-3'>
                            <h3 className='lead'>Author</h3>
                            <a href="http://github.com/achobanov">
                                <strong> Vanya Ivanova</strong>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
