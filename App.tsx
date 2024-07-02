import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
}

const sampleEntries: JournalEntry[] = [
  { id: '1', title: 'Day at the Beach', content: 'Today was a great day...', date: '2024-07-01' },
  { id: '2', title: 'Grocery Shopping', content: 'Bought some fresh fruits...', date: '2024-06-30' },
];

const App: React.FC = () => {
  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <View style={styles.entry}>
      <Text style={styles.entryTitle}>{item.title}</Text>
      <Text style={styles.entryDate}>{item.date}</Text>
      <Text style={styles.entryContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Journal</Text>
      <FlatList
        data={sampleEntries}
        renderItem={renderEntry}
        keyExtractor={item => item.id}
      />
      <Button title="Add New Entry" onPress={() => { /* Navigation to add entry screen */ }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  entry: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  entryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  entryDate: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  entryContent: {
    fontSize: 18,
    color: '#333',
  },
});

export default App;
