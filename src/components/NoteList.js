import React, { Component } from 'react';
import { ListView, AppState, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { fetchNotes } from '../actions';
import { Text } from 'react-native';
import { Card, CardSection, Input, Button } from './common';

class NoteList extends Component {

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
            <ScrollView>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </ScrollView>
            
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