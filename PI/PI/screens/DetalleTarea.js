import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Boton from '../components/Boton';
import globalStyles from '../styles/globalStyles';

export default function DetalleTarea({ route, navigation }) {
  const { id } = route.params;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { tasks, subjects, toggleTaskComplete, deleteTask } = useApp();

  const task = tasks.find(t => t.id === id);
  const subject = task ? subjects.find(s => s.id === task.subjectId) : null;

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

  const handleDelete = () => {
    deleteTask(task.id);
    setShowDeleteModal(false);
    navigation.navigate('Tareas');
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
        <View style={globalStyles.content}>
          <View style={[globalStyles.header, { justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={globalStyles.backButton}>
                <Icon name="arrow-left" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={globalStyles.headerTitle}>Detalle</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditarTarea', { id: task.id })}
              style={{ padding: 8 }}
            >
              <Icon name="edit" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Task Card */}
          <Card style={[
            globalStyles.formCard,
            { borderColor: subject?.color, backgroundColor: subject?.color + '20' }
          ]}>
            <View style={{ gap: 16 }}>
              <Text style={[globalStyles.welcomeTitle, { fontSize: 24 }]}>
                {task.title}
              </Text>
              {subject && (
                <View style={[globalStyles.subjectTag, { backgroundColor: subject.color, alignSelf: 'flex-start' }]}>
                  <Icon name="book" size={14} color="white" style={{ marginRight: 4 }} />
                  <Text style={globalStyles.subjectTagText}>{subject.name}</Text>
                </View>
              )}
            </View>
          </Card>

          {/* Status Button */}
          <TouchableOpacity
            style={[
              globalStyles.saveButton,
              { height: 56, marginBottom: 16 },
              task.completed && { backgroundColor: '#D4F1D4' }
            ]}
            onPress={() => toggleTaskComplete(task.id)}
          >
            <Icon 
              name={task.completed ? "check-circle" : "circle"} 
              size={20} 
              color="#000" 
              style={{ marginRight: 8 }}
            />
            <Text style={globalStyles.saveButtonText}>
              {task.completed ? 'Tarea completada' : 'Marcar como completada'}
            </Text>
          </TouchableOpacity>

          {/* Info Cards */}
          <View style={globalStyles.statsGrid}>
            <Card style={[
              globalStyles.statCard,
              task.priority === 'Alta' && { backgroundColor: '#FF9B9B' },
              task.priority === 'Media' && { backgroundColor: '#FFE4D1' },
              task.priority === 'Baja' && { backgroundColor: '#D4F1D4' },
            ]}>
              <Icon name="flag" size={20} color="#000" style={{ marginBottom: 8 }} />
              <Text style={globalStyles.statLabel}>Prioridad</Text>
              <Text style={globalStyles.statNumber}>{task.priority}</Text>
            </Card>

            <Card style={[globalStyles.statCard, { backgroundColor: '#E6D7F7' }]}>
              <Icon name="calendar" size={20} color="#000" style={{ marginBottom: 8 }} />
              <Text style={globalStyles.statLabel}>Fecha límite</Text>
              <Text style={[globalStyles.statLabel, { fontSize: 14 }]} numberOfLines={2}>
                {formatDate(task.dueDate)}
              </Text>
            </Card>
          </View>

          {/* Description */}
          <Card style={globalStyles.formCard}>
            <Text style={globalStyles.cardTitle}>Descripción</Text>
            <Text style={globalStyles.statLabel}>
              {task.description || 'Sin descripción'}
            </Text>
          </Card>

          {/* Professor Info */}
          {subject && (
            <Card style={globalStyles.formCard}>
              <Text style={globalStyles.statLabel}>Profesor</Text>
              <Text style={[globalStyles.statNumber, { fontSize: 18 }]}>
                {subject.professor}
              </Text>
            </Card>
          )}

          {/* Delete Button */}
          <TouchableOpacity
            style={[globalStyles.logoutButton, { borderColor: '#FF9B9B' }]}
            onPress={() => setShowDeleteModal(true)}
          >
            <Icon name="trash-2" size={20} color="#FF9B9B" />
            <Text style={[globalStyles.logoutButtonText, { color: '#FF9B9B' }]}>
              Eliminar tarea
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Delete Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalTitle}>¿Estás seguro?</Text>
            <Text style={globalStyles.modalDescription}>
              Esta acción no se puede deshacer. La tarea será eliminada permanentemente.
            </Text>
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity
                style={globalStyles.modalCancelButton}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={globalStyles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalStyles.modalDeleteButton}
                onPress={handleDelete}
              >
                <Text style={globalStyles.modalDeleteText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
