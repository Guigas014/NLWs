import 'package:flutter/material.dart';

import 'package:DevQuiz/core/app_text_styles.dart';

import 'package:DevQuiz/challenge/widgets/answer/answer_widget.dart';

import 'package:DevQuiz/shared/models/question_model.dart';
import 'package:DevQuiz/shared/models/answer_model.dart';
import 'package:DevQuiz/challenge/widgets/quiz/quiz_controller.dart';


class QuizWidget extends StatefulWidget {
  final QuestionModel question;
  final ValueChanged<bool> onSelected;
  //final VoidCallback onChange;

  const QuizWidget({
    Key? key, 
    required this.question, 
    required this.onSelected
  }) 
  : super(key: key);

  @override
  _QuizWidgetState createState() => _QuizWidgetState();
}


class _QuizWidgetState extends State<QuizWidget> {
  int indexSelected = -1;
  AnswerModel answer(int index) => widget.question.answer[index];

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          SizedBox(height: 54),
          Text(
            widget.question.title,
            style: AppTextStyles.heading,
          ), //Text
          SizedBox(height: 24),

          for (var i = 0; i < widget.question.answer.length; ++i) 
            AnswerWidget(
              answer: answer(i),
              disabled: indexSelected != -1,
              isSelected: indexSelected == i,
              onTap: (value) {
                indexSelected = i;

                setState(() {});
                Future.delayed(Duration(seconds: 1))
                  .then((_) => widget.onSelected(value));
              },
            ), //AnswerWidget
          

          //...question.answer.map(
            //(e) => AnswerWidget(
              //isRight: e.isRight,
              //title: e.title,
            //),).toList(),
          

          //AnswerWidget(
            //isRight: false,
            //isSelected: false,
            //title: "Possibilita a criação de frontend ...",
          //), //AnswerWidget
          //AnswerWidget(
            //isRight: true,
            //isSelected: true,
            //title: "Possibilita a criação de frontend ...",
          //), //AnswerWidget
          //AnswerWidget(
            //isRight: false,
            //isSelected: true,
            //title: "Possibilita a criação de frontend ...",
          //), //AnswerWidget
          //AnswerWidget(
            //isRight: false,
            //isSelected: false,
            //title: "Possibilita a criação de frontend ...",
          //), //AnswerWidget
        ],
      ), //Column
    ); //Container
  }
}


