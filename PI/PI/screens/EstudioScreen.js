import React from 'react';
import { ScrollView, View, Text, StyleSheet, ImageBackground, Button, Alert, TouchableOpacity } from 'react-native';

const images = [
  { 
    id: 1, 
    src: require('../assets/adaptive-icon.png'), 
    title: 'Naturaleza Viva', 
    desc: 'Paisaje natural al atardecer', 
    detail: 'Esta fotografía captura la belleza de un paisaje natural durante el atardecer. Los colores cálidos del cielo se reflejan en el agua tranquila, creando una atmósfera de paz y armonía con la naturaleza.'
  },
  { 
    id: 2, 
    src: require('../assets/favicon.png'), 
    title: 'Arquitectura Moderna', 
    desc: 'Edificio contemporáneo', 
    detail: 'Un ejemplo de arquitectura moderna con líneas limpias y diseño minimalista. La estructura combina funcionalidad con estética, mostrando cómo la arquitectura puede integrarse con el entorno urbano.'
  },
  { 
    id: 3, 
    src: require('../assets/icon.png'), 
    title: 'Retrato Artístico', 
    desc: 'Expresión humana profunda', 
    detail: 'Retrato que captura la esencia y emociones del sujeto. La iluminación cuidadosa y la composición resaltan los detalles faciales, transmitiendo una historia personal a través de la mirada.'
  },
  { 
    id: 4, 
    src: require('../assets/splash-icon.png'), 
    title: 'Ciudad Nocturna', 
    desc: 'Skyline urbano de noche', 
    detail: 'Vista panorámica de la ciudad iluminada por las luces de los edificios. La fotografía muestra el contraste entre la oscuridad del cielo y el brillo de la vida urbana que nunca duerme.'
  },
  { 
    id: 5, 
    src: require('../assets/adaptive-icon.png'), 
    title: 'Aventura al Aire Libre', 
    desc: 'Explorando nuevos horizontes', 
    detail: 'Imagen que representa la libertad y aventura de explorar espacios abiertos. Simboliza la búsqueda de nuevos retos y la conexión con entornos naturales poco frecuentados.'
  },
  { 
    id: 6, 
    src: require('../assets/favicon.png'), 
    title: 'Detalles Abstractos', 
    desc: 'Formas y texturas únicas', 
    detail: 'Fotografía abstracta que juega con formas, colores y texturas. Invita al espectador a interpretar la imagen desde diferentes perspectivas, descubriendo nuevos detalles en cada observación.'
  },
];

export default function EstudioScreen({ onMenuPress }) {
  const showDetails = (title, detail) => {
    Alert.alert(
      title,
      detail,
      [
        { 
          text: 'Cerrar', 
          style: 'cancel',
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Galería</Text>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Text style={styles.menuButtonText}>Menú</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scroll}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        {images.map((img) => (
          <View key={img.id} style={styles.card}>
            <ImageBackground 
              source={img.src} 
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.photoTitle}>{img.title}</Text>
                <Text style={styles.description}>{img.desc}</Text>
                <View style={styles.buttonContainer}>
                  <Button 
                    title="Ver detalles" 
                    onPress={() => showDetails(img.title, img.detail)}
                    color="#4a90e2"
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        ))}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Total de fotos: {images.length}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  menuButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#4a90e2',
    borderRadius: 5
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: '600'
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    padding: 15
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    height: 220,
    justifyContent: 'flex-end'
  },
  imageStyle: {
    borderRadius: 12
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },
  photoTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5
  },
  description: {
    fontSize: 14,
    color: '#f0f0f0',
    marginBottom: 10
  },
  buttonContainer: {
    alignSelf: 'flex-start'
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic'
  }
});