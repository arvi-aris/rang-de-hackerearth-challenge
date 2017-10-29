import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import GameCard from './gameCard.js';
import Chip from 'material-ui/Chip';

const chipStyles = {
    margin : '10px',
    padding : '5px'
}
class GameList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gamesList : [],
            filter : []
        }
    }

    componentDidMount(){
        axios.get('http://starlord.hackerearth.com/gamesarena')
            .then(res => {
                let list = res.data;
                res.data.shift();
                localStorage.setItem('masterList',JSON.stringify(list));
                this.setState({
                    gamesList : list
                });
            });
    }

    filterByCategory = (type) => {
        var category = type[0].toLowerCase() === 'editor"s choice' ? 'editors_choice' : type[0].toLowerCase();
        var sub_category = type[1];
        if(category === 'editors_choice'){
            sub_category = (sub_category === "Yes") ? "Y" : "N";
        }
        var gamelist = JSON.parse(localStorage.getItem('masterList'));
        var filterList = gamelist.filter((game) => {
            return game[category] == sub_category;
        });
        var chip = [{
            category : category,
            sub_category : sub_category
        }]
        this.setState({
            gamesList : filterList,
            filter : chip
        })
    }
 
    sortByFilter(filterValue,gamelist){
        filterValue = filterValue.split(" ");
        if(filterValue[0] === "platform"){
            return gamelist.sort(function(game1, game2) {
                if (game1.platform.toLowerCase() < game2.platform.toLowerCase() && filterValue[1].match('asc')) {
                    return -1;
                }
                else if (game1.platform.toLowerCase() > game2.platform.toLowerCase() && filterValue[1].match('asc')) {
                    return 1;
                }
                else if (game1.platform.toLowerCase() > game2.platform.toLowerCase()) {
                    return -1;
                }
                else if (game1.platform.toLowerCase() < game2.platform.toLowerCase()) {
                    return 1;
                }
                else return 0;
            });
        }
        else return gamelist.sort(function(game1,game2){
            if(filterValue[1].match('asc'))
                return Number(game1[filterValue[0]]) - Number(game2[filterValue[0]]);
            else return Number(game2[filterValue[0]]) - Number(game1[filterValue[0]]);
        })
    }

    searchByTitle(searchRegex,filterList){
        if(this.state.filter.length > 0){
            filterList = this.state.gamesList;
        }
        return filterList.filter((game) => {
            return game.title.match(searchRegex);
        });
    }

    filterHandler(props){ 
        var searchValue = props.dataToFilter.searchValue;
        var filterContent = props.dataToFilter.filterValue.toLowerCase();
        var gamelist = JSON.parse(localStorage.getItem('masterList'));
        var filterList = gamelist;
        if(filterContent && filterContent !== "clear"){
            filterList = this.sortByFilter(filterContent,gamelist);
        }
        if(searchValue.length > 0){
             let searchRegex = new RegExp(searchValue,'gi');
             filterList = this.searchByTitle(searchRegex,filterList);
        } 
        this.setState({
            gamesList : filterList
        })
    }

    clearFilter(){
        var gamelist = JSON.parse(localStorage.getItem('masterList'));
        document.getElementById('searchTxt').value = '';
         this.setState({
            gamesList : gamelist,
            filter : []
        })
    }

    componentWillReceiveProps(props){
        this.filterHandler(props);
    }

    render(){
        return(
              <div>
                {this.state.filter.map((chip) => 
                { return(
                        <Chip
                        open={false}
                        onRequestDelete={() => this.clearFilter(chip)}
                        style={chipStyles}
                        > 
                       {chip.category} : {chip.sub_category}
                        </Chip>
                    ) 
                })}
                {this.state.gamesList.map((game) => <GameCard gameInfo={game} filterByCategory={this.filterByCategory.bind(this)} />)}
            </div>
        );
    }
}

export default GameList;