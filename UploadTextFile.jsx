import React, { Component } from 'react'
import { Button, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import Toast from 'react-native-tiny-toast'




/*
TODO
For iOS, outside of the Expo Go app, the DocumentPicker module requires the iCloud entitlement to work properly. You need to set the usesIcloudStorage key to true in your app.json file as specified here.
*/


export default class UploadTextFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
        }
    }
    parseFile = async (fileUri) => {
        try {
            const content = await FileSystem.readAsStringAsync(fileUri);
            console.log(content);
            this.setState({ content: content });
            Toast.showSuccess("Quiz Generated!");

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
            <View style={styles.container}>
                <Button style={styles.uploadButton} onPress={() => this.documentPicker()}>
                    UPLOAD NOTES.TXT
                </Button>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 2
    },
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
    uploadButton: {
        margin: 5
    }
});