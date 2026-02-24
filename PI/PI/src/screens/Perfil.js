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

export default function Perfil({ navigation }) {
  const { user, tasks, subjects, logout } = useApp();

  if (!user) return null;

  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks = tasks.filter(t => !t.completed);
  const thisMonth = new Date().getMonth();
  const completedThisMonth = completedTasks.filter(
    t => new Date(t.dueDate).getMonth() === thisMonth
  ).length;

  const handleLogout = () => {
    logout();
    navigation.replace('InicioSesion');
  };

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.content}>
        <Text style={globalStyles.headerTitle}>Mi Perfil</Text>

        {/* Profile Card */}
        <Card style={[globalStyles.profileCard, { backgroundColor: '#A8C5E6' }]}>
          <View style={globalStyles.avatar}>
            <Text style={globalStyles.avatarText}>{user.avatar}</Text>
          </View>
          <Text style={globalStyles.profileName}>{user.name}</Text>
          <View style={globalStyles.profileEmail}>
            <Icon name="mail" size={16} color="rgba(0,0,0,0.7)" />
            <Text style={globalStyles.profileEmailText}>{user.email}</Text>
          </View>
        </Card>

        {/* Stats Grid */}
        <View style={globalStyles.statsGridPerfil}>
          <Card style={[globalStyles.statCardPerfil, { backgroundColor: '#FFD6E8' }]}>
            <Icon name="list" size={24} color="#000" style={{ marginBottom: 8 }} />
            <Text style={globalStyles.statNumber}>{tasks.length}</Text>
            <Text style={globalStyles.statLabel}>Total tareas</Text>
          </Card>

          <Card style={[globalStyles.statCardPerfil, { backgroundColor: '#D4F1D4' }]}>
            <Icon name="check-circle" size={24} color="#000" style={{ marginBottom: 8 }} />
            <Text style={globalStyles.statNumber}>{completedTasks.length}</Text>
            <Text style={globalStyles.statLabel}>Completadas</Text>
          </Card>

          <Card style={[globalStyles.statCardPerfil, { backgroundColor: '#FFE4D1' }]}>
            <Icon name="list" size={24} color="#000" style={{ marginBottom: 8 }} />
            <Text style={globalStyles.statNumber}>{pendingTasks.length}</Text>
            <Text style={globalStyles.statLabel}>Pendientes</Text>
          </Card>

          <Card style={[globalStyles.statCardPerfil, { backgroundColor: '#E6D7F7' }]}>
            <Icon name="book" size={24} color="#000" style={{ marginBottom: 8 }} />
            <Text style={globalStyles.statNumber}>{subjects.length}</Text>
            <Text style={globalStyles.statLabel}>Materias</Text>
          </Card>
        </View>

        {/* Monthly Achievement */}
        <Card style={[globalStyles.achievementCard, { backgroundColor: '#D1F2EB' }]}>
          <View style={globalStyles.achievementContent}>
            <View style={globalStyles.achievementIcon}>
              <Icon name="award" size={24} color="#000" />
            </View>
            <View style={globalStyles.achievementInfo}>
              <Text style={globalStyles.achievementLabel}>Logro del mes</Text>
              <Text style={globalStyles.achievementTitle}>
                <Text style={globalStyles.achievementNumber}>{completedThisMonth}</Text>{' '}
                {completedThisMonth === 1 ? 'tarea completada' : 'tareas completadas'}
              </Text>
              <Text style={globalStyles.achievementText}>¡Excelente trabajo! 🎉</Text>
            </View>
          </View>
        </Card>

        {/* Subject List */}
        <Card style={globalStyles.formCard}>
          <Text style={globalStyles.cardTitle}>Mis Materias</Text>
          <View style={{ gap: 12 }}>
            {subjects.map((subject) => {
              const subjectTasks = tasks.filter(t => t.subjectId === subject.id);
              const subjectCompleted = subjectTasks.filter(t => t.completed).length;
              
              return (
                <View
                  key={subject.id}
                  style={[
                    globalStyles.subjectItemPerfil,
                    { borderColor: subject.color, backgroundColor: subject.color + '20' }
                  ]}
                >
                  <View style={[globalStyles.subjectIconPerfil, { backgroundColor: subject.color }]}>
                    <Icon name="book" size={24} color="white" />
                  </View>
                  <View style={globalStyles.subjectInfoPerfil}>
                    <Text style={globalStyles.subjectNamePerfil} numberOfLines={1}>
                      {subject.name}
                    </Text>
                    <Text style={globalStyles.subjectProfessorPerfil} numberOfLines={1}>
                      {subject.professor}
                    </Text>
                    <Text style={globalStyles.subjectTasksPerfil}>
                      {subjectCompleted}/{subjectTasks.length} tareas
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Logout Button */}
        <TouchableOpacity
          style={globalStyles.logoutButton}
          onPress={handleLogout}
        >
          <Icon name="log-out" size={20} color="#666" />
          <Text style={globalStyles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}