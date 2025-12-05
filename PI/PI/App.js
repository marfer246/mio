import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import EstudioScreen from './screens/EstudioScreen';
import MenuScreen from './screens/MenuScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('estudio');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('./assets/splash-icon.png')} style={styles.splashImage} />
        <View style={styles.splashTextContainer}>
          <Image source={require('./assets/adaptive-icon.png')} style={styles.splashIcon} />
        </View>
      </View>
    );
  }

  const changeScreen = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'estudio' ? (
        <EstudioScreen onMenuPress={() => changeScreen('menu')} />
      ) : (
        <MenuScreen onBackPress={() => changeScreen('estudio')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e'
  },
  splashImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    opacity: 0.8
  },
  splashTextContainer: {
    position: 'absolute',
    top: '50%',
    alignItems: 'center'
  },
  splashIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    tintColor: '#fff'
  }
});