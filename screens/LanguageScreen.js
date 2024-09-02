import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { LanguageContext } from '../contexts/LanguageContext';

export default function LanguageScreen({ navigation }) {
  const { changeLanguage } = useContext(LanguageContext);

  const selectLanguage = (lang) => {
    changeLanguage(lang);
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Language</Text>
      <TouchableOpacity style={styles.languageButton} onPress={() => selectLanguage('en')}>
        <Text style={styles.languageText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.languageButton} onPress={() => selectLanguage('es')}>
        <Text style={styles.languageText}>Español</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.languageButton} onPress={() => selectLanguage('vi')}>
        <Text style={styles.languageText}>Tiếng Việt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  languageButton: {
    backgroundColor: '#0377BC',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  languageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
