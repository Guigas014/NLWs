import 'package:flutter/material.dart';

import 'package:DevQuiz/challenge/widgets/question_indicator/question_indicator_widget.dart';
import 'package:DevQuiz/challenge/widgets/quiz/quiz.dart';
import './widgets/next_button/next_button_widget.dart';

import 'package:DevQuiz/challenge/challenge_controller.dart';
import 'package:DevQuiz/shared/models/question_model.dart';
import 'package:DevQuiz/result/result_page.dart';


class ChallengePage extends StatefulWidget {
  final List<QuestionModel> questions;
  final String title;

  ChallengePage({
    Key? key, 
    required this.questions, 
    required this.title,
  }) : super(key: key);  

  @override
  _ChallengePageState createState() => _ChallengePageState();
}

class _ChallengePageState extends State<ChallengePage> {
  final controller = ChallengeController();
  final pageController = PageController();
  
  @override
  void initState() {
    //controller.currentPageNotifier.addListener(() {
      //setState(() {});
    //});
    pageController.addListener(() {
      controller.currentPage = pageController.page!.toInt() + 1;
    });
    super.initState();
  }

  void nextPage() {
    if (controller.currentPage < widget.questions.length)
      pageController.nextPage(
        duration: Duration(milliseconds: 100),
        curve: Curves.linear,
      );
  }

  void onSelected(bool value) {
    if (value) {
      controller.qtdAnswerRight++;
    }
    nextPage();
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(105),
        child: SafeArea(
          top: true, 
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              //BackButton(),
            IconButton(
              icon: Icon(Icons.close),
              onPressed: () {Navigator.pop(context);}
            ),
            ValueListenableBuilder<int>(
              valueListenable: controller.currentPageNotifier, 
              builder: (context, value,_) => QuestionIndicatorWidget(
                currentPage: value,
                length: widget.questions.length,
              ), //QuestionIndicatorWidget
            ), //ValueListenableBuilder
            ],
          ), //Column 
        ), //SafeArea
      ), //PreferredSize
      body: PageView(
        physics: NeverScrollableScrollPhysics(),
        controller: pageController,
        children: widget.questions
          .map(
            (e) => QuizWidget(
              question: e, 
              onSelected: onSelected,  
            ),
          )
          .toList(),
      //body: QuizWidget(
        //question: widget.questions[0],
        //title: "O que o Flutter faz em sua totalidade?",  
      ), //QuizWidget / PageView,
      bottomNavigationBar: SafeArea(
        bottom: true,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: ValueListenableBuilder<int>(
            valueListenable: controller.currentPageNotifier,
            builder: (context, value, _) => Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                if (value < widget.questions.length) 
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    child: (
                      NextButtonWidget.white(
                        label: "Pular", 
                        onTap: nextPage,
                      )
                    ),
                  ),
                ), //Expanded
                //if (value == widget.questions.length) 
                  //SizedBox(width: 7),
                if (value == widget.questions.length) 
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      child: (
                        NextButtonWidget.green(
                          label: "Confirmar", 
                          onTap: () {
                            //Navigator.pop(context);
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(
                                builder: (context) => ResultPage(
                                  title: widget.title,
                                  length: widget.questions.length,
                                  result: controller.qtdAnswerRight,
                                )
                              )
                            );
                          }
                        )
                      ),
                    ),
                  ), //Expanded
              ],
            ), //Row 
          ), //ValueListenableBuilder
        ), //Padding
      ), //SafeArea
    ); //Scaffold
  }
}


