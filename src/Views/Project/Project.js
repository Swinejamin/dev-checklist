import React from 'react';
import PropTypes from 'prop-types';
import {database} from '../../config/database';
import './Project.css';
import Category from './Category/Category'
import Dialog from 'material-ui/Dialog'


class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: undefined,
            loaded: false,
            dialogOpen: false,
            actions: [],
            inputs: [],
            dialogText: '',
            dialogTitle: ''
        };
    }

    componentWillMount() {
        const comp = this;
        const ref = `projects/${this.props.match.params.project}`;
        database.ref(ref).on('value', (snap) => {
            comp.setState({
                project: snap.val(),
                dataref: ref,
                projectRef: this.props.match.params.project,
                loaded: true
            })
        })
    }

    handleDelete(ref, cb, errCb) {
        database.ref(ref).remove()
            .then(cb)
            .catch(errCb);
    }

    handleAdd(ref, data, cb, errCb) {
        database.ref(ref).push(data)
            .then(cb)
            .catch(errCb);
    }

    closeDialog() {
        this.setState({
            dialogOpen: false
        })
    }

    setupDialog(config) {
        this.setState({
            actions: config.actions,
            dialogText: config.text,
            dialogTitle: config.title,
            inputs: config.inputs,
            dialogOpen: true
        });
    }

    render() {
        const categories = this.state.project ? Object.entries(this.state.project.categories) : null;
        return (
            <main className="Project-main main">
                {
                    this.state.project ?
                        categories.map((category) => {
                            return (<Category category={category[1]}
                                              key={category[0]}
                                              dataref={this.state.dataref}
                                              projectRef={this.state.projectRef}
                                              localRef={`projects/${this.state.projectRef}/categories/${category[0]}`}
                                              handleAdd={this.handleAdd.bind(this)}
                                              handleDelete={this.handleDelete.bind(this)}
                                              closeDialog={this.closeDialog.bind(this)}
                                              setupDialog={this.setupDialog.bind(this)}
                                              loaded={this.state.loaded}
                            />);
                        }) :
                        null
                }
                <Dialog open={this.state.dialogOpen} actions={this.state.actions}
                        onRequestClose={this.closeDialog} title={this.state.dialogTitle}>
                    {this.state.dialogText}
                    {this.state.inputs.map((input) => {
                        return input
                    })}
                </Dialog>
            </main>
        );
    }
}
Project.propTypes = {
    match: PropTypes.object.isRequired
};
export default Project;