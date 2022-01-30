import 'package:DevQuiz/shared/models/user_model.dart';
import 'package:DevQuiz/shared/models/quiz_model.dart';
import 'package:DevQuiz/shared/models/question_model.dart';
import 'package:DevQuiz/shared/models/answer_model.dart';

import 'package:DevQuiz/home/home_state.dart';
import 'package:DevQuiz/home/home_repository.dart';

import 'package:DevQuiz/challenge/challenge_controller.dart';

import 'package:DevQuiz/core/app_images.dart';

import 'package:flutter/foundation.dart';


class HomeController {
  final stateNotifier = ValueNotifier<HomeState>(HomeState.empty);
  set state(HomeState state) => stateNotifier.value = state;
  HomeState get state => stateNotifier.value;

  UserModel? user;
  List<QuizModel>? quizzes;

  final repository = HomeRepository();
  final challengeController = ChallengeController();

  void getUser() async {
    state = HomeState.loading;
    user = await repository.getUser();
    await Future.delayed(Duration(seconds: 2));

    //user = UserModel(
      //name: "Diego",
      //photoUrl: "https://avatars.githubusercontent.com/u/2254731?v=4",
      //score: 75,
    //);

    state = HomeState.success;
  }

  void getQuizzes() async {
    state = HomeState.loading;
    await Future.delayed(Duration(seconds: 2));
    quizzes = await repository.getQuizzes();
    //state = HomeState.success;


    //quizzes = [
      //QuizModel(
        //title: "NLW 5 Flutter",
        //image: AppImages.blocks,
        //questionAnswered: challengeController.qtdAnswerRight, 
        //level: Level.facil,
        //questions: [
          //QuestionModel( 
            //title: "Está curtindo o Flutter?",
            //answer: [
              //AnswerModel(title: "Estou curtindo!", isRight: true),
              //AnswerModel(title: "Estou amando!"),
              //AnswerModel(title: "Estou desanimado!"),
              //AnswerModel(title: "Estou odiando!"),
            //],
          //), //QuestionModel
          //QuestionModel( 
            //title: "Está curtindo mesmo?",
            //answer: [
              //AnswerModel(title: "Estou curtindo!", isRight: true),
              //AnswerModel(title: "Estou amando!"),
              //AnswerModel(title: "Estou desanimado!"),
              //AnswerModel(title: "Estou odiando!"),
            //],
          //), //QuestionModel
        //]  
      //), //QuizModel
    //];
    print(challengeController.qtdAnswerRight); 
    state = HomeState.success;
  }
}
