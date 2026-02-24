import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Boton from '../components/Boton';
import Checkbox from '../components/Checkbox';
import globalStyles from '../styles/globalStyles';

export default function MateriaTareas({ route, navigation }) {
  const { id } = route.params;
  const { subjects, tasks, toggleTaskComplete } = useApp();

  const subject = subjects.find(s => s.id === id);
  const subjectTasks = tasks.filter(t => t.subjectId === id);
  const completedTasks = subjectTasks.filter(t => t.completed);
  const completionRate = subjectTasks.length > 0 
    ? (completedTasks.length / subjectTasks.length) * 100 
    : 0;

  if (!subject) {
    return (
      <View style={[globalStyles.container, globalStyles.content, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={globalStyles.statLabel}>Materia no encontrada</Text>
        <Boton
          title="Volver a materias"
          onPress={() => navigation.navigate('Materias')}
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.content}>
        <View style={globalStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={globalStyles.backButton}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={[globalStyles.headerTitle, { flex: 1 }]} numberOfLines={1}>
            {subject.name}
          </Text>
        </View>

        {/* Subject Header */}
        <Card style={[globalStyles.formCard, { backgroundColor: subject.color, borderColor: subject.color }]}>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={{ width: 64, height: 64, backgroundColor: 'white', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="book" size={32} color={subject.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[globalStyles.actionTitle, { color: 'white', fontSize: 20 }]} numberOfLines={1}>
                {subject.name}
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 12 }} numberOfLines={1}>
                {subject.professor}
              </Text>
              <View style={{ gap: 4 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
                    {completedTasks.length} de {subjectTasks.length} completadas
                  </Text>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>{Math.round(completionRate)}%</Text>
                </View>
                <View style={globalStyles.progressBar}>
                  <View style={[globalStyles.progressFill, { width: `${completionRate}%` }]} />
                </View>
              </View>
            </View>
          </View>
        </Card>

        <Boton
          title="Nueva tarea"
          onPress={() => navigation.navigate('CrearTarea')}
          style={{ marginBottom: 20 }}
        />

        {/* Task List */}
        <View style={{ gap: 12 }}>
          {subjectTasks.length === 0 ? (
            <View style={globalStyles.emptyContainer}>
              <View style={globalStyles.emptyIcon}>
                <Icon name="calendar" size={32} color="#999" />
              </View>
              <Text style={globalStyles.emptyTitle}>No hay tareas</Text>
              <Text style={globalStyles.emptyText}>
                Esta materia no tiene tareas asignadas
              </Text>
            </View>
          ) : (
            subjectTasks.map((task) => (
              <Card
                key={task.id}
                style={[
                  globalStyles.taskItem,
                  { borderColor: subject.color },
                  task.completed && { opacity: 0.6 }
                ]}
              >
                <View style={globalStyles.taskContent}>
                  <Checkbox
                    checked={task.completed}
                    onPress={() => toggleTaskComplete(task.id)}
                    style={globalStyles.taskCheckbox}
                  />
                  <View style={globalStyles.taskInfo}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('DetalleTarea', { id: task.id })}
                    >
                      <Text style={[
                        globalStyles.taskTitle,
                        task.completed && globalStyles.taskTitleCompleted
                      ]}>
                        {task.title}
                      </Text>
                    </TouchableOpacity>
                    <View style={globalStyles.taskTags}>
                      <View style={[
                        globalStyles.priorityTag,
                        task.priority === 'Alta' && { backgroundColor: '#FF9B9B' },
                        task.priority === 'Media' && { backgroundColor: '#FFE4D1' },
                        task.priority === 'Baja' && { backgroundColor: '#D4F1D4' },
                      ]}>
                        <Text style={[
                          globalStyles.priorityTagText,
                          task.priority === 'Alta' && { color: 'white' },
                        ]}>
                          {task.priority}
                        </Text>
                      </View>
                      <View style={globalStyles.dateTag}>
                        <Icon name="calendar" size={12} color="#666" />
                        <Text style={globalStyles.dateTagText}>
                          {formatDate(task.dueDate)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}