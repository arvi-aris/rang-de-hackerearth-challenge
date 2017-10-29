import React from 'react';
import ReactDOM from 'react-dom';
import GameHeader from './gameHeader.js';
import GameList from './gameList.js';

class GameArena extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchValue : "",
            filterValue : ""
        }
    }

    dataToSort = (props) => {
        this.setState({
            filterValue:props
        })
    }

    dataToSearch= (props) => {
        this.setState({
            searchValue:props
        });
    }

    render(){
        return(
            <div>
                <GameHeader dataToSearch={this.dataToSearch} dataToSort={this.dataToSort} />
                <GameList dataToFilter={this.state}/>
            </div>
        );
    }
}

export default GameArena;