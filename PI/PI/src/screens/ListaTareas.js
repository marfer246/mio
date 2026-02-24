import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Boton from '../components/Boton';
import Checkbox from '../components/Checkbox';
import globalStyles from '../styles/globalStyles';

export default function ListaTareas({ navigation }) {
  const { tasks, subjects, toggleTaskComplete } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'

  const getSubject = (subjectId) => {
    return subjects.find(s => s.id === subjectId);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'pending' ? !task.completed :
      task.completed;
    return matchesSearch && matchesFilter;
  });

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
          <View>
            <Text style={globalStyles.headerTitle}>Tareas</Text>
            <Text style={globalStyles.statLabel}>
              {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
            </Text>
          </View>
        </View>

        <Boton
          title="Nueva tarea"
          onPress={() => navigation.navigate('CrearTarea')}
          style={{ marginBottom: 20 }}
        />

        {/* Search */}
        <View style={globalStyles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={globalStyles.searchIcon} />
          <TextInput
            style={globalStyles.searchInput}
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#999"
          />
        </View>

        {/* Filter Buttons */}
        <View style={globalStyles.filterContainer}>
          <TouchableOpacity
            style={[
              globalStyles.filterButton,
              filter === 'all' && [globalStyles.filterButtonActive, { backgroundColor: '#A8C5E6' }]
            ]}
            onPress={() => setFilter('all')}
          >
            <Text style={[
              globalStyles.filterText,
              filter === 'all' && globalStyles.filterTextActive
            ]}>Todas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              globalStyles.filterButton,
              filter === 'pending' && [globalStyles.filterButtonActive, { backgroundColor: '#FFE4D1' }]
            ]}
            onPress={() => setFilter('pending')}
          >
            <Text style={[
              globalStyles.filterText,
              filter === 'pending' && globalStyles.filterTextActive
            ]}>Pendientes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              globalStyles.filterButton,
              filter === 'completed' && [globalStyles.filterButtonActive, { backgroundColor: '#D4F1D4' }]
            ]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[
              globalStyles.filterText,
              filter === 'completed' && globalStyles.filterTextActive
            ]}>Completadas</Text>
          </TouchableOpacity>
        </View>

        {/* Task List */}
        <View style={{ gap: 12 }}>
          {filteredTasks.map((task) => {
            const subject = getSubject(task.subjectId);
            return (
              <Card
                key={task.id}
                style={[
                  globalStyles.taskItem,
                  { borderColor: subject?.color },
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
                      {subject && (
                        <View style={[globalStyles.subjectTag, { backgroundColor: subject.color }]}>
                          <Text style={globalStyles.subjectTagText}>{subject.name}</Text>
                        </View>
                      )}
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
            );
          })}

          {filteredTasks.length === 0 && (
            <View style={globalStyles.emptyContainer}>
              <View style={globalStyles.emptyIcon}>
                <Icon name="search" size={32} color="#999" />
              </View>
              <Text style={globalStyles.emptyText}>
                {searchTerm 
                  ? 'No se encontraron tareas'
                  : filter === 'pending'
                  ? 'No hay tareas pendientes'
                  : filter === 'completed'
                  ? 'No hay tareas completadas'
                  : 'No hay tareas'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}