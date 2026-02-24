import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Input from '../components/Input';
import globalStyles from '../styles/globalStyles';

const colorOptions = [
  { name: 'Azul', value: '#A8C5E6' },
  { name: 'Rosa', value: '#FFD6E8' },
  { name: 'Verde', value: '#D4F1D4' },
  { name: 'Lavanda', value: '#E6D7F7' },
  { name: 'Melocotón', value: '#FFE4D1' },
  { name: 'Menta', value: '#D1F2EB' },
];

export default function CrearMateria({ navigation }) {
  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
  const { addSubject } = useApp();

  const handleSubmit = () => {
    if (!name.trim() || !professor.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    addSubject({
      name,
      professor,
      color: selectedColor,
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.content}>
        <View style={globalStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={globalStyles.backButton}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={globalStyles.headerTitle}>Crear materia</Text>
        </View>

        {/* Información básica */}
        <Card style={globalStyles.formCard}>
          <Text style={globalStyles.cardTitle}>Información básica</Text>
          
          <Input
            label="Nombre de la materia"
            value={name}
            onChangeText={setName}
            placeholder="Ej: Matemáticas Avanzadas"
          />

          <Input
            label="Nombre del profesor"
            value={professor}
            onChangeText={setProfessor}
            placeholder="Ej: Dr. García"
          />
        </Card>

        {/* Color de identificación */}
        <Card style={globalStyles.formCard}>
          <Text style={globalStyles.cardTitle}>Color de identificación</Text>
          
          <View style={globalStyles.colorGrid}>
            {colorOptions.map((color) => (
              <TouchableOpacity
                key={color.value}
                style={[
                  globalStyles.colorOption,
                  { backgroundColor: color.value },
                  selectedColor === color.value && globalStyles.colorOptionSelected,
                ]}
                onPress={() => setSelectedColor(color.value)}
              >
                <View style={globalStyles.colorPreview} />
                <Text style={globalStyles.colorName}>{color.name}</Text>
                {selectedColor === color.value && (
                  <View style={globalStyles.colorCheck}>
                    <Icon name="check" size={16} color="#000" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Botones */}
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={globalStyles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={globalStyles.saveButton}
            onPress={handleSubmit}
          >
            <Text style={globalStyles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}