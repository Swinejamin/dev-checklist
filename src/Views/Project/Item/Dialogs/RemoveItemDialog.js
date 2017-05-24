import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class RemoveItemDialog extends React.Component {
    state = {
        open: false,
    };

    componentWillMount() {
        this.setState({
            open: this.props.open
        })
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleCancel = () => {
        this.setState({open: false});
    };
    handleSubmit = () => {
        this.setState({open: false});
        this.props.submit();
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onTouchTap={this.handleSubmit}
            />,
        ];

        return (
            <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                Discard draft?
            </Dialog>

        );
    }
}
RemoveItemDialog.propTypes = {
    submit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};
export default RemoveItemDialog;