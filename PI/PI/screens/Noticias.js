
// ==============================================
// DATOS DE NOTICIAS POR CATEGORÍA
// =============================================
// Objeto que contiene todas las noticias organizadas por categorías
const noticias = {
  Deportes: [
    {
      id: 1,  // Identificador único para cada noticia (requerido por React para listas)
      titulo: 'México Clasifica al Mundial 2026',
      fecha: '15 Nov 2024',  // Fecha de publicación formateada
      imagen: require('../assets/icon.png'),  // Carga imagen estática del proyecto
      resumen: 'La selección mexicana asegura su lugar en la Copa del Mundo...',  // Texto corto
      contenido: 'Con un gol en el último minuto, México venció 2-1...',  // Texto completo
    },
    // Más noticias de deportes...
  ],
  
  Nacional: [
    // Estructura similar para noticias nacionales
  ],
  
  Entretenimiento: [
    // Estructura similar para entretenimiento
  ],
  
  Tecnologia: [
    // Estructura similar para tecnología
  ],
};

// ==============================================
// COMPONENTE PRINCIPAL - NoticiasScreen
// ==============================================

// Define el componente funcional principal que se exporta como default
// Recibe prop 'onMenuPress' que es función para manejar botón Menú
export default function NoticiasScreen({ onMenuPress }) {
  // useState hook: crea estado 'guardados' que es objeto vacío inicialmente
  // setGuardados es función para actualizar el estado
  const [guardados, setGuardados] = useState({});

  // FUNCIÓN: toggleGuardado - Alterna entre guardado/no guardado de noticias
  // Parámetros: categoria (string), id (number)
  const toggleGuardado = (categoria, id) => {
    // Actualiza estado usando función que recibe estado anterior (prev)
    setGuardados(prev => ({
      ...prev,  // Spread operator: copia todo el objeto anterior
      [`${categoria}-${id}`]: !prev[`${categoria}-${id}`]  // Crea clave única y niega valor
      // Ejemplo: si estaba false → true, si true → false
    }));
  };

  // FUNCIÓN: mostrarOpciones - Muestra Alert con opciones para noticia
  // Parámetros: titulo (string), contenido (string), categoria (string), id (number)
  const mostrarOpciones = (titulo, contenido, categoria, id) => {
    // Alert.alert muestra diálogo nativo
    Alert.alert(
      titulo,      // Título del Alert
      contenido,   // Mensaje del Alert
      [            // Array de botones (objetos con configuración)
        {
          text: 'Compartir',
          onPress: () => compartirNoticia(titulo, contenido),  // Ejecuta función al presionar
        },
        {
          // Texto condicional: si está guardado → "Quitar de guardados", sino → "Guardar"
          text: guardados[`${categoria}-${id}`] ? 'Quitar de guardados' : 'Guardar',
          onPress: () => toggleGuardado(categoria, id),  // Alterna estado guardado
        },
        {
          text: 'Cerrar',
          style: 'cancel',  // Estilo especial en iOS (suele ponerse a la izquierda)
          // Sin onPress → cierra automáticamente
        },
      ],
      { cancelable: true }  // Permite cerrar tocando fuera del Alert (solo Android)
    );
  };

  // FUNCIÓN: compartirNoticia - Comparte noticia usando API nativa Share
  // async/await porque Share.share es asíncrono (puede tomar tiempo)
  const compartirNoticia = async (titulo, contenido) => {
    try {
      // Llama a API Share nativa del dispositivo
      await Share.share({
        title: titulo,  // Título para compartir
        message: `${titulo}\n\n${contenido}\n\nCompartido desde InfoNoticias App`,
        // Formatea mensaje con saltos de línea (\n)
      });
    } catch (error) {
      // Captura errores (ej: si usuario cancela compartir)
      console.error('Error al compartir:', error);
    }
  };

  // ==============================================
  // RETURN: Lo que se renderiza en pantalla
  // ==============================================

  return (
    // SafeAreaView asegura contenido no se esconde detrás notch/bordes
    <SafeAreaView style={styles.container}>
      {/* StatusBar controla color barra de estado (negro sobre blanco) */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* ========== HEADER FIJADO ========== */}
      {/* View que actúa como encabezado fijo de la app */}
      <View style={styles.header}>
        {/* Título principal del portal de noticias */}
        <Text style={styles.headerTitle}>InfoNoticias MX</Text>
        {/* Subtítulo descriptivo */}
        <Text style={styles.headerSubtitle}>Tu portal de noticias confiable</Text>
        
        {/* Botón Menú: TouchableOpacity = botón personalizable */}
        <TouchableOpacity 
          style={styles.menuButton}  // Estilos visuales del botón
          onPress={onMenuPress}      // Ejecuta función pasada por props
        >
          {/* Texto dentro del botón */}
          <Text style={styles.menuButtonText}>Menú</Text>
        </TouchableOpacity>
      </View>

      {/* ========== SCROLLVIEW PRINCIPAL ========== */}
      {/* Área desplazable que contiene todo el contenido */}
      <ScrollView 
        style={styles.scrollView}  // Estilos del contenedor
        showsVerticalScrollIndicator={true}  // Muestra barra de scroll vertical
        contentContainerStyle={styles.scrollContent}  // Estilos del contenido interno
      >
        {/* ========== SECCIÓN DEPORTES ========== */}
        {/* Cada sección es un View contenedor */}
        <View style={styles.seccionContainer}>
          {/* Encabezado de sección con título y contador */}
          <View style={styles.seccionHeader}>
            {/* Título de sección con emoji */}
            <Text style={styles.seccionTitulo}>🏆 Deportes</Text>
            {/* Contador dinámico: muestra número de artículos en esta categoría */}
            <Text style={styles.seccionContador}>{noticias.Deportes.length} artículos</Text>
          </View>
          
          {/* Contenedor para artículos de esta sección */}
          <View style={styles.articulosContainer}>
            {/* .map() itera sobre array noticias.Deportes */}
            {noticias.Deportes.map((articulo) => (
              {/* Cada artículo es una tarjeta con key única (requerido por React) */}
              <View key={articulo.id} style={styles.tarjeta}>
                {/* ImageBackground: imagen como fondo con overlay encima */}
                <ImageBackground 
                  source={articulo.imagen}  // Imagen desde require()
                  style={styles.imagenFondo}  // Estilos del contenedor
                  imageStyle={styles.imagenEstilo}  // Estilos de la imagen misma
                >
                  {/* Overlay: capa semitransparente oscura para mejorar legibilidad */}
                  <View style={styles.overlay}>
                    {/* Cabecera de tarjeta con fecha y botón guardar */}
                    <View style={styles.tarjetaHeader}>
                      {/* Fecha de publicación */}
                      <Text style={styles.tarjetaFecha}>{articulo.fecha}</Text>
                      {/* Botón para guardar/quitar de guardados */}
                      <TouchableOpacity 
                        onPress={() => toggleGuardado('Deportes', articulo.id)}  // Alterna estado
                        style={styles.guardarButton}
                      >
                        {/* Estrella: ★ si guardado, ☆ si no guardado */}
                        <Text style={styles.guardarButtonText}>
                          {guardados[`Deportes-${articulo.id}`] ? '★' : '☆'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    
                    {/* Título del artículo */}
                    <Text style={styles.tarjetaTitulo}>{articulo.titulo}</Text>
                    {/* Resumen breve del artículo */}
                    <Text style={styles.tarjetaResumen}>{articulo.resumen}</Text>
                    
                    {/* Botón "Leer más" que muestra opciones */}
                    <TouchableOpacity
                      style={styles.leerMasButton}
                      // Al presionar, muestra Alert con opciones
                      onPress={() => mostrarOpciones(
                        articulo.titulo, 
                        articulo.contenido, 
                        'Deportes', 
                        articulo.id
                      )}
                    >
                      <Text style={styles.leerMasText}>Leer más</Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </View>
        </View>

        {/* ========== SECCIÓN NACIONAL ========== */}
        {/* Misma estructura que Deportes pero con datos diferentes */}
        <View style={styles.seccionContainer}>
          <View style={styles.seccionHeader}>
            <Text style={styles.seccionTitulo}>🇲🇽 Nacional</Text>
            <Text style={styles.seccionContador}>{noticias.Nacional.length} artículos</Text>
          </View>
          
          <View style={styles.articulosContainer}>
            {noticias.Nacional.map((articulo) => (
              <View key={articulo.id} style={styles.tarjeta}>
                {/* ... mismo patrón que en Deportes ... */}
              </View>
            ))}
          </View>
        </View>

        {/* ========== SECCIÓN ENTRETENIMIENTO ========== */}
        {/* Misma estructura */}
        <View style={styles.seccionContainer}>
          {/* ... */}
        </View>

        {/* ========== SECCIÓN TECNOLOGÍA ========== */}
        {/* Misma estructura */}
        <View style={styles.seccionContainer}>
          {/* ... */}
        </View>

        {/* ========== RESUMEN FINAL ========== */}
        {/* Sección inferior con estadísticas */}
        <View style={styles.resumenContainer}>
          {/* Título del resumen */}
          <Text style={styles.resumenTitulo}>Resumen del día</Text>
          
          {/* Contenedor para estadísticas en fila */}
          <View style={styles.resumenStats}>
            {/* Estadística 1: Total de noticias */}
            <View style={styles.statItem}>
              {/* Calcula total sumando longitud de todos los arrays */}
              <Text style={styles.statNumero}>
                {Object.keys(noticias).reduce((total, cat) => total + noticias[cat].length, 0)}
              </Text>
              <Text style={styles.statLabel}>Noticias totales</Text>
            </View>
            
            {/* Estadística 2: Noticias guardadas */}
            <View style={styles.statItem}>
              {/* Filtra objeto guardados por valores true y cuenta */}
              <Text style={styles.statNumero}>
                {Object.keys(guardados).filter(key => guardados[key]).length}
              </Text>
              <Text style={styles.statLabel}>Guardadas</Text>
            </View>
            
            {/* Estadística 3: Categorías */}
            <View style={styles.statItem}>
              <Text style={styles.statNumero}>4</Text>
              <Text style={styles.statLabel}>Categorías</Text>
            </View>
          </View>
          
          {/* Botón para actualizar noticias (sin funcionalidad aún) */}
          <TouchableOpacity style={styles.refreshButton}>
            <Text style={styles.refreshButtonText}>🔄 Actualizar noticias</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==============================================
// ESTILOS CON StyleSheet.create()
// ==============================================

// StyleSheet.create optimiza estilos para React Native (mejor rendimiento)
const styles = StyleSheet.create({
  // Contenedor principal: ocupa toda la pantalla con fondo gris claro
  container: {
    flex: 1,  // Ocupa todo el espacio disponible del padre
    backgroundColor: '#f8f9fa',  // Color de fondo hexadecimal
  },
  
  // HEADER: Encabezado fijo en la parte superior
  header: {
    backgroundColor: '#1a237e',  // Azul oscuro
    paddingHorizontal: 20,  // Padding izquierda/derecha
    paddingTop: 15,  // Padding superior
    paddingBottom: 10,  // Padding inferior
    borderBottomLeftRadius: 20,  // Redondea esquina inferior izquierda
    borderBottomRightRadius: 20,  // Redondea esquina inferior derecha
    elevation: 8,  // Sombra en Android (número mayor = sombra más pronunciada)
    shadowColor: '#000',  // Color de sombra (negro)
    shadowOffset: { width: 0, height: 4 },  // Desplazamiento sombra: 0 horizontal, 4 vertical
    shadowOpacity: 0.3,  // Opacidad 30%
    shadowRadius: 8,  // Difuminado de 8 unidades
  },
  
  // Título principal del header
  headerTitle: {
    fontSize: 28,  // Tamaño de letra grande
    fontWeight: 'bold',  // Texto en negrita
    color: '#fff',  // Texto blanco
    textAlign: 'center',  // Centrado horizontal
    marginBottom: 5,  // Espacio inferior
  },
  
  // Subtítulo del header
  headerSubtitle: {
    fontSize: 14,  // Tamaño pequeño
    color: 'rgba(255, 255, 255, 0.8)',  // Blanco al 80% opacidad
    textAlign: 'center',  // Centrado
    marginBottom: 15,  // Espacio inferior
  },
  
  // Botón Menú en header
  menuButton: {
    position: 'absolute',  // Posicionamiento absoluto respecto al header
    top: 15,  // 15 unidades desde el borde superior
    right: 20,  // 20 unidades desde el borde derecho
    backgroundColor: 'rgba(255, 255, 255, 0.2)',  // Blanco semitransparente
    paddingHorizontal: 15,  // Padding interno horizontal
    paddingVertical: 8,  // Padding interno vertical
    borderRadius: 20,  // Bordes completamente redondeados
  },
  
  // Texto dentro del botón Menú
  menuButtonText: {
    color: '#fff',  // Blanco
    fontWeight: '600',  // Seminegrita (más grueso que normal)
    fontSize: 14,  // Tamaño pequeño
  },
  
  // Área desplazable principal
  scrollView: {
    flex: 1,  // Ocupa espacio restante después del header
  },
  
  // Estilos para el contenido interno del ScrollView
  scrollContent: {
    padding: 15,  // Padding interno de 15 unidades
    paddingBottom: 30,  // Padding inferior extra para que no quede pegado al fondo
  },
  
  // Contenedor de cada sección (Deportes, Nacional, etc.)
  seccionContainer: {
    marginBottom: 25,  // Espacio entre secciones
    backgroundColor: '#fff',  // Fondo blanco
    borderRadius: 15,  // Bordes redondeados
    padding: 15,  // Padding interno
    elevation: 4,  // Sombra media
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  
  // Encabezado de cada sección (título + contador)
  seccionHeader: {
    flexDirection: 'row',  // Elementos en fila (horizontal)
    justifyContent: 'space-between',  // Espacio entre elementos
    alignItems: 'center',  // Alineación vertical al centro
    marginBottom: 15,  // Espacio inferior
    paddingBottom: 10,  // Padding inferior
    borderBottomWidth: 2,  // Línea divisoria de 2 unidades
    borderBottomColor: '#f0f0f0',  // Color gris muy claro
  },