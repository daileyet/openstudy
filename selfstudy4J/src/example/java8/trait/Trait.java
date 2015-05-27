package example.java8.trait;

public class Trait {
	public static void main(String[] args) {
		Formula formula = new Formula() {
			@Override
			public double calculate(int a) {
				return sqrt(a*100);
			}
		};
		double r1=formula.calculate(100);
		double r2=formula.sqrt(16);
		System.out.println(r1);// 	100.0
		System.out.println(r2);//	4.0
	}
}
