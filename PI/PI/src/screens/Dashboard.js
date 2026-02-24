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
import globalStyles from '../styles/globalStyles';

export default function Dashboard({ navigation }) {
  const { user, tasks, subjects } = useApp();

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  const nextTask = pendingTasks
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

  const getSubjectName = (subjectId) => {
    return subjects.find(s => s.id === subjectId)?.name || 'Sin materia';
  };

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
        {/* Welcome Section */}
        <View style={globalStyles.welcomeSection}>
          <Text style={globalStyles.welcomeTitle}>
            ¡Hola, {user?.name?.split(' ')[0]}!
          </Text>
          <Text style={globalStyles.welcomeSubtitle}>
            {pendingTasks.length} {pendingTasks.length === 1 ? 'tarea pendiente' : 'tareas pendientes'}
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={globalStyles.statsGrid}>
          <Card style={globalStyles.statCard}>
            <View style={[globalStyles.statIcon, { backgroundColor: '#FFD6E8' }]}>
              <Icon name="list" size={20} color="#000" />
            </View>
            <Text style={globalStyles.statNumber}>{tasks.length}</Text>
            <Text style={globalStyles.statLabel}>Total tareas</Text>
          </Card>

          <Card style={globalStyles.statCard}>
            <View style={[globalStyles.statIcon, { backgroundColor: '#D4F1D4' }]}>
              <Icon name="book" size={20} color="#000" />
            </View>
            <Text style={globalStyles.statNumber}>{subjects.length}</Text>
            <Text style={globalStyles.statLabel}>Materias</Text>
          </Card>
        </View>

        {/* Progress Card */}
        <Card style={[globalStyles.progressCard, { backgroundColor: '#E6D7F7' }]}>
          <View style={globalStyles.progressHeader}>
            <View>
              <Text style={globalStyles.progressLabel}>Progreso general</Text>
              <Text style={globalStyles.progressPercentage}>{Math.round(completionRate)}%</Text>
            </View>
            <View style={globalStyles.progressIcon}>
              <Icon name="trending-up" size={24} color="#000" />
            </View>
          </View>
          <View style={globalStyles.progressBar}>
            <View style={[globalStyles.progressFill, { width: `${completionRate}%` }]} />
          </View>
          <Text style={globalStyles.progressText}>
            {completedTasks.length} de {tasks.length} completadas
          </Text>
        </Card>

        {/* Next Task Card */}
        {nextTask && (
          <Card style={[globalStyles.nextTaskCard, { backgroundColor: '#FFE4D1' }]}>
            <View style={globalStyles.nextTaskHeader}>
              <Icon name="calendar" size={20} color="#000" />
              <View style={globalStyles.nextTaskContent}>
                <Text style={globalStyles.nextTaskLabel}>Próxima entrega</Text>
                <Text style={globalStyles.nextTaskTitle}>{nextTask.title}</Text>
                <Text style={globalStyles.nextTaskSubject}>
                  {getSubjectName(nextTask.subjectId)}
                </Text>
                <View style={globalStyles.nextTaskFooter}>
                  <View style={[
                    { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
                    nextTask.priority === 'Alta' && { backgroundColor: '#FF9B9B' },
                    nextTask.priority === 'Media' && { backgroundColor: 'white' },
                    nextTask.priority === 'Baja' && { backgroundColor: '#D4F1D4' },
                  ]}>
                    <Text style={[
                      { fontSize: 12, fontWeight: '500' },
                      nextTask.priority === 'Alta' && { color: 'white' },
                      nextTask.priority === 'Media' && { color: '#000' },
                      nextTask.priority === 'Baja' && { color: '#000' },
                    ]}>
                      {nextTask.priority}
                    </Text>
                  </View>
                  <Text style={globalStyles.nextTaskDate}>
                    {formatDate(nextTask.dueDate)}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={globalStyles.detailButton}
              onPress={() => navigation.navigate('DetalleTarea', { id: nextTask.id })}
            >
              <Text style={globalStyles.detailButtonText}>Ver detalles</Text>
            </TouchableOpacity>
          </Card>
        )}

        {/* Quick Actions */}
        <View style={globalStyles.quickActions}>
          <TouchableOpacity onPress={() => navigation.navigate('Materias')}>
            <Card style={globalStyles.actionCard}>
              <View style={globalStyles.actionContent}>
                <View style={globalStyles.actionLeft}>
                  <View style={[globalStyles.actionIcon, { backgroundColor: '#FFD6E8' }]}>
                    <Icon name="book" size={24} color="#000" />
                  </View>
                  <View>
                    <Text style={globalStyles.actionTitle}>Mis Materias</Text>
                    <Text style={globalStyles.actionSubtitle}>
                      {subjects.length} {subjects.length === 1 ? 'materia' : 'materias'}
                    </Text>
                  </View>
                </View>
                <Icon name="chevron-right" size={20} color="#999" />
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Tareas')}>
            <Card style={globalStyles.actionCard}>
              <View style={globalStyles.actionContent}>
                <View style={globalStyles.actionLeft}>
                  <View style={[globalStyles.actionIcon, { backgroundColor: '#D1F2EB' }]}>
                    <Icon name="list" size={24} color="#000" />
                  </View>
                  <View>
                    <Text style={globalStyles.actionTitle}>Todas las Tareas</Text>
                    <Text style={globalStyles.actionSubtitle}>
                      {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
                    </Text>
                  </View>
                </View>
                <Icon name="chevron-right" size={20} color="#999" />
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}