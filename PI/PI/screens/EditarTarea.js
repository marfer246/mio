import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Input from '../components/Input';
import globalStyles from '../styles/globalStyles';

export default function EditarTarea({ route, navigation }) {
  const { id } = route.params;
  const { tasks, subjects, updateTask } = useApp();

  const task = tasks.find(t => t.id === id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [priority, setPriority] = useState('Media');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setSubjectId(task.subjectId);
      setPriority(task.priority);
      setDueDate(new Date(task.dueDate));
    }
  }, [task]);

  if (!task) {
    return (
      <View style={[globalStyles.container, globalStyles.content, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={globalStyles.statLabel}>Tarea no encontrada</Text>
        <TouchableOpacity
          style={globalStyles.saveButton}
          onPress={() => navigation.navigate('Tareas')}
        >
          <Text style={globalStyles.saveButtonText}>Volver a tareas</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSubmit = () => {
    if (!title.trim() || !subjectId) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    updateTask(task.id, {
      title,
      description,
      subjectId,
      priority,
      dueDate: dueDate.toISOString().split('T')[0],
    });
    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.content}>
        <View style={globalStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={globalStyles.backButton}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={globalStyles.headerTitle}>Editar tarea</Text>
        </View>

        {/* Información de la tarea */}
        <Card style={globalStyles.formCard}>
          <Text style={globalStyles.cardTitle}>Información de la tarea</Text>
          
          <Input
            label="Título"
            value={title}
            onChangeText={setTitle}
            placeholder="Ej: Resolver ejercicios del capítulo 5"
          />

          <Input
            label="Descripción"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe los detalles..."
            multiline
            numberOfLines={4}
          />

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Materia</Text>
            <TouchableOpacity
              style={globalStyles.pickerButton}
              onPress={() => setShowSubjectPicker(!showSubjectPicker)}
            >
              <Text style={subjectId ? globalStyles.pickerText : globalStyles.pickerPlaceholder}>
                {subjectId 
                  ? subjects.find(s => s.id === subjectId)?.name 
                  : 'Selecciona una materia'}
              </Text>
              <Icon name="chevron-down" size={20} color="#999" />
            </TouchableOpacity>

            {showSubjectPicker && (
              <View style={globalStyles.subjectList}>
                {subjects.map((subject) => (
                  <TouchableOpacity
                    key={subject.id}
                    style={globalStyles.subjectItem}
                    onPress={() => {
                      setSubjectId(subject.id);
                      setShowSubjectPicker(false);
                    }}
                  >
                    <View style={[globalStyles.subjectDot, { backgroundColor: subject.color }]} />
                    <Text style={globalStyles.subjectItemText}>{subject.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </Card>

        {/* Prioridad */}
        <Card style={globalStyles.formCard}>
          <Text style={globalStyles.cardTitle}>Prioridad</Text>
          
          <View style={globalStyles.priorityGrid}>
            <TouchableOpacity
              style={[
                globalStyles.priorityOption,
                priority === 'Alta' && globalStyles.priorityOptionActive,
                priority === 'Alta' && { backgroundColor: '#FF9B9B' }
              ]}
              onPress={() => setPriority('Alta')}
            >
              <Text style={[
                globalStyles.priorityOptionText,
                priority === 'Alta' && globalStyles.priorityOptionTextActive
              ]}>Alta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                globalStyles.priorityOption,
                priority === 'Media' && globalStyles.priorityOptionActive,
                priority === 'Media' && { backgroundColor: '#FFE4D1' }
              ]}
              onPress={() => setPriority('Media')}
            >
              <Text style={[
                globalStyles.priorityOptionText,
                priority === 'Media' && globalStyles.priorityOptionTextActive
              ]}>Media</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                globalStyles.priorityOption,
                priority === 'Baja' && globalStyles.priorityOptionActive,
                priority === 'Baja' && { backgroundColor: '#D4F1D4' }
              ]}
              onPress={() => setPriority('Baja')}
            >
              <Text style={[
                globalStyles.priorityOptionText,
                priority === 'Baja' && globalStyles.priorityOptionTextActive
              ]}>Baja</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Fecha de entrega */}
        <Card style={globalStyles.formCard}>
          <View style={globalStyles.dateHeader}>
            <Icon name="calendar" size={20} color="#000" />
            <Text style={globalStyles.cardTitle}>Fecha de entrega</Text>
          </View>
          
          <TouchableOpacity
            style={globalStyles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={globalStyles.dateText}>{formatDate(dueDate)}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
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
            <Text style={globalStyles.saveButtonText}>Actualizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}