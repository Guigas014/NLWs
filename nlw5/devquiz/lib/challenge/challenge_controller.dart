import 'package:flutter/foundation.dart';


class ChallengeController {
  
  //CurrentPage
  final currentPageNotifier = ValueNotifier<int>(1);

  int get currentPage => currentPageNotifier.value;
  set currentPage(int value) => currentPageNotifier.value = value;
  //var currentPage = 0;

  
  int qtdAnswerRight = 0;

}

