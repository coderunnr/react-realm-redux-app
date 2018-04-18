import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';

class NoteAdd extends Component {

    render() {
        return(
            <Card>
                <CardSection>
                    <Input
                        label="Note"
                        placeholder="This is important"
                        value={this.props.note}
                    />
                </CardSection>
                <CardSection>
                    <Button>
                        Save
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default NoteAdd;