import React, { Component } from 'react'
import { Button, Text } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';



/*
TODO
For iOS, outside of the Expo Go app, the DocumentPicker module requires the iCloud entitlement to work properly. You need to set the usesIcloudStorage key to true in your app.json file as specified here.
*/


export default class UploadDoc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
        }
    }
    parseFile = async (fileUri) => {
        try {
            const content = await FileSystem.readAsStringAsync(fileUri);
            this.setState({ content: content });

        } catch (e) {
            console.warn('Error parsing', e.message);
        }
    }
    documentPicker = async () => {
        let result = await DocumentPicker.getDocumentAsync(); //restrict upload formats to pdf, doc, txt only
        if (result.type == "success") {
            this.parseFile(result.uri);
        }
        else {
            //Show Toast
        }

    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.text}>
                        {this.state.content}
                    </Text>
                </ScrollView>
                <Button style={styles.uploadButton} onPress={() => this.documentPicker()}>
                    UPLOAD NOTES TXT
                </Button>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
    uploadButton: {

    }
});