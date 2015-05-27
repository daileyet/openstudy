package example.java8.trait;
public interface Formula {
	double calculate(int a);
	
	default double sqrt(int a){
		return Math.sqrt(a);
	}
	
}


