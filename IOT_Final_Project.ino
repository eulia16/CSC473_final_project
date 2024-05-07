#include <Servo.h>
#include <Stepper.h>

Servo myservo;  // create servo object to control a servo
int servo_pin = 5;
int servoPosition = 0;
bool isArmUp = false;


int pos = 0;    // variable to store the servo position

/*stepper stuff*/
const int stepsPerRevolution = 2100;  // change this to fit the number of steps per revolution

Stepper myStepper(stepsPerRevolution, 8, 10, 9, 11);



void setup() {

  /*stepper*/
  myStepper.setSpeed(10);

  Serial.begin(9600);
  while (!Serial) {

  }
  myservo.attach(servo_pin);  // attaches the servo on pin 9 to the servo object
  myservo.write(0);




}

/*
1: Play
2: Stop
3: Pause
4: Restart
*/

void loop() {
    String command = Serial.readString();
    int intCommand = command.toInt();
    switch(intCommand){
      case 1:
          play();
          break;

      case 2:
          stop();
          break;
      case 3:
          pause();
          break;
         
    
    }

  

}

void stop(){
    pause();
    moveStepperBackwards();
    pause();

}

void play(){
    pause();
    moveStepper();
    pause();
}

void pause(){
  //change up position
    isArmUp = !isArmUp;
    if(servoPosition == 180){
      for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees

      myservo.write(pos);              // tell servo to go to position in variable 'pos'

       delay(15);                       // waits 15ms for the servo to reach the position

     }
     servoPosition = 0;
     return;
  }

  if(servoPosition == 0){
     for (pos = 0; pos <= 180; pos += 1) { 


     myservo.write(pos);             

     delay(15);     
     
  }
   servoPosition = 180;
   return;

}
}

void restart(){

}


void moveStepperBackwards(){
      Serial.println("counterclockwise");
       myStepper.step(-stepsPerRevolution * 2);
       delay(500);

}
void moveStepper(){
          Serial.println("clockwise");
          myStepper.step(stepsPerRevolution/3);
          delay(500);
         

          // step one revolution in the other direction:
          // Serial.println("counterclockwise");
          // myStepper.step(-stepsPerRevolution * 2);
          // delay(500);
}

void moveServo(int degrees){
  if(degrees == 180){
    for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees

    myservo.write(pos);              // tell servo to go to position in variable 'pos'

    delay(15);                       // waits 15ms for the servo to reach the position

  }
  }
  else{
    for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees

    // in steps of 1 degree

    myservo.write(pos);              // tell servo to go to position in variable 'pos'

    delay(15);                       // waits 15ms for the servo to reach the position

  }
  }
    

}