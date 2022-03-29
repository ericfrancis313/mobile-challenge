import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';

export default class App extends React.Component{
  
  constructor(props) {
    super(props);
    this.state={
      isLoading: true,
      peopleData: null,
    }
  }
  // Add Api 
  componentDidMount(){
    return fetch("https://my.api.mockaroo.com/users.json?page=20&count=5&key=930279b0")
      .then((response)=> response.json())
      .then((responseJson)=>{
        this.setState({
          isLoading: false,
          peopleData: responseJson.entries
        })
        
      })
      .catch((error)=>{
        console.log(error)
      });

  }
  render(){
    //indicate that the page is loading
    if(this.state.isLoading){
      return(
        <SafeAreaView style={styles.container}>
          <ActivityIndicator/>
        </SafeAreaView>
      )
    }else{
      // map over the people data array 
      let people = this.state.peopleData.map((val,key)=>{
        return <SafeAreaView key={key} style={styles.item}>
                  <Text>{val.email}</Text>
               </SafeAreaView>
      })
      
      return (
        <SafeAreaView style={styles.container}>
        {people}
      </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  item:{
    flex:1,
    alignSelf: 'stretch',
    alignItems:"center",
  }
});
