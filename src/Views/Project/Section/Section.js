import React from 'react';
import PropTypes from 'prop-types';
// import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


import {List} from 'material-ui/List';

import {database} from '../../../config/database';

import Item from '../Item/Item'

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            input: '',
            invalid: true,
            activeSection: null
        };
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    handleInput(event, newInput) {
        this.setState({
            input: newInput,
            invalid: newInput.length > 0 ? false : true
        })
    }

    handleSubmit() {
        console.log(this.props.dataref, this.state.input);
        const itemsRefStr = `${this.props.dataref}/items`;
        const itemsRef = database.ref(itemsRefStr);
        itemsRef.push({
            detail: this.state.input,
            completion: false
        });
        this.setState({
            open: false
        })
    }


    handleAdd() {
        const addRef = `${this.props.localRef}/items`;
        this.props.handleAdd(addRef, {
            detail: this.state.input,
            completion: 0
        }, this.props.closeDialog)
    }

    handleDelete() {
        const deleteRef = `${this.props.localRef}`;
        this.props.handleDelete(deleteRef, this.props.closeDialog)
    }

    render() {
        const comp = this;
        const section = this.props.section;
        console.dir(section);
        const itemArray = section.items ? Object.entries(section.items) : [];
        const addConfig = {
            title: `Add a new checklist item to the ${this.props.section.title} category`,
            actions: [<FlatButton onTouchTap={comp.props.closeDialog} label="cancel"/>,
                <RaisedButton label="Add Item" onTouchTap={comp.handleAdd.bind(comp)}/>],
            inputs: [<TextField onChange={comp.handleInput.bind(comp)} key="1" name="newItem"/>]
        };
        const deleteConfig = {
            title: `Delete the ${this.props.section.title} section`,
            actions: [<FlatButton onTouchTap={comp.props.closeDialog} label="cancel"/>,
                <RaisedButton label={`Delete ${section.title}`} onTouchTap={comp.handleDelete.bind(comp)}/>],
            inputs: []
        };
        const Menu = (props) => {
            return (
                <IconMenu
                    {...props}
                    iconButtonElement={
                        <IconButton><MoreVertIcon /></IconButton>
                    }
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="Delete Section" onTouchTap={() => this.props.setupDialog(deleteConfig)}/>
                    <MenuItem primaryText="Add New Section" onTouchTap={() => this.props.setupDialog(addConfig)}/>
                </IconMenu>
            )
        };

        return (
            <div key={this.props.ind}>
                <List>
                    <AppBar title={section.title} showMenuIconButton={false} iconElementRight={<Menu/>}/>
                    {/*<Subheader>{section.title || 'Title'}</Subheader>*/}
                    {itemArray ? itemArray.map((item, ind) => {
                        return (<Item item={item[1]} key={item[0]} ind={item[0]}
                                      dataref={`${this.props.dataref}/items/${item[0]}`}/>);
                    }) : ''}
                </List>
                <RaisedButton label="Add Item" secondary onTouchTap={() => this.props.setupDialog(addConfig)}/>
                {/*<DialogWrapper open={this.state.open} handleClose={this.handleClose.bind(this)} handleInput={this.handleInput.bind(this)}*/}
                {/*handleSubmit={this.handleSubmit.bind(this)} title="Add New Item" invalid={this.state.invalid}/>*/}
            </div>
        );
    }
}
Section.propTypes = {
    ind: PropTypes.string.isRequired,
    section: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired,
    dataref: PropTypes.string.isRequired,
    setupDialog: PropTypes.func.isRequired
};
export default Section;