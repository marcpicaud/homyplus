import React from 'react';
import { Alert, StyleSheet, View, Share, KeyboardAvoidingView } from 'react-native';
import { Divider, Header, Button, Card, Text, FormInput, FormLabel } from 'react-native-elements';
import * as styles from '../style';
import { firebaseConnect, pathToJS, dataToJS, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';

@connect(
    // Map state to props
    ({ firebase }) => ({
        homes: dataToJS(firebase, 'homes'), 
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth'),
        profile: pathToJS(firebase, 'profile')
    })
)
@firebaseConnect(
    (props, firebase) => {
        console.log('PROPS');
        console.log(props);
        return [
            { path: 'homes', queryParams: [`equalTo=${props.profile.group}`] }
        ]
    }
)
export default class MyHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            invitationCode: '',
        }
    }

    handleLeaveMyHome() {
        if (!this.props.homes) {
            return alert('You don\'t belong to any home');
        }
        const homeKey = Object.keys(this.props.homes)[0];
        const homeObject = this.props.homes[homeKey];

        // this.props.firebase.database().ref(`/homes/${homeKey}`).remove()

        // user is the admin of the home
        if (homeObject.admin === this.props.firebase.auth().currentUser.uid) {
            // TODO : delete the home, and notify the members
            Alert.alert(
                'Delete home?',
                'You are the owner of the home, this action will delete it',
                [
                    { text: 'Confirm', onPress: () => {
                        this.props.firebase.database().ref(`/homes/${homeKey}`).remove();
                        alert('Home successfully removed');
                    }},
                    { text: 'Cancel', onPress: () => { return }, style: 'cancel' }
                ],
                { cancelable: false}
            )
        }
    }

    handleHomeCreation() {
        if (!this.state.name) {
            return alert('Home name must be truthy');
        }
        const userId = this.props.firebase.auth().currentUser.uid;
        const members = {};
        members[userId] = true;
        let toInsert = {
            admin: userId,
            name: this.state.name,
            members: members,
            invitationCode: userId.substring(0,4).toUpperCase()
        }
        const groupKey = this.props.firebase.database().ref('/homes').push(toInsert).key;
        this.props.firebase.database().ref('/users/'+userId).update({group: groupKey});
    }

    // TODO
    handleHomeJoining() {
        const userId = this.props.firebase.auth().currentUser.uid;
        const homeRef = this.props.firebase.database().ref('/homes').orderByChild('invitationCode').equalTo(this.state.invitationCode)
        homeRef.on('value', (snapshotData) => {

            // The actual data
            const val = snapshotData.val();

            if (!val) {
                return alert('Invalid code');
            }

            let toUpdate = val[Object.keys(val)[0]].members;
            toUpdate[userId] = true;
            snapshotData.ref.child(Object.keys(val)[0]).update({members: toUpdate});
            this.props.firebase.database().ref('/users/'+userId).update({group: Object.keys(val)[0]});
        });
    }


    render() {
        
        if (this.props.homes) {
            const homeObject = this.props.homes[Object.keys(this.props.homes)[0]];
            return (
                <View style={{marginTop: 20}}>
                    <Text h1>{homeObject.name}</Text>
                    <Button title="LEAVE MY HOME" style={{ marginTop: 20 }} onPress={() => this.handleLeaveMyHome()} />
                    <Button title='Share an invitation' style={{ marginTop: 20 }} onPress={() => { Share.share({ message: "Join my home using this invitation code : " + homeObject.invitationCode, title: "Title" }, { dialogTitle: "Title" }) }} />
                        
                </View>
            )
        }
        return (
            <KeyboardAvoidingView style={{marginTop: 20}} behavior="position">
                <Card>
                    <Text style={{textAlign: 'center'}}>CREATE MY HOME</Text>
                    <Divider />
                    <FormLabel>Name</FormLabel>
                    <FormInput placeholder="My Home" onChangeText={(text) => this.setState({name: text})}></FormInput>
                    <Button style={{ marginTop: 20 }} title='Create' onPress={() => this.handleHomeCreation()} />
                </Card>
                <Card>
                    <Text style={{textAlign: 'center'}}>JOIN A HOME</Text>
                    <Divider />
                    <FormLabel>Invitation code</FormLabel>
                    <FormInput placeholder="Invitation code..." onChangeText={(text) => this.setState({invitationCode: text})}></FormInput>
                    <Button style={{ marginTop: 20 }} title='Join' onPress={() => this.handleHomeJoining()} />
                </Card>
            </KeyboardAvoidingView>
        );
    }
}