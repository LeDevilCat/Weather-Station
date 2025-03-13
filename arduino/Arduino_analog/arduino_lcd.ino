// the setup function runs once when you press reset or power the board
#include <LiquidCrystal.h>

// Initialize the library with the numbers of the interface pins
const int rs = 8, e = 7, d4 = 6, d5 = 5, d6 = 4, d7 = 3;
LiquidCrystal lcd(rs, e, d4, d5, d6, d7);

void setup() {
   // Set up the LCD's number of columns and rows
  lcd.begin(16, 2);
  // Print a message to the LCD
  //lcd.print("Moro moro");
  // enable serial monitor at port 9600
  Serial.begin(9600);
}

// the loop function runs over and over again forever
void loop() {
  int A1pin = analogRead(A1);
  float A1voltage = A1pin * (5.0 / 1023.0);

  Serial.print("Analog in: ");
  Serial.print(A1pin);
  Serial.print(", voltage: ");
  Serial.print(A1voltage);
  Serial.println(" V");
  delay(1000);

  int degree = map(A1pin, 0, 773, 0, 360);
  lcd.setCursor(0, 0);
  lcd.print("Wind direction");
  lcd.setCursor(0, 1);
  lcd.print("Degrees ");
  lcd.print(degree);
  lcd.print("  ");
  

  delay(2000);
  lcd.clear();
}