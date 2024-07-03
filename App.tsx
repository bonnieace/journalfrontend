import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './components/authContext'; // Adjust the path if necessary
import HomeScreen from './components/screens/HomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import SignupScreen from './components/screens/SignUpScreen';
import CreateEntryScreen from './components/screens/CreateEntryScreen'; // Add the CreateEntryScreen
import { MaterialIcons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  CreateEntry: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={({ navigation }) => ({
              headerRight: () => (
                <MaterialIcons 
                  name="add" 
                  size={28} 
                  color="black" 
                  onPress={() => navigation.navigate('CreateEntry')}
                  style={{ marginRight: 10 }}
                />
              ),
            })} 
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="CreateEntry" component={CreateEntryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
