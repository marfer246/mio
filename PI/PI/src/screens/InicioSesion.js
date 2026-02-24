import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import Input from '../components/Input';
import Boton from '../components/Boton';
import globalStyles from '../styles/globalStyles';

export default function InicioSesion({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useApp();

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    
    // Simular login
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      navigation.replace('TabsPrincipales');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={globalStyles.loginContainer}>
          {/* Logo */}
          <View style={globalStyles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={globalStyles.logo}
              resizeMode="contain"
            />
            <Text style={globalStyles.appName}>Apuntes</Text>
            <Text style={globalStyles.appSubtitle}>Gestiona tus tareas académicas</Text>
          </View>

          {/* Login Card */}
          <View style={globalStyles.loginCard}>
            <Text style={globalStyles.loginTitle}>Iniciar sesión</Text>
            <Text style={globalStyles.loginSubtitle}>
              Ingresa tus credenciales para continuar
            </Text>

            <Input
              label="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              placeholder="ejemplo@universidad.edu"
              icon="mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              icon="lock"
              secureTextEntry
            />

            <Boton
              title="Entrar"
              onPress={handleSubmit}
              loading={loading}
              style={{ marginTop: 16 }}
            />

            <TouchableOpacity>
              <Text style={globalStyles.registerLink}>
                ¿No tienes cuenta? <Text style={globalStyles.registerLinkBold}>Crear cuenta</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}