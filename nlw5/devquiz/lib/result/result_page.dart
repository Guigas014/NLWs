import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
 

import 'package:DevQuiz/core/core.dart';

import 'package:DevQuiz/challenge/widgets/next_button/next_button_widget.dart';


class ResultPage extends StatelessWidget {
  final String  title;
  final int length;
  final int result;

  const ResultPage({
    Key? key, 
    required this.title, 
    required this.length,
    required this.result,
  }) 
    : super(key: key);


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.maxFinite,
        padding: EdgeInsets.only(top: 100),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
          Image.asset(AppImages.trophy),
          Column(
            children: [ 
              Text(
                "Parabéns!!",
                style: AppTextStyles.heading40,
              ), //Text 
              SizedBox(height: 16),
              Text.rich(
                TextSpan(
                  text: "Você concluiu",
                  style: AppTextStyles.body,
                  children: [
                    TextSpan(
                      text: "\n$title",
                      style: AppTextStyles.bodyBold,
                    ),
                    TextSpan(
                      text: "\ncom $result de $length acertos.",
                      style: AppTextStyles.body,
                    ),
                  ],
                ), //TextSpan
                textAlign: TextAlign.center,
              ), //Text.rich
            ],
          ), //Column
          Column(
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 68),
                        child: NextButtonWidget.purple(
                          label: "Compartilhar", 
                          onTap: () {
                            Share.share('DevQuiz NLW5 - Resultado do Quiz: $title\n Obtive: ${(result / length) * 100}% de aproveitamento!!');
                        }), 
                      ), //Padding  
                    ), //Expanded
                  ],
                ), //Row
                SizedBox(height: 24),
                Row(
                  children: [
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 68),
                        child: NextButtonWidget.white(
                          label: "Voltar ao início", 
                          onTap: () {
                            Navigator.pop(context);
                            //MaterialPageRoute( 
                              //builder: (context) => HomePage(
                                //quiz.questionAnswered: result
                              //)
                            //)
                          }
                        ), 
                      ), //Padding  
                    ), //Expanded
                  ],
                ), //Row
              ],
            ), //Column
          ],
        ), //Column
      ), //Container 
    );
  }
}

