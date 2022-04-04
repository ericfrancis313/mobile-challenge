import React from 'react';
import { StyleSheet, Text, SafeAreaView, ActivityIndicator,Button,ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

export default function App(){
  const[peopleData,setPeopleData] = useState([]);
  const[isLoading,setIsLoading]=useState(false)
  //load blocker is used to prevent multiple API calls
  const[loadBlocker,setLoadBlocker]=useState(false)
  // Add Api 
  useEffect(()=>{
    if(loadBlocker){
      let isMounted = true;
      return fetch("https://my.api.mockaroo.com/users.json?page=20&count=5&key=930279b0")
      .then((response)=> response.json())
      .then((responseJson)=>{
      setLoadBlocker(false)
      setPeopleData(peopleData.concat(responseJson.entries));
      setIsLoading(false)
      setLoadBlocker(false)
      return () => { isMounted = false };
    })
    .catch((error)=>{
      console.log(error)
    })
    };
  });

  const handleLoader=(e)=>{
    setLoadBlocker(true)
  }
    //indicate that the page is loading
    if(isLoading){
      return(
        <SafeAreaView style={styles.container}>
          <ActivityIndicator/>
        </SafeAreaView>
      )
    }else{
      // map over the people data array 
      let people = peopleData.map((person,key)=>{     
        return <SafeAreaView key={key} style={styles.item}>
                  <Text>{person.name.firstName} {person.name.lastName}</Text>
                  <Text>Email: {person.email} </Text>
               </SafeAreaView>
      })
      
      return(
        <SafeAreaView style={styles.container}>
          {people} 
          <Button title="load people" onPress={()=>handleLoader()}></Button>
        </SafeAreaView>
      );
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
    justifyContent:"center",
    borderBottomWidth:1,
  }
});
