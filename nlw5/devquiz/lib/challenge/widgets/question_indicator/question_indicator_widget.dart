import 'package:flutter/material.dart';

import 'package:DevQuiz/core/app_text_styles.dart';
//import 'package:DevQuiz/core/app_colors.dart';

import 'package:DevQuiz/shared/widgets/progress_indicator/progress_indicator_widget.dart';


class QuestionIndicatorWidget extends StatelessWidget {
  final int currentPage;
  final int length;

  const QuestionIndicatorWidget({
    Key? key,
    required this.currentPage,
    required this.length,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Text("Questão $currentPage", style: AppTextStyles.body), 
              Text("de $length", style: AppTextStyles.body),
            ],
          ), //Row
          SizedBox(height: 16),
          ProgressIndicatorWidget(value: currentPage / length),
          SizedBox(height: 16),
        ],
      ), //Column  
    ); //Container
  }
}


