import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

// Screens
import InicioSesion from '../screens/InicioSesion';
import Dashboard from '../screens/Dashboard';
import ListaMaterias from '../screens/ListaMaterias';
import CrearMateria from '../screens/CrearMateria';
import MateriaTareas from '../screens/MateriaTareas';
import ListaTareas from '../screens/ListaTareas';
import CrearTarea from '../screens/CrearTarea';
import EditarTarea from '../screens/EditarTarea';
import DetalleTarea from '../screens/DetalleTarea';
import Perfil from '../screens/Perfil';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MateriasStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ListaMaterias" component={ListaMaterias} />
    <Stack.Screen name="CrearMateria" component={CrearMateria} />
    <Stack.Screen name="MateriaTareas" component={MateriaTareas} />
  </Stack.Navigator>
);

const TareasStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ListaTareas" component={ListaTareas} />
    <Stack.Screen name="CrearTarea" component={CrearTarea} />
    <Stack.Screen name="EditarTarea" component={EditarTarea} />
    <Stack.Screen name="DetalleTarea" component={DetalleTarea} />
  </Stack.Navigator>
);

const TabsPrincipales = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Inicio') {
          iconName = 'home';
        } else if (route.name === 'Materias') {
          iconName = 'book';
        } else if (route.name === 'Tareas') {
          iconName = 'list';
        } else if (route.name === 'Perfil') {
          iconName = 'user';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#A8C5E6',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Inicio" component={Dashboard} />
    <Tab.Screen name="Materias" component={MateriasStack} />
    <Tab.Screen name="Tareas" component={TareasStack} />
    <Tab.Screen name="Perfil" component={Perfil} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InicioSesion" component={InicioSesion} />
      <Stack.Screen name="TabsPrincipales" component={TabsPrincipales} />
    </Stack.Navigator>
  );
}