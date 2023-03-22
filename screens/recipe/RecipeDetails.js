// screens/UserDetailScreen.js
import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../firebase';
class RecipeDetails extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      ingredients: '',
      price: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('recipe').doc(this.props.route.params.recipekey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const recipe = res.data();
        this.setState({
          key: res.id,
          name: recipe.name,
          email: recipe.ingredients,
          mobile: recipe.price,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  updateRecipe() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('recipe').doc(this.state.key);
    updateDBRef.set({
      name: this.state.name,
      ingredients: this.state.ingredients,
      price: this.state.price,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        ingredients: '',
        price: '',
        isLoading: false,
      });
      this.props.navigation.navigate('Recipe');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
  deleteUser() {
    const dbRef = firebase.firestore().collection('recipe').doc(this.props.route.params.recipekey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('Recipe');
      })
  }
  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Recipe',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteRecipe()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
            title='Update'
            onPress={() => this.updatePrice()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
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
  },
  button: {
    marginBottom: 7, 
  }
})
export default RecipeDetails;