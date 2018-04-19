import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input } from './common';
import NoteList from './NoteList';

class NoteMainScreen extends Component {

    render() {
        return(
            <NoteList />
        );
    }
}

export default NoteMainScreen;