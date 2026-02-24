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
import globalStyles from '../styles/globalStyles';

export default function ListaMaterias({ navigation }) {
  const { subjects, tasks } = useApp();

  const getTaskCount = (subjectId) => {
    return tasks.filter(t => t.subjectId === subjectId).length;
  };

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.content}>
        <View style={globalStyles.header}>
          <View>
            <Text style={globalStyles.headerTitle}>Mis Materias</Text>
            <Text style={globalStyles.statLabel}>
              {subjects.length} {subjects.length === 1 ? 'materia' : 'materias'}
            </Text>
          </View>
        </View>

        <Boton
          title="Nueva materia"
          onPress={() => navigation.navigate('CrearMateria')}
          style={{ marginBottom: 20 }}
        />

        <View style={{ gap: 12 }}>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              onPress={() => navigation.navigate('MateriaTareas', { id: subject.id })}
            >
              <Card style={{ borderColor: subject.color }}>
                <View style={globalStyles.actionContent}>
                  <View style={globalStyles.actionLeft}>
                    <View style={[globalStyles.actionIcon, { backgroundColor: subject.color }]}>
                      <Icon name="book" size={24} color="white" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={globalStyles.actionTitle} numberOfLines={1}>
                        {subject.name}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <Icon name="user" size={14} color="#666" />
                        <Text style={globalStyles.statLabel} numberOfLines={1}>
                          {subject.professor}
                        </Text>
                      </View>
                      <Text style={globalStyles.statLabel}>
                        {getTaskCount(subject.id)} {getTaskCount(subject.id) === 1 ? 'tarea' : 'tareas'}
                      </Text>
                    </View>
                  </View>
                  <Icon name="chevron-right" size={20} color="#999" />
                </View>
              </Card>
            </TouchableOpacity>
          ))}

          {subjects.length === 0 && (
            <View style={globalStyles.emptyContainer}>
              <View style={globalStyles.emptyIcon}>
                <Icon name="book" size={32} color="#999" />
              </View>
              <Text style={globalStyles.emptyTitle}>No hay materias</Text>
              <Text style={globalStyles.emptyText}>
                Comienza agregando tu primera materia
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}