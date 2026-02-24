import React from 'react';
// Importa la librería React para poder usar componentes y JSX

import { 
  ScrollView, View, Text, StyleSheet, ImageBackground, Button, Alert, TouchableOpacity } from 'react-native';
const images = [
  // Crea una constante llamada 'images' que es un array de objetos
  // Cada objeto representa una imagen con sus propiedades
  { 
    id: 1,  //obligatoria para keys
    src: require('../assets/adaptive-icon.png'), 
    // '../assets/' significa: sube un nivel y entra a la carpeta assets
    
    title: 'Naturaleza Viva',  // Título 
    desc: 'Paisaje natural al atardecer',  // Descripción corta debajo del título
    detail: 'Esta fotografía captura la belleza de un paisaje natural durante el atardecer.'
    // Descripción larga "Ver detalles"
  },
  
  { 
    id: 2, 
    src: require('../assets/favicon.png'), 
    title: 'Arquitectura Moderna', 
    desc: 'Edificio contemporáneo', 
    detail: 'Un ejemplo de arquitectura moderna con líneas limpias y diseño minimalista.'
  },
  
  { 
    id: 3, 
    src: require('../assets/icon.png'), 
    title: 'Retrato Artístico', 
    desc: 'Expresión humana profunda', 
    detail: 'Retrato que captura la esencia y emociones del sujeto.'
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
  // El array contiene 6 objetos, cada uno con la misma estructura
  // Esto permite iterar sobre ellos fácilmente con .map()
];

export default function EstudioScreen({ onMenuPress }) {
  // Define un componente funcional llamado EstudioScreen que se exporta como default
 
  const showDetails = (title, detail) => {
    // Esta función será llamada cuando se presione el botón "Ver detalles" de cada imagen
    
    Alert.alert(
      title,      
      detail,     
      
      [// Tercer parámetro: array de objetos que definen los botones
        { 
          text: 'Cerrar',  // Texto del botón
          style: 'cancel', // Estilo del botón, 'cancel' izquierda
        }
      ],
      { cancelable: true }  
    );
  };
  
  return (
    // El return devuelve la estructura de lo que se renderizará en pantalla
    
    // CONTENEDOR PRINCIPAL
    <View style={styles.container}>
      <View style={styles.header}>
        {/* 
          Segundo View que sirve como header (encabezado) de la pantalla Contendrá el título y el botón de menu */}
        <Text style={styles.title}>Mi Galería</Text>
       
        <TouchableOpacity 
          style={styles.menuButton}  // Aplica estilos al botón
          onPress={onMenuPress}      // Cuando se presiona, ejecuta la función onMenuPress recibida por props
        >
          <Text style={styles.menuButtonText}>Menú</Text>
        </TouchableOpacity>
      </View>
      
      // CONTENIDO DESPLAZABLE
      <ScrollView 
        style={styles.scroll}  // Estilos 
        showsVerticalScrollIndicator={true}  // Muestra la barra de scroll vertical
        contentContainerStyle={styles.scrollContent}  // Estilos para el contenido interno
      >
        
        
        // LISTA DE IMÁGENES 
        {images.map((img) => (
          // .map() itera sobre el array 'images' y por cada elemento devuelve JSX 
          <View key={img.id} style={styles.card}>
            <ImageBackground 
              source={img.src}  // La imagen de fondo viene 
              style={styles.image}  // Estilos para el contenedor de ImageBackground
              imageStyle={styles.imageStyle}  // Estilos imag
            >
              
              // OVERLAY-CAPA OSCURA CON TEXTO
              <View style={styles.overlay}>
                <View style={styles.buttonContainer}>
                  {/* View que contiene el botón, usado para alinearlo */}
                  <Button 
                    title="Ver detalles"  // Texto del botón
                    onPress={() => showDetails(img.title, img.detail)}
                    color="#4a90e2"  //botón
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        ))}
        // Fin del .map() - se han renderizado las imágenes
        
        <View style={styles.footer}>    
          <Text style={styles.footerText}>Total de fotos: {images.length}</Text>
          {/* 
            Muestra el total de fotos usando images.length*/}
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  // ESTILOS DE CONTENEDORES PRINCIPALES 
  container: {
    flex: 1,  
    backgroundColor: '#f5f5f5'  
  },
  // ESTILOS DEL HEADER 
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
    shadowColor: '#000',  // Color de la sombra 
    shadowOffset: { width: 0, height: 2 },  // horizontal, 2 vertical
    shadowOpacity: 0.1,  // Opacidad de la sombra 
    shadowRadius: 2,  // Difuminado de la sombra
  },
  
  // ESTILOS DE TEXTO 
  title: {
    fontSize: 24,  
    fontWeight: 'bold',  
    color: '#333' 
  },
  
  // ESTILOS DE BOTONES 
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
  
  // ESTILOS DEL SCROLLVIEW 
  scroll: {
    flex: 1  
  },
  
  scrollContent: {
    padding: 15 
  },
  
  // ESTILOS DE TARJETAS DE IMAGEN 
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
  
  // ESTILOS DE IMAGEN DE FONDO
  image: {
    height: 220,  
    justifyContent: 'flex-end'  
  },
  
  imageStyle: {
    borderRadius: 12 
  },
  
  // ========== ESTILOS DEL OVERLAY ==========
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',  
    padding: 15,  
    borderBottomLeftRadius: 12,  
    borderBottomRightRadius: 12  
  },
  
  //ESTILOS DE TEXTO EN OVERLAY
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
  
  // ESTILOS DEL CONTENEDOR DE BOTÓN
  buttonContainer: {
    alignSelf: 'flex-start'  // Alinea el botón a la izquierda 
  },
  
});

