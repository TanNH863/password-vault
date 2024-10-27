import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import i18n from '../components/Translations';

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('signin')}</Text>
      <Text style={styles.subtitle}>{i18n.t('signin_method')}</Text>
      
      <View style={styles.methodContainer}>
        <TouchableOpacity style={styles.method} onPress={() => navigation.navigate('PINCodeSetup')}>
          <Image source={require('../assets/pin-code.png')} style={styles.methodIcon} />
          <Text style={styles.methodText}>{i18n.t('pin_code')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.method} onPress={() => navigation.navigate('FingerprintSetup')}>
          <Image source={require('../assets/fingerprint.png')} style={styles.methodIcon} />
          <Text style={styles.methodText}>{i18n.t('fingerprint')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.method} onPress={() => navigation.navigate('FaceRecognitionSetup')}>
          <Image source={require('../assets/face-recog.png')} style={styles.methodIcon} />
          <Text style={styles.methodText}>{i18n.t('face_recognition')} (Beta)</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backText}>{i18n.t('back_to_welcome')}</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  methodContainer: {
    width: '100%',
    alignItems: 'center',
  },
  method: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  methodIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  methodText: {
    fontSize: 18,
    color: '#333',
  },
  backText: {
    color: '#0377BC',
    fontSize: 16,
    marginTop: 20,
  },
});
