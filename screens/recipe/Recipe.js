// screens/UserScreen.js
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../../firebase';
class Recipe extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('recipe');
    this.state = {
      isLoading: true,
      recipeArr: []
    };
  }
  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const recipeArr = [];
    querySnapshot.forEach((res) => {
      const { name, ingredients, price } = res.data();
      recipeArr.push({
        key: res.id,
        res,
        name,
        ingredients,
        price,
      });
    });
    this.setState({
      recipeArr,
      isLoading: false,
   });
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
          {
            this.state.recipeArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  title={item.name}
                  subtitle={item.ingredients}
                  onPress={() => {
                    this.props.navigation.navigate('RecipeDetails', {
                      recipekey: item.key
                    });
                  }}/>
              );
            })
          }
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
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
export default Recipe;