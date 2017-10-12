import React from 'react';
import { Alert, StyleSheet, View, Share, KeyboardAvoidingView } from 'react-native';
import { Divider, Header, Button, Card, Text, FormInput, FormLabel } from 'react-native-elements';
import * as styles from '../style';
import { firebaseConnect, pathToJS, dataToJS, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';


@firebaseConnect()
@connect(
    // Map state to props
    ({ firebase }) => ({
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth'),
        profile: pathToJS(firebase, 'profile')
    })
)
export default class MyHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createHomeInputValue: '',
            home: null,
            homeRef: null,
        }
    }

    componentWillMount() {
        if (this.props.profile.group) {
            this.props.firebase.database().ref(`homes/${this.props.profile.group}`).on('value', (dataSnapshot) => {
                this.setState({home: dataSnapshot.val()});
                this.setState({homeRef: dataSnapshot.ref});
            })
        }
    }

    handleLeaveMyHome() {
        /*const { home } = this.state;
        const { homeRef } = this.state;
        if (!home) {
            return alert('You don\'t belong to any home');
        }

        if (home.admin == this.props.firebase.auth().currentUser.uid) {
            Alert.alert(
                'Delete home?',
                'You are the owner of the home, this action will delete it',
                [
                    { text: 'Confirm', onPress: () => {
                        const groupKey = this.props.profile.group
                        this.props.firebase.database().ref(`/homes/${groupKey}`).remove();
                        this.props.firebase.database().ref(`/users/${this.props.firebase.auth().currentUser.uid}`).update({group:null});
                        this.props.firebase.database().ref(`/users`).orderByChild(`group`).equalTo(groupKey).update({group:null});
                        this.state.homeRef.off();
                        this.setState({home: null});
                        this.setState({homeRef: null});
                        alert('Home successfully removed');
                    }},
                    { text: 'Cancel', onPress: () => { return }, style: 'cancel' }
                ],
                { cancelable: false}
            )
        } else {
            Alert.alert(
                'Are you sure?',
                'Leave your home?',
                [
                    { text: 'Confirm', onPress: () => {
                        homeRef.once('value', (snapshotData) => {
                            const uid = this.props.firebase.auth().currentUser.uid;
                            let toUpdate = snapshotData.val().members;
                            toUpdate[uid] = null;
                            snapshotData.ref.update({members: toUpdate});
                        });
                        this.props.firebase.database().ref(`/users/${this.props.firebase.auth().currentUser.uid}`).update({group:null});
                        homeRef.off();
                        
                        alert('Home successfully left');
                        
                    }},
                    { text: 'Cancel', onPress: () => { return }, style: 'cancel' }
                ],
                { cancelable: false}
            )
        }*/
    }

    handleHomeCreation() {
        /*if (!this.state.name) {
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
        this.props.firebase.database().ref(`homes/${groupKey}`).once('value', (dataSnapshot) => {
            this.setState({home: dataSnapshot.val()});
        })*/
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
            this.props.firebase.database().ref(`homes/${Object.keys(val)[0]}`).on('value', (dataSnapshot) => {
                this.setState({home: dataSnapshot.val()});
            })
        });
    }


    render() {
        
        if (this.state.home) {
            return (
                <View style={{marginTop: 20}}>
                    <Text h1>{this.state.home.name}</Text>
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
                    <FormInput placeholder="My Home" onChangeText={(text) => this.setState({createHomeInputValue: text})}></FormInput>
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