// screens/AddUserScreen.js
import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../firebase';
class AddRecipe extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore.collection('recipe');
    this.state = {
      name: '',
      ingredients: '',
      price: '',
      isLoading: false
    };
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  storeRecipe() {
    if(this.state.name === ''){
     alert('Fill at least Recipe name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        name: this.state.name,
        email: this.state.ingredients,
        mobile: this.state.price,
      }).then((res) => {
        this.setState({
          name: '',
          ingredients: '',
          price: '',
          isLoading: false,
        });
        this.props.navigation.navigate('Recipe')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Ingredients'}
              value={this.state.ingredients}
              onChangeText={(val) => this.inputValueUpdate(val, 'ingredients')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Price'}
              value={this.state.price}
              onChangeText={(val) => this.inputValueUpdate(val, 'price')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add Recipe'
            onPress={() => this.storeRecipe()} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default AddRecipe;