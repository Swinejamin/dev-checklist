import React from 'react';
// import PropTypes from 'prop-types';
import {database} from '../../config/database';

import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import {Link} from 'react-router-dom'

// import styles from './styles.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    componentWillMount() {
        database.ref('projectList').on('value', (snap) => {
            this.setState({
                projects: Object.entries(snap.val())
            })
        })
    }

    render() {
        return (
            <main className="main">
                <List>
                    {this.state.projects.map((project) => {
                        const key = project[0];
                        const content = project[1];
                        let percent = content.completed / content.count * 100;
                        console.log(percent);
                        const nest = <CircularProgress size={30} thickness={5} key="1" mode="determinate"
                                                       value={percent}/>;

                        return (
                            <ListItem key={key}
                                      primaryText={`${content.name} - ${content.completed} out of ${content.count} items completed`}
                                      leftAvatar={nest}
                                      containerElement={<Link to={`/${key}`}/>}/>
                        )
                    })}
                </List>
            </main>
        );
    }
}
Home.propTypes = {};
export default Home;