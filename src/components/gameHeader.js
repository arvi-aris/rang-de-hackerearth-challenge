import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import Search from 'material-ui/svg-icons/action/search';
import Sort from 'material-ui/svg-icons/content/sort';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SortUp from 'material-ui/svg-icons/navigation/arrow-upward';
import SortDown from 'material-ui/svg-icons/navigation/arrow-downward';
const iconStyles = {
      'margin-right' : '4px',
      'margin-left' : '5px',
    'margin-bottom' : '-8px'
};

const headerStyle = {
    'background-color' : 'rgb(54, 133, 48)'
}

const hintStyle = {
    color: '#8cc9a4'
}

class GameHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = { openUp: false , openDown: false };
    }

    openUpFilterPopup(e){
        e.preventDefault();
        this.setState({
        openUp: true,
        anchorUpEl: e.currentTarget,
        });
    }

    openDownFilterPopup(e){
        e.preventDefault();
        this.setState({
        openDown: true,
        anchorDownEl: e.currentTarget,
        });
    }

    closeUpFilterPopup(e){
        this.setState({
            openUp: false,
        });
    }

     closeDownFilterPopup(e){
        this.setState({
            openDown: false,
        });
    }

    sortByFilter(e){
        e.stopPropagation();
        var filterContent = e.target.textContent;
        this.closeUpFilterPopup();
        this.closeDownFilterPopup();
        this.props.dataToSort(filterContent);
    }

    search(){
        var searchTxt = document.getElementById('searchTxt').value;
        this.props.dataToSearch(searchTxt)
    }

    render() {
        let sIcon = <div>                
                        <SortUp  tooltip="Sort By Category ( Ascending )" inputProps="asc" color="white" className="material-icons" style={iconStyles} onClick={this.openUpFilterPopup.bind(this)} />
                        <Popover
                        open={this.state.openUp}
                        anchorEl={this.state.anchorUpEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.closeUpFilterPopup.bind(this)}
                        >
                        <Menu>
                            <MenuItem inputProps="asc" onClick={this.sortByFilter.bind(this)} primaryText="Score (asc)" />
                            <MenuItem inputProps="asc" onClick={this.sortByFilter.bind(this)} primaryText="Platform (asc)" />
                            <MenuItem inputProps="asc" onClick={this.sortByFilter.bind(this)} primaryText="Clear" />
                        </Menu>
                        </Popover>
                        <SortDown  inputProps="desc" color="white" className="material-icons" style={iconStyles} onClick={this.openDownFilterPopup.bind(this)} />
                        <Popover
                        open={this.state.openDown}
                        anchorEl={this.state.anchorDownEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.closeDownFilterPopup.bind(this)}
                        >
                        <Menu>
                            <MenuItem inputProps="desc" onClick={this.sortByFilter.bind(this)} primaryText="Score (desc)" />
                            <MenuItem inputProps="desc" onClick={this.sortByFilter.bind(this)} primaryText="Platform (desc)" />
                            <MenuItem inputProps="desc" onClick={this.sortByFilter.bind(this)} primaryText="Clear" />
                        </Menu>
                        </Popover>
                        <Search color="white" className="material-icons" style={iconStyles}/><TextField
                        hintText="Search here.. (Game name)"
                        id="searchTxt"
                        type="search"
                        color="white"
                        inputStyle={{color: 'white'}}
                        hintStyle={hintStyle}
                        onChange={this.search.bind(this)}
                        />
                    </div>;
        return (
            <div>
                <AppBar
                    title="Rang de challenge"
                    iconElementRight = {sIcon}
                    style={headerStyle}
                />
                
            </div>
        )
    }
}

export default GameHeader;