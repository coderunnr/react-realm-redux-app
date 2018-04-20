import React, { Component } from 'react';
import { ListView, AppState } from 'react-native';
import { connect } from 'react-redux';
import { fetchNotes } from '../actions';
import { Text } from 'react-native';
import { Card, CardSection, Input, Button } from './common';

class NoteList extends Component {

    // state = {
    //     appState: AppState.currentState,
    //     init: 'ok'
    // }
    
    // componentDidMount() {
    //     AppState.addEventListener('change', this._handleAppStateChange);
    // }

    // componentWillUnmount() {
    //     AppState.removeEventListener('change', this._handleAppStateChange);
    // }

    // _handleAppStateChange = (nextAppState) => {
    //     // if (this.state.appState == 'background' | 'inactive' && nextAppState == 'active') {  //.match(/inactive|background/)
    //     //     this.setState({init: 'inside it'});
    //     //     this.props.fetchNotes();
    //     // }
    //     // this.setState({appState: nextAppState, init: nextAppState});

    //     if(nextAppState === 'background' || nextAppState === 'inactive') {
    //         this.setState({ init: nextAppState});
    //     }
    // }

    componentWillMount() {
        this.props.fetchNotes();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource( {notes}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 != r2
        });

        this.dataSource = ds.cloneWithRows(notes);
    }

    renderRow(note) {
        console.log(note);
        return(
            <Card>
                <CardSection>
                    <Text>{note.note}</Text>
                </CardSection>
            </Card>
        );
    }

    render() {
        return(
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
        );
    }
}

const mapStateToProps = state => {
    const { notes } = state.database;

    console.log('notes', notes);

    return {
        notes
    };
};
 
export default connect(mapStateToProps, { fetchNotes })(NoteList);