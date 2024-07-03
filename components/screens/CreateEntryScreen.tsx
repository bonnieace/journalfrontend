import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { JournalEntryCreate } from '../types';
import { createJournalEntry } from '../api/journal';
import { useAuth } from '../authContext'; // Assuming useAuth provides access to the token

type RootStackParamList = {
  Home: undefined;
  CreateEntry: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'CreateEntry'>;

const CreateEntryScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const handleCreateEntry = async () => {
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    try {
      const entry: JournalEntryCreate = { title, content };
      await createJournalEntry(entry, token);
      navigation.navigate('Home');
    } catch (error) {
      setError('Failed to create entry. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Enter content"
        multiline
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Create Entry" onPress={handleCreateEntry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default CreateEntryScreen;
