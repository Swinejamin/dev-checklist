import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Section/Section';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            input: '',
            invalid: true
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
            invalid: newInput.length <= 0
        })
    }

    handleAdd() {
        const addRef = `${this.props.localRef}/sections`;
        this.props.handleAdd(addRef, {
            title: this.state.input,
            completion: 0
        }, this.props.closeDialog)
    }

    handleDelete() {

    }

    render() {
        const comp = this;
        const sectionList = Object.entries(this.props.category.sections);
        const addConfig = {
            title: `Add a new section to the ${this.props.category.title} category`,
            actions: [<FlatButton onTouchTap={comp.props.closeDialog} label="cancel"/>,
                <RaisedButton label="Add Section" onTouchTap={comp.handleAdd.bind(comp)}/>],
            inputs: [<TextField onChange={comp.handleInput.bind(comp)} key="1"/>]
        };
        return this.props.loaded ? (
            <div>
                {
                    sectionList.map((section) => {
                            const key = section[0];
                            const content = section[1];
                            return (<Section loaded={this.props.loaded}
                                             key={key} ind={key}
                                             dataref={this.props.dataref}
                                             projectRef={this.props.projectRef}
                                             localRef={`${this.props.localRef}/sections/${key}`}
                                             handleAdd={this.props.handleAdd}
                                             handleDelete={this.props.handleDelete}
                                             closeDialog={this.props.closeDialog}
                                             setupDialog={this.props.setupDialog}
                                             section={content}/>);
                        }
                    )
                }
                <RaisedButton onTouchTap={() => this.props.setupDialog(addConfig)} label="Add Section" primary fullWidth
                              style={{columnSpan: 'all', marginTop: '2rem'}}/>
            </div>
        ) :
            null;
    }
}
Category.propTypes = {
    category: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired,
    localRef: PropTypes.string.isRequired,
    setupDialog: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};
export default Category;