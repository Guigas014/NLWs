import 'package:flutter/material.dart';


//Hello World na linguagem "Dart".
//void main() {
  //print("Hello World!");

//}

//Para começarmos a usar o Flutter devemos utilizar a função runApp.
void main() {
  runApp(AppWidget());
  //runApp(MaterialApp(
    //home: Container(
      //color: Colors.blue[100]
    //), //Container
  //));
}

//O MaterialApp é o principal widget do Flutter, é necessário que ele seja o primeiro.


//Primeira classe que deve conter o MaterialApp.
class AppWidget extends StatelessWidget {
  //const ({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomePage()
      //home: Container(
        //color: Colors.green[100]
      //), //Container
    ); //MaterialApp
  }
}


class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  //const ({Key? key}) : super(key: key);

 // @override
  //Widget build(BuildContext context) {
    //return Container(
      //color: Colors.green[200]
    //);
  //}

  var tapped = true;

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size; //Váriavel size que pega o tamanho da tela.

    return Scaffold(

      appBar: PreferredSize(
        child: Container(
          height: size.height * 0.15,
          color: Colors.black,
          child: Center(child: Text(
            "AppBar",
            style: TextStyle(
              color: Colors.white, 
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),  //TextStyle - estiliza o texto.
          )),         
        ), //Container
        preferredSize: Size.fromHeight(100),
      ), //PreferredSize

      body: Container(
        height: size.height * 1, //Responsivo
        width: size.width * 1, //Responsivo
        constraints: BoxConstraints(minHeight: 300, minWidth: 80),
        color: Colors.green[200],

        child: Column(
          children: [
            Container(
              height: size.height * 0.5,
              width: size.width * 0.7,
              padding: const EdgeInsets.symmetric(vertical: 50),

              child: Wrap(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Container(
                      width: 60, 
                      height: 60, 
                      //Decorando um Container
                      decoration: BoxDecoration(
                        color: Colors.red,
                        borderRadius: BorderRadius.circular(30),
                    ),
                  ), //Container
                ), //padding
              
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    width: 60, 
                    height: 60, 
                    //Decorando um Container
                    decoration: BoxDecoration(
                      color: Colors.amber,
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(50),
                        bottomRight: Radius.circular(50),
                      ),
                    ),
                  ), //Container
                ), //padding
              
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    width: 60, 
                    height: 60, 
                    //Decorando um Container
                    decoration: BoxDecoration(
                      color: Colors.cyan,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.fromBorderSide(
                        BorderSide(color: Colors.red, width: 2),
                      ),
                    ),
                  ), //Container
                ), //padding

                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    width: 60, 
                    height: 60, 
                    //Decorando um Container
                    decoration: BoxDecoration(
                      color: Colors.cyan,
                      //borderRadius: BorderRadius.circular(10),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black,
                          spreadRadius: 1,
                          blurRadius: 5,
                        ),
                      ],
                    ),
                  ), //Container
                ), //padding

                GestureDetector(
                  onTap: () { 
                    //print("Você clicou!!"); 
                    tapped = !tapped;
                    setState(() {});
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Container(
                      width: 60, 
                      height: 60, 
                      color: tapped ? Colors.green : Colors.red,
                      child: Center(
                        child: Text("Click",
                          style: TextStyle(
                            color: Colors.white, 
                            fontSize: 20, 
                            fontWeight: FontWeight.bold
                          ), 
                        ), //Text
                      ),
                    ), //Container
                  ), //padding
                ), //GestureDetector
              
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(width: 60, height: 60, color: Colors.red),
                ), //padding
              ],
              ), //Wrap
            
            ), //Container

            Container(
              height: size.height * 0.5,
              width: size.width * 0.7,
              constraints: BoxConstraints(maxHeight: 70),
              
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Container(width: 60, height: 60, color: Colors.red),
                  ), //padding

                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Container(width: 60, height: 60, color: Colors.red),
                  ), //padding

                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Container(width: 60, height: 60, color: Colors.red),
                  ), //padding

                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Container(width: 60, height: 60, color: Colors.red),
                  ), //padding
                ],
              ), //ListView
            ), //Container
          ]
        ), //Column 
      ), //Container

      bottomNavigationBar: Container(
        height: size.height * 0.15,
        color: Colors.blue,

        child: Center(child: Text(
          "Bottom",
          style: TextStyle(
            color: Colors.white,
            fontSize: 30,
          ), //TextStyle
        )),

      ), //Container

    ); //Scaffold
  }
}

//O "Scaffold" é uma widget que serve como modelo para criar a página. Ela tem
//prorpiedades únicas com por exemplo: appBar, body, bottomNavigationBar e etc.


