import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import UploadDoc from './UploadDoc';



export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <UploadDoc />
      </Layout>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
