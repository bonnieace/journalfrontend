import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '../authContext';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  CreateEntry: undefined;
  Signup: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Home'>;

interface JournalEntry {
  id: number;
  title: string;
  content: string;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();

  useFocusEffect(
    useCallback(() => {
      fetchEntries();
    }, [])
  );

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/entries', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch entries');
    } finally {
      setLoading(false);
    }
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <View style={styles.entry}>
      <Text style={styles.entryTitle}>{item.title}</Text>
      <Text style={styles.entryContent}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>My Journal</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={entries}
            renderItem={renderEntry}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  entry: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  entryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  entryContent: {
    fontSize: 18,
    color: '#333',
  },
});

export default HomeScreen;
