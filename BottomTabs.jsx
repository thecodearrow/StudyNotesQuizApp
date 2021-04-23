import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import CopyPasteTextBox from './CopyPasteTextBox';
import UploadTextFile from './UploadTextFile';
import QuizQuestions from "./QuizQuestions";

const { Navigator, Screen } = createBottomTabNavigator();

const CopyPasteScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CopyPasteTextBox />
    </Layout>
);

const UploadTxtScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <UploadTextFile />
    </Layout>
);
const QuizScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <QuizQuestions />
    </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='PASTE TEXT' />
        <BottomNavigationTab title='QUESTIONS' />
    </BottomNavigation>
);

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='CopyPaste' component={CopyPasteScreen} />
        <Screen name='Quiz' component={QuizScreen} />
    </Navigator>
);

export default AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);