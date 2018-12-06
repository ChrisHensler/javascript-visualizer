function FizzBuzz() {
	for(i=0; i< 15; i++) {
		var s = ""
		if(i % 3 == 0)  {
			s+="Fizz";
		}
		if(i % 5 == 0)  {
			s+="Buzz";
		}
	
		console.log(s);
	}
}
FizzBuzz(15);
