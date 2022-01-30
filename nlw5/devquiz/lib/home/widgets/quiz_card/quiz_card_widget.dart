import 'package:flutter/material.dart';

import 'package:DevQuiz/core/app_colors.dart';
import 'package:DevQuiz/core/app_text_styles.dart';
import 'package:DevQuiz/core/app_images.dart';

import 'package:DevQuiz/shared/widgets/progress_indicator/progress_indicator_widget.dart';


class QuizCardWidget extends StatelessWidget {
  final String title;
  final String completed;
  final double percent;
  final VoidCallback onTap;

  const QuizCardWidget({
    Key? key,
    required this.title,
    required this.completed,
    required this.percent,
    required this.onTap,
  }) : super(key: key);


  @override 
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,

      child: Container(
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(
          border: Border.fromBorderSide(BorderSide(color: AppColors.border)),
          color: AppColors.white,
          borderRadius: BorderRadius.circular(10)
        ), //BoxDecoration
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 40,
              width: 40,
              child: Image.asset(AppImages.blocks),
            ), //Container
            SizedBox(height: 20), //SizedBox
            Text(
              title,
              style: AppTextStyles.heading15,
            ), //Text
            SizedBox(height: 20), //SizedBox
            Row(
              children: [
                Expanded(
                  flex: 1,
                  child: Text(
                    completed,  //"3 de 10",
                    style: AppTextStyles.body11,
                  ), //Text
                ), //Expanded
                Expanded(
                  flex: 4,
                  child:ProgressIndicatorWidget(value: percent), 
                ), //Expanded
              ],
            ), //Row
          ],
        ), //Column
      ), //Container 
    ); //GestureDetector
  }
}

