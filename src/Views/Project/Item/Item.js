import React from 'react';
import PropTypes from 'prop-types';
import {ListItem} from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
// import EditIcon from 'material-ui/svg-icons/image/edit';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import Checkbox from 'material-ui/Checkbox';

import MenuItem from 'material-ui/MenuItem';

import DialogWrapper from '../DialogWrapper/DialogWrapper';
// import RemoveItemDialog from './Dialogs/RemoveItemDialog';

import {database} from '../../../config/database'


class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addDialogOpen: false,
            removeDialogOpen: false,
            input: '',
            invalid: true,
        };
    }

    handleAddDialogClose() {
        this.setState({
            addDialogOpen: false
        })
    }

    handleRemoveDialogClose() {
        this.setState({
            addDialogOpen: false
        })
    }

    handleInput(newInput) {
        this.setState({
            input: newInput,
            invalid: newInput.length > 0 ? false : true
        })
    }

    handleDelete(target) {
        database.ref(target).remove();
    }

    handleSubmit() {
        console.log(this.props.dataref, this.state.input);
        const itemsRefStr = this.props.dataref;
        const itemsRef = database.ref(itemsRefStr);
        itemsRef.update({
            detail: this.state.input,
        });
        this.setState({
            addDialogOpen: false
        })
    }

    showAddDialog() {
        this.setState({
            addDialogOpen: true
        })
    }

    showEditDialog(current) {
        this.setState({
            input: current,
            addDialogOpen: true
        })
    }

    render() {
        const item = this.props.item;
        const comp = this;
        // class Edit extends React.Component {
        //     render() {
        //         return <IconButton onTouchTap={() => {
        //             comp.showEditDialog(item[1].detail).bind(comp)
        //         }}><EditIcon/></IconButton>
        //     }
        // }
        class LinkMenu extends React.Component {
            render() {
                return (
                    <IconMenu style={{position: 'absolute', right: '.4rem', top: 0}}
                              iconButtonElement={<IconButton><MoreVert/></IconButton>}>
                        <MenuItem primaryText="Edit Link"/>
                        <MenuItem primaryText="Delete Link"/>
                    </IconMenu>
                )

            }
        }
        const links = item.links ? Object.entries(item.links) : [];
        const nest = [
            <ListItem key="1000"><FlatButton primary label="Add Detail Link"/></ListItem>,
            <ListItem key="1001"><FlatButton secondary label="Delete Checklist Item" onTouchTap={() => {
                comp.handleDelete(this.props.dataref)
            }}/></ListItem>
        ];
        links.map((link, index) => {
            return nest.splice(nest.length - 4, 0, <ListItem primaryText={link[1].title || 'sample title'}
                                                             key={index + 2} rightIconButton={<LinkMenu/>}/>)
        });
        return (
            <ListItem key={this.props.ind} primaryText={item.detail} leftCheckbox={<Checkbox />}
                      insetChildren={true} nestedItems={nest} primaryTogglesNestedList>

                <DialogWrapper open={this.state.addDialogOpen} handleClose={this.handleAddDialogClose.bind(this)}
                               handleInput={this.handleInput.bind(this)}
                               handleSubmit={this.handleSubmit.bind(this)} invalid={this.state.invalid}
                               title="Edit name" input={item.detail}/>
            </ListItem>
        );
    }
}
Item.propTypes = {
    item: PropTypes.object.isRequired,
    dataref: PropTypes.string.isRequired
};
export default Item;