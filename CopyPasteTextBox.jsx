import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { Input, Text, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';


class CopyPasteTextBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copyPasteContent: "", allQuizQuestions: [] }

    }
    handleTextChange(nextValue) {
        this.setState({ copyPasteContent: nextValue });
    }
    getDistractors(answer) {
        //TODO implement 
        return ["Option1", "Option2", "Option3", answer]
    }
    getQuestion(sentence, answer) {
        if (sentence.length == 0) {
            //blank 
            return;
        }
        let blank_sentence = sentence.replace(answer, " _____ "); //replace occurrences with blank! 
        let id = this.state.allQuizQuestions.length;
        let question = { "id": id, "text": sentence, "question": blank_sentence, "answer": answer, "choices": this.getDistractors(answer) };
        //console.log("Q:", question);
        return question;

    }



    getTenRandomQuestions() {
        //generates random k questions from allQuizQuestions
        let k = 10;
        let currentQuizQuestions = [];
        let questions = this.state.allQuizQuestions;
        console.log("Current Quiz", questions.length);
        questions.sort(() => Math.random() - Math.random()); //randomize the questions
        let questions_seen = new Set();
        let i = 0; //variable to loop through the questions list
        let number_of_questions = 0; //questions counter variable (we need k questions)
        while (number_of_questions < k && i < questions.length) {
            if (!questions_seen.has(questions[i].text)) {
                //if we haven't already added this question to the current quiz
                questions_seen.add(questions[i].text);
                number_of_questions += 1;
                currentQuizQuestions.push(questions[i]);
                //console.log(questions[i]);
            }
            i += 1;
        }

        // console.log(currentQuizQuestions);
        return currentQuizQuestions;

    }
    async getNERAndFormQuestion(sentence) {
        //find out the POS and frame questions and add it to allQuizQuestions
        const spacy = require('spacy-js');
        const nlp = spacy.load('en_core_web_sm');
        const doc = await nlp(sentence);
        const ner_filters = ["NOUN", "PROPN", "ORG", "PERS"]; //TODO Filter out only certain named entities
        if (doc.ents.length > 0) {
            let r = Math.floor(Math.random() * doc.ents.length); //random entity is picked!
            let current_question = this.getQuestion(sentence, doc.ents[r].text); //get a question for a random entity!
            //console.log("Executing", current_question);
            this.setState({ allQuizQuestions: [...this.state.allQuizQuestions, current_question] });
            //console.log("printing state", this.state)
        }



    }

    async generateQuiz() {

        //flush out all the existing questions 
        this.setState({ "allQuizQuestions": [] });
        let content = this.state.copyPasteContent;
        //console.log(content);
        let sentences = content.split(".");
        for (var sentence of sentences) {
            let temp = await this.getNERAndFormQuestion(sentence); //IMP! This has to finish executing before executing the next few lines!
        }
        //TODO Get top 10 questions (for now I am doing this randomly)
        let top10 = this.getTenRandomQuestions();
        if (top10.length > 0) {
            this.props.storeQuiz(top10); //save quiz to STORE
        }

    }

    render() {
        return (
            <View style={styles.inputContainer} >


                <Input
                    label={evaProps => <Text {...evaProps}>Paste Text</Text>}
                    value={this.state.copyPasteContent}
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
        storeQuiz: (questions) => dispatch({ type: 'GENERATE_QUIZ', questions: questions }),
    };
};


// Exports
export default connect(null, mapDispatchToProps)(CopyPasteTextBox);