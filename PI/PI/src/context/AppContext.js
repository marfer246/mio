import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'Andrea Martínez',
    email: 'andrea@universidad.edu',
    avatar: 'AM'
  });
  
  const [subjects, setSubjects] = useState([
    {
      id: '1',
      name: 'Matemáticas Avanzadas',
      professor: 'Dr. García',
      color: '#A8C5E6'
    },
    {
      id: '2',
      name: 'Programación Móvil',
      professor: 'Mtra. López',
      color: '#FFD6E8'
    }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Resolver ejercicios capítulo 5',
      description: 'Ejercicios 1-10 del libro de cálculo',
      subjectId: '1',
      priority: 'Alta',
      dueDate: '2024-02-28',
      completed: false
    },
    {
      id: '2',
      title: 'Crear componente de navegación',
      description: 'Implementar bottom tabs navigation',
      subjectId: '2',
      priority: 'Media',
      dueDate: '2024-02-25',
      completed: true
    }
  ]);

  const login = (email, password) => {
    setUser({
      id: '1',
      name: 'Andrea Martínez',
      email: email,
      avatar: 'AM'
    });
  };

  const logout = () => {
    setUser(null);
  };

  const addSubject = (subject) => {
    const newSubject = {
      ...subject,
      id: Date.now().toString()
    };
    setSubjects([...subjects, newSubject]);
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString()
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTask } : task
    ));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <AppContext.Provider value={{
      user,
      subjects,
      tasks,
      login,
      logout,
      addSubject,
      addTask,
      updateTask,
      toggleTaskComplete,
      deleteTask
    }}>
      {children}
    </AppContext.Provider>
  );
};