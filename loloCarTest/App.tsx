/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [input, setInput] = useState('');
  const [age, setAge] = useState('');

  interface AgifyResponse {
    age: null;
    count: number;
    name: string;
  }

  const getAge = async () => {
    const urlBase = 'https://api.agify.io/?name=';
    try {
      const response = await axios.get<AgifyResponse>(urlBase + input);
      if (response && response.status === 200) {
        if (response.data.age !== null) {
          setAge(response.data.age);
        } else {
          setAge('0');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.headerStyle}>
            <Text style={styles.sectionTitle}>Welcome to Lolocar</Text>
          </View>
          <View style={{paddingVertical: 20}}>
            <Text style={styles.bodyTitle}>What's your name?</Text>
            <TextInput
              value={input}
              onChangeText={e => {
                setInput(e);
                getAge();
              }}
              style={{backgroundColor: 'gray', color: 'white'}}
            />
          </View>
          {input.length > 3 && (
            <View style={{paddingVertical: 10}}>
              <Text
                style={
                  styles.bodyTitle
                }>{`Hola,${input}!\nTu nombre tiene ${age} años de edad`}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  bodyTitle: {
    fontSize: 16,
    fontWeight: '600',
    // color: 'white',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headerStyle: {
    backgroundColor: 'gray',
    paddingTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
