import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

class App extends Component {

    render() {
        return (
            <Provider>
                <View>
                    <Text>
                        Hi! Welcome to Realm!
                    </Text>
                </View>
            </Provider>
        );
    }
}

export default App;