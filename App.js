import React, { useState, useEffect} from "react";
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Keyboard } from 'react-native';

export default function App(){

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}))
  const [opacity] = useState(new Animated.Value(0))
  const [logo] = useState(new Animated.ValueXY({x: 270, y: 155}))

  useEffect(() => {
    
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', KeyboardDidShow)
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', KeyboardDidHide)
    
    Animated.parallel([
      Animated.spring(offset.y,{
        toValue: 0,
        speed: 4,
        useNativeDriver: true,
        bounciness: 20
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      })

    ]).start()
    
  },[])

  function KeyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue: 165,
        duration: 150,
        useNativeDriver: false
      }),
      Animated.timing(logo.y,{
        toValue: 95,
        duration: 150,
        useNativeDriver: false
      })
    ]).start()
  }

  function KeyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue: 270,
        duration: 150,
        useNativeDriver: false
      }),
      Animated.timing(logo.y,{
        toValue: 155,
        duration: 150,
        useNativeDriver: false
      })
    ]).start()
  }

  return(
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={require('./src/assets/logo.png')}
        />
      </View>

      <Animated.View style={[
        styles.containerForm,
        {
          opacity: opacity,
          transform: [{
            translateY: offset.y
          }]
        }
        ]}>
        <TextInput
        style={styles.input}
        placeholder="Usuário"
        autoCorrect={false}
        onChangeText={() => {}}
        />
        <TextInput
        style={styles.input}
        placeholder="Senha"
        autoCorrect={false}
        onChangeText={() => {}}
        />
        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar Conta</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : '#c1c9c8'
  },
  containerLogo:{
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',   
  },
  containerForm:{
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 30
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },
  btnSubmit:{
    backgroundColor: '#949a8e',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister:{
    marginTop: 10
  },
  registerText:{
    color: '#FFF'
  }
});