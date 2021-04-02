import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { Input, Text, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';


class CopyPasteTextBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copyPasteTextBoxContent: "", questions: [] }

    }
    handleTextChange(nextValue) {
        this.setState({ copyPasteTextBoxContent: nextValue });
    }
    getDistractors(word) {
        return ["Option1", "Option2", "Option3", answer]
    }
    generateQuestion(sentence, answer) {
        sentence = sentence.replace(answer, " _____ "); //replace occurrences with blank! 
        generateDistractors(answer);
        let question = { "text": sentence, "answer": answer, "distractors": getDistractors(answer) };
        this.setState({ questions: [...this.state.questions, question] }); //add this question to the current list! 
    }


    async getPOS(sentence) {
        const spacy = require('spacy-js');
        const nlp = spacy.load('en_core_web_sm');
        const doc = await nlp(sentence);
        const pos_filters = ["NOUN", "PROPN"];

        for (let token of doc) {
            if (pos_filters.includes(token.pos)) {
                //filter out only nouns! 
                console.log(token.text, token.pos);
                //generate a question for this using this POS as a blank! 
                this.generateQuestion(sentence, token.text);
            }
        }



    }

    generateQuiz() {
        let content = this.state.copyPasteTextBoxContent;
        //console.log(content);
        let questions = content.split(".");
        for (var question of questions) {
            this.getPOS(question);
        }

    }

    render() {
        return (
            <View style={styles.inputContainer} >


                <Input
                    label={evaProps => <Text {...evaProps}>Paste Text</Text>}
                    value={this.state.copyPasteTextBoxContent}
                    multiline={true}
                    textStyle={styles.input}
                    placeholder='Copy-paste your study notes here...'
                    onChangeText={nextValue => this.handleTextChange(nextValue)}
                />
                <Button onPress={() => this.generateQuiz()}>
                    GENERATE QUIZ
      </Button>


            </View>
        );
    };
}
const styles = StyleSheet.create({
    inputContainer: {
        margin: 2,
        padding: 2,
    },
    input: {
        minHeight: 100,
        maxHeight: 400

    },
});




const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        generateQuiz: (questions) => dispatch({ type: 'GENERATE_QUIZ', questions: questions }),
    };
};


// Exports
export default connect(null, mapDispatchToProps)(CopyPasteTextBox);