import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class AddLinkDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            input: this.props.input || '',

        };
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.props.handleClose}
            />,
            <RaisedButton
                label="Submit"
                primary={true}
                disabled={this.props.invalid}
                onTouchTap={this.props.handleSubmit}
            />,
        ];
        return (
            <Dialog
                title={this.props.title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleClose}
            >
                <TextField
                    onChange={(event, newValue) => {
                        this.setState({
                            input: newValue
                        });
                        this.props.handleInput(newValue)
                    }}
                    hintText={this.state.input}/>
            </Dialog>
        );
    }
}
AddLinkDialog.propTypes = {};
export default AddLinkDialog;