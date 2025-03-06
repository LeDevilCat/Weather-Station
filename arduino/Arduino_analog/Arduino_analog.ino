// the setup function runs once when you press reset or power the board

void setup() {
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
}