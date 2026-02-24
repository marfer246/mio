//Crea una aplicación de galería fotográfica que muestre una colección de
///al menos 6 imágenes con sus descripciones.
//Requerimientos funcionales:
//1. Configurar un SplashScreen personalizado que se muestre al iniciar la
//aplicación
//2. Crear en pantalla principal con un título “Mi Galería”
//3 Implementar un ScrollView vertical que contenga mínimo 6 tarjetas de
//fotos
//4. Cada tarjeta debe contener:
//- Un ImageBackground con la fotografia
//- El título de la foto
//- Una breve descripción
//- Un Button con el texto “Ver detalles”
// ==============================================
// SECCIÓN 1: IMPORTACIONES DE MÓDULOS NECESARIOS
// ==============================================

import React from 'react';
// Importa la librería React para poder usar componentes y JSX

import { 
  View,        // Componente contenedor básico (similar a un div en web)
  Text,        // Componente para mostrar texto en pantalla
  StyleSheet,  // API para crear estilos en React Native
  TouchableOpacity, // Componente para botones personalizados (cambia opacidad al presionar)
  ScrollView   // Componente para crear un área desplazable verticalmente
} from 'react-native';
// Importa componentes específicos de React Native desde el paquete principal

// ==============================================
// SECCIÓN 2: DEFINICIÓN DEL COMPONENTE PRINCIPAL
// ==============================================

export default function MenuScreen({ onBackPress }) {
  // Define un componente funcional llamado MenuScreen que se exporta como default
  // Recibe un objeto de props, y extrae específicamente 'onBackPress' usando destructuring
  // 'onBackPress' es una función que se ejecutará cuando se presione el botón "Volver a Galería"
  
  // ==============================================
  // DATOS ESTÁTICOS - ARRAY DE OPCIONES DEL MENÚ
  // ==============================================
  
  const menuOptions = [
    // Crea una constante llamada 'menuOptions' que es un array de objetos
    // Cada objeto representa una opción del menú con sus propiedades
    
    { 
      id: 1,  // Propiedad única para identificar cada elemento (obligatoria para keys en listas)
      title: 'Acerca de la Galería',  // Título principal de la opción
      description: 'Información sobre esta colección'  // Descripción breve
    },
    
    { 
      id: 2, 
      title: 'Cómo usar', 
      description: 'Instrucciones de navegación' 
    },
    
    { 
      id: 3, 
      title: 'Configuración', 
      description: 'Ajustes de visualización' 
    },
    
    { 
      id: 4, 
      title: 'Créditos', 
      description: 'Información del desarrollador' 
    },
    
    // El array contiene 4 objetos, cada uno con la misma estructura
  ];
  
  // ==============================================
  // RETORNO DEL JSX (LO QUE SE MUESTRA EN PANTALLA)
  // ==============================================

  return (
    // El return devuelve la estructura de lo que se renderizará en pantalla
    
    // ========== CONTENEDOR PRINCIPAL ==========
    <View style={styles.container}>
      {/* 
        View es el componente contenedor básico 
        style={styles.container} aplica los estilos definidos en la constante styles
      */}
      
      // ========== HEADER DE LA PANTALLA ==========
      <View style={styles.header}>
        {/* 
          Segundo View que sirve como header (encabezado) de la pantalla
          Contendrá el título y el botón para volver
        */}
        
        <Text style={styles.title}>Menú de Opciones</Text>
        {/* 
          Text muestra "Menú de Opciones" 
          style={styles.title} aplica estilos específicos para el texto del título
        */}
        
        <TouchableOpacity 
          style={styles.backButton}  // Aplica estilos al botón
          onPress={onBackPress}      // Cuando se presiona, ejecuta la función onBackPress recibida por props
        >
          <Text style={styles.backButtonText}>Volver a Galería</Text>
          {/* Texto dentro del botón con sus propios estilos */}
        </TouchableOpacity>
      </View>
      
      // ========== CONTENIDO DESPLAZABLE ==========
      <ScrollView 
        style={styles.scroll}  // Estilos para el contenedor ScrollView
        contentContainerStyle={styles.scrollContent}  // Estilos para el contenido interno del ScrollView
      >
        {/* 
          ScrollView permite que el contenido sea desplazable verticalmente
          contentContainerStyle aplica padding al contenido interno, no al ScrollView en sí
        */}
        
        // ========== TARJETA DE BIENVENIDA ==========
        <View style={styles.welcomeCard}>
          {/* View que actúa como tarjeta de bienvenida con estilos específicos */}
          
          <Text style={styles.welcomeTitle}>Bienvenido al Menú</Text>
          {/* Título de bienvenida con estilos propios */}
          
          <Text style={styles.welcomeText}>
            Esta aplicación de galería fotográfica muestra 6 imágenes con sus descripciones. 
            Desde aquí puedes acceder a diferentes opciones de configuración y información.
          </Text>
          {/* Texto descriptivo con estilos propios y lineHeight para mejor legibilidad */}
        </View>
        
        // ========== LISTA DE OPCIONES DEL MENÚ (MAPEO DEL ARRAY) ==========
        {menuOptions.map((option) => (
          // .map() itera sobre el array 'menuOptions' y por cada elemento devuelve JSX
          // 'option' es cada objeto individual del array durante la iteración
          
          <TouchableOpacity 
            key={option.id}  // key obligatoria para identificar cada elemento único
            style={styles.optionCard}  // Aplica estilos de tarjeta de opción
            // NOTA: No hay onPress definido, sería donde se agregaría la funcionalidad
          >
            {/* 
              TouchableOpacity hace que toda la tarjeta sea presionable
              Cuando se agregue funcionalidad, onPress ejecutará alguna acción
            */}
            
            <View style={styles.optionContent}>
              {/* View contenedor para el texto de la opción */}
              
              <Text style={styles.optionTitle}>{option.title}</Text>
              {/* Muestra el título de la opción actual (option.title) */}
              
              <Text style={styles.optionDescription}>{option.description}</Text>
              {/* Muestra la descripción de la opción actual (option.description) */}
            </View>
            
            <Text style={styles.optionArrow}>›</Text>
            {/* Símbolo de flecha (›) que indica que es una opción navegable */}
          </TouchableOpacity>
        ))}
        // Fin del .map() - se han renderizado las 4 opciones del menú
        
        // ========== TARJETA DE CARACTERÍSTICAS ==========
        <View style={styles.infoCard}>
          {/* View que actúa como tarjeta informativa con características de la app */}
          
          <Text style={styles.infoTitle}>Características de la App</Text>
          {/* Título de la sección de características */}
          
          // ========== LISTA DE CARACTERÍSTICAS ==========
          <View style={styles.featureItem}>
            {/* Cada View representa un ítem de la lista de características */}
            
            <Text style={styles.featureDot}>•</Text>
            {/* Punto de lista (bullet point) con estilos específicos */}
            
            <Text style={styles.featureText}>Galería con 6 fotografías</Text>
            {/* Texto descriptivo de la característica */}
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
          // Fin de la lista de características
        </View>
        
        // ========== SECCIÓN DE VERSIÓN Y COPYRIGHT ==========
        <View style={styles.versionContainer}>
          {/* View que actúa como contenedor para información de versión */}
          
          <Text style={styles.versionText}>Versión 1.0.0</Text>
          {/* Texto que muestra el número de versión de la app */}
          
          <Text style={styles.copyrightText}>© 2024 Galería Fotográfica PI</Text>
          {/* Texto de copyright con año y nombre de la app */}
        </View>
      </ScrollView>
    </View>
  );
}

// ==============================================
// SECCIÓN 3: ESTILOS DEL COMPONENTE (StyleSheet)
// ==============================================

const styles = StyleSheet.create({
  // StyleSheet.create() crea un objeto de estilos optimizado para React Native
  // Cada propiedad del objeto es un conjunto de estilos que se puede aplicar a un componente
  
  // ========== ESTILOS DE CONTENEDORES PRINCIPALES ==========
  container: {
    flex: 1,  // Hace que el contenedor ocupe todo el espacio disponible
    backgroundColor: '#f8f9fa'  // Color de fondo gris muy claro (ligeramente diferente al anterior)
  },
  
  // ========== ESTILOS DEL HEADER ==========
  header: {
    flexDirection: 'row',  // Organiza los elementos hijos en fila (horizontal)
    justifyContent: 'space-between',  // Espacia los hijos: uno a cada extremo
    alignItems: 'center',  // Alinea los hijos verticalmente al centro
    paddingHorizontal: 15,  // Padding izquierdo y derecho de 15 unidades
    paddingVertical: 10,    // Padding superior e inferior de 10 unidades
    backgroundColor: '#fff',  // Fondo blanco
    borderBottomWidth: 1,  // Borde inferior de 1 unidad de grosor
    borderBottomColor: '#e0e0e0',  // Color gris claro para el borde inferior
    // NOTA: No tiene elevation/shadow como el header anterior, es más simple
  },
  
  // ========== ESTILOS DE TEXTO ==========
  title: {
    fontSize: 22,  // Tamaño de fuente (ligeramente más pequeño que el título anterior)
    fontWeight: 'bold',  // Texto en negrita
    color: '#333'  // Color de texto gris oscuro
  },
  
  // ========== ESTILOS DE BOTONES ==========
  backButton: {
    paddingHorizontal: 15,  // Padding interno horizontal
    paddingVertical: 8,     // Padding interno vertical
    backgroundColor: '#4a90e2',  // Color de fondo azul (mismo que el botón Menú)
    borderRadius: 5  // Bordes redondeados de 5 unidades
  },
  
  backButtonText: {
    color: '#fff',  // Texto blanco
    fontWeight: '600'  // Texto seminegrita (más grueso que normal)
  },
  
  // ========== ESTILOS DEL SCROLLVIEW ==========
  scroll: {
    flex: 1  // Ocupa todo el espacio restante después del header
  },
  
  scrollContent: {
    padding: 15  // Padding interno del contenido dentro del ScrollView
  },
  
  // ========== ESTILOS DE TARJETA DE BIENVENIDA ==========
  welcomeCard: {
    backgroundColor: '#fff',  // Fondo blanco
    borderRadius: 10,  // Bordes redondeados de 10 unidades
    padding: 20,  // Padding interno generoso
    marginBottom: 20,  // Margen inferior de 20 unidades
    elevation: 2,  // Sombra en Android
    shadowColor: '#000',  // Color de sombra
    shadowOffset: { width: 0, height: 1 },  // Desplazamiento sombra: 0 horizontal, 1 vertical
    shadowOpacity: 0.1,  // Opacidad de la sombra (10%)
    shadowRadius: 2,  // Difuminado de la sombra
  },
  
  welcomeTitle: {
    fontSize: 20,  // Tamaño de fuente mediano-grande
    fontWeight: 'bold',  // Texto en negrita
    color: '#333',  // Color de texto gris oscuro
    marginBottom: 10  // Margen inferior de 10 unidades
  },
  
  welcomeText: {
    fontSize: 14,  // Tamaño de fuente pequeño
    color: '#666',  // Color gris medio
    lineHeight: 20  // Altura de línea de 20 unidades para mejor legibilidad
  },
  
  // ========== ESTILOS DE TARJETAS DE OPCIÓN ==========
  optionCard: {
    flexDirection: 'row',  // Organiza los elementos hijos en fila
    justifyContent: 'space-between',  // Espacia los hijos: contenido a la izquierda, flecha a la derecha
    alignItems: 'center',  // Alinea los hijos verticalmente al centro
    backgroundColor: '#fff',  // Fondo blanco
    borderRadius: 10,  // Bordes redondeados de 10 unidades
    padding: 15,  // Padding interno
    marginBottom: 10,  // Margen inferior de 10 unidades entre opciones
    elevation: 2,  // Sombra en Android
    shadowColor: '#000',  // Color de sombra
    shadowOffset: { width: 0, height: 1 },  // Desplazamiento sombra
    shadowOpacity: 0.1,  // Opacidad de la sombra
    shadowRadius: 2,  // Difuminado de la sombra
  },
  
  optionContent: {
    flex: 1  // Ocupa todo el espacio disponible, empujando la flecha a la derecha
  },
  
  optionTitle: {
    fontSize: 16,  // Tamaño de fuente mediano
    fontWeight: '600',  // Texto seminegrita (no tan grueso como 'bold')
    color: '#333',  // Color de texto gris oscuro
    marginBottom: 3  // Pequeño margen inferior
  },
  
  optionDescription: {
    fontSize: 13,  // Tamaño de fuente pequeño
    color: '#777'  // Color gris
  },
  
  optionArrow: {
    fontSize: 24,  // Tamaño de fuente grande para la flecha
    color: '#4a90e2',  // Color azul (coincide con los botones)
    marginLeft: 10  // Margen izquierdo para separar del texto
  },
  
  // ========== ESTILOS DE TARJETA INFORMATIVA ==========
  infoCard: {
    backgroundColor: '#fff',  // Fondo blanco
    borderRadius: 10,  // Bordes redondeados de 10 unidades
    padding: 20,  // Padding interno generoso
    marginTop: 10,  // Margen superior de 10 unidades
    marginBottom: 20,  // Margen inferior de 20 unidades
    elevation: 2,  // Sombra en Android
    shadowColor: '#000',  // Color de sombra
    shadowOffset: { width: 0, height: 1 },  // Desplazamiento sombra
    shadowOpacity: 0.1,  // Opacidad de la sombra
    shadowRadius: 2,  // Difuminado de la sombra
  },
  
  infoTitle: {
    fontSize: 18,  // Tamaño de fuente mediano
    fontWeight: 'bold',  // Texto en negrita
    color: '#333',  // Color de texto gris oscuro
    marginBottom: 15  // Margen inferior de 15 unidades
  },
  
  // ========== ESTILOS DE ITEMS DE LISTA DE CARACTERÍSTICAS ==========
  featureItem: {
    flexDirection: 'row',  // Organiza punto y texto en fila
    alignItems: 'center',  // Alinea verticalmente al centro
    marginBottom: 8  // Margen inferior de 8 unidades entre items
  },
  
  featureDot: {
    color: '#4a90e2',  // Punto azul (mismo color de tema)
    fontSize: 16,  // Tamaño de fuente para el punto
    marginRight: 10  // Margen derecho para separar del texto
  },
  
  featureText: {
    fontSize: 14,  // Tamaño de fuente pequeño
    color: '#555'  // Color gris medio-oscuro
  },
  
  // ========== ESTILOS DE SECCIÓN DE VERSIÓN ==========
  versionContainer: {
    alignItems: 'center',  // Centra los elementos hijos horizontalmente
    paddingVertical: 20  // Padding vertical de 20 unidades
  },
  
  versionText: {
    fontSize: 14,  // Tamaño de fuente pequeño
    color: '#888',  // Color gris claro
    marginBottom: 5  // Pequeño margen inferior
  },
  
  copyrightText: {
    fontSize: 12,  // Tamaño de fuente muy pequeño
    color: '#aaa'  // Color gris muy claro
  }
  
});