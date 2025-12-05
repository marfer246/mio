import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function MenuScreen({ onBackPress }) {
  const menuOptions = [
    { id: 1, title: 'Acerca de la Galería', description: 'Información sobre esta colección' },
    { id: 2, title: 'Cómo usar', description: 'Instrucciones de navegación' },
    { id: 3, title: 'Configuración', description: 'Ajustes de visualización' },
    { id: 4, title: 'Créditos', description: 'Información del desarrollador' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Menú de Opciones</Text>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backButtonText}>Volver a Galería</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Bienvenido al Menú</Text>
          <Text style={styles.welcomeText}>
            Esta aplicación de galería fotográfica muestra 6 imágenes con sus descripciones. 
            Desde aquí puedes acceder a diferentes opciones de configuración y información.
          </Text>
        </View>
        
        {menuOptions.map((option) => (
          <TouchableOpacity key={option.id} style={styles.optionCard}>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
        ))}
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Características de la App</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureDot}>•</Text>
            <Text style={styles.featureText}>Galería con 6 fotografías</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureDot}>•</Text>
            <Text style={styles.featureText}>Descripciones detalladas</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureDot}>•</Text>
            <Text style={styles.featureText}>Splash screen personalizado</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureDot}>•</Text>
            <Text style={styles.featureText}>Interfaz intuitiva</Text>
          </View>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versión 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 Galería Fotográfica PI</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333'
  },
  backButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#4a90e2',
    borderRadius: 5
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600'
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    padding: 15
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  optionContent: {
    flex: 1
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3
  },
  optionDescription: {
    fontSize: 13,
    color: '#777'
  },
  optionArrow: {
    fontSize: 24,
    color: '#4a90e2',
    marginLeft: 10
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  featureDot: {
    color: '#4a90e2',
    fontSize: 16,
    marginRight: 10
  },
  featureText: {
    fontSize: 14,
    color: '#555'
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20
  },
  versionText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5
  },
  copyrightText: {
    fontSize: 12,
    color: '#aaa'
  }
});