import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { Alert, StyleSheet, View, Share, KeyboardAvoidingView } from 'react-native';
import { Divider, List, ListItem, Header, Button, Card, Text, FormInput, FormLabel } from 'react-native-elements';
import * as actions from '../actions/actionsCreators';

class MyHome extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputHomeName: null,
        inputInvitationCode: null
      }
    }
  
    handleLeaveMyHome() {
      const uid = this.props.currentUser.uid;
      this.props.leaveHome(this.props.home.key, uid);
    }
  
    handleHomeCreation() {
      if (!this.state.inputHomeName) {
        return alert(`Error : ${this.state.inputHomeName} is not a valid home name`);
      }

      const uid = this.props.currentUser.uid;
      this.props.createHome(this.state.inputHomeName, uid);
    }
  
    handleHomeJoining() {
      const uid = this.props.currentUser.uid;
      this.props.joinHome(this.state.inputInvitationCode, uid);
    }
  
    render() {
      if (this.props.errorJoinHome) {
        alert(this.props.errorJoinHome);
        this.props.setNoErrorJoinHome();
      }
        if (this.props.home) {
              return (
                <View>
                  <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
                    centerComponent={{ text: 'My Home', style: { color: '#fff' } }}
                  />
                  <Text h1 style={{marginTop:70, textAlign:'center'}}>{this.props.home.name}</Text>
                  <Text h4 style={{marginTop:40}}>Members</Text>
                  <List containerStyle={{ marginBottom: 20 }}>
                    {
                      Object.keys(this.props.home.members).map((e) => (
                        <ListItem
                          key={e}
                          title={e}
                          hideChevron={true}
                        />
                      ))
                    }
                  </List>
                  <Button title="Leave my home" icon={{name: "exit-to-app"}} backgroundColor='#3D6DCC' style={{ marginTop: 20 }} onPress={() => this.handleLeaveMyHome()} />
                  <Button title='Share an invitation' icon={{name: "share"}} backgroundColor='#3D6DCC' style={{ marginTop: 20 }} onPress={() => { Share.share({ message: "Join my home using this invitation code : " + this.props.home.key, title: "Title" }, { dialogTitle: "Title" }) }} />
                </View>
              )
          }
          return (
            <KeyboardAvoidingView behavior="position">
              <Header
                statusBarProps={{ barStyle: 'light-content' }}
                outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
                centerComponent={{ text: 'My Home', style: { color: '#fff' } }}
              />
              <View style={{ marginTop: 80 }}>
                <Card>
                  <Text style={{ textAlign: 'center' }}>CREATE MY HOME</Text>
                  <Divider />
                  <FormLabel>Name</FormLabel>
                  <FormInput placeholder="My Home" onChangeText={(text) => this.setState({ inputHomeName: text })}></FormInput>
                  <Button style={{ marginTop: 20 }} icon={{ name: "library-add" }} backgroundColor='#3D6DCC' title='Create' onPress={() => this.handleHomeCreation()} />
                </Card>
                <Card>
                  <Text style={{ textAlign: 'center' }}>JOIN A HOME</Text>
                  <Divider />
                  <FormLabel>Invitation code</FormLabel>
                  <FormInput placeholder="Invitation code..." onChangeText={(text) => this.setState({ inputInvitationCode: text })}></FormInput>
                  <Button style={{ marginTop: 20 }} icon={{ name: "call-merge" }} backgroundColor='#3D6DCC' title='Join' onPress={() => this.handleHomeJoining()} />
                </Card>
              </View>
              
            </KeyboardAvoidingView>
          );
    }
  }
  
  function mapStateToProps(state) {
    return { home: state.home, errorJoinHome: state.errorJoinHome, currentUser: state.currentUser };
  }
  
  export default connect(mapStateToProps, actions)(MyHome)