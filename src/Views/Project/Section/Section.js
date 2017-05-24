import React from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import DialogWrapper from '../DialogWrapper/DialogWrapper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


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
        const itemsRef =  database.ref(itemsRefStr);
        itemsRef.push({
            detail: this.state.input,
            completion: false
        });
        this.setState({
            open: false
        })
    }


    showDialog() {
        this.setState({
            open: true
        })
    }



    handleAdd() {
        const addRef = `${this.props.localRef}/items`;
        this.props.handleAdd(addRef, {
            detail: this.state.input,
            completion: 0
        }, this.props.closeDialog)
    }
    render() {
        const comp = this;
        const section = this.props.section;
        const itemArray = section.items ? Object.entries(section.items) : [];
        const addConfig = {
            title: `Add a new checklist item to the ${this.props.section.title} category`,
            actions: [<FlatButton onTouchTap={comp.props.closeDialog} label="cancel"/>,
                <RaisedButton label="Add Section" onTouchTap={comp.handleAdd.bind(comp)}/>],
            inputs: [<TextField onChange={comp.handleInput.bind(comp)} key="1"/>]
        };
        return (
            <div key={this.props.ind} >
                <List>
                    <Subheader>{section.title || 'Title'}</Subheader>
                    {itemArray.map((item, ind) => {
                        return (<Item item={item[1]} key={item[0]} ind={item[0]} dataref={`${this.props.dataref}/items/${item[0]}`}/>);
                    })}
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
    dataref: PropTypes.string.isRequired
};
export default Section;