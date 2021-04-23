import React, { Component } from 'react'
import { } from 'react-native';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';
import { connect } from 'react-redux';
import Constants from 'expo-constants';

class QuizQuestions extends Component {
    render() {
        let questions = this.props.questions; //from the store!
        let id = 0;
        let questionElements = questions.map((q) => {
            id += 1;
            return <Text key={id} style={styles.questionText}>{id}) {q.question} {"\n"} </Text>

        }

        );
        console.log(this.props.questions, "Printing from Quiz UI");
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text category='h5'>QUESTIONS:</Text>
                    {questionElements}
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {

        flex: 1,
        marginTop: Constants.statusBarHeight + 30,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
    questionText: {
        padding: 10
    }
});


const mapStateToProps = (state) => ({ questions: state.questions })
// Exports
export default connect(mapStateToProps, null)(QuizQuestions);