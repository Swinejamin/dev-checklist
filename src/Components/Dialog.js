import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import database from '../config/database';

export class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.input || '',
        };
    }
    render() {
        return (
            <Dialog
                actions={this.props.actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.handleClose}
            >
                {this.props.inputs.map((input) => {
                    return input
                })}
                {this.props.dialogText}
            </Dialog>
        );
    }
}
Dialog.propTypes = {
    actions: PropTypes.array.isRequired,
    inputs: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired
};
