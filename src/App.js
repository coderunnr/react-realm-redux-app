import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

class App extends Component {

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
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