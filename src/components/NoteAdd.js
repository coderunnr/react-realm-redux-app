import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';
import { connect } from 'react-redux';
import { noteChanged, createNote } from '../actions';

class NoteAdd extends Component {

    onSavePress() {
        const { note } = this.props;

        this.props.createNote({ note });
    }

    render() {
        return(
            <Card>
                <CardSection>
                    <Input
                        label="Note"
                        placeholder="This is important"
                        value={this.props.note}
                        onChangeText={ value => this.props.noteChanged({ note: value })}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.onSavePress.bind(this)}>
                        Save
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { note } = state.note;
    return {
        note
    };
};

export default connect(mapStateToProps, { noteChanged, createNote })(NoteAdd);