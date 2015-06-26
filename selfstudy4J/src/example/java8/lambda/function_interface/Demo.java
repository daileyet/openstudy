package example.java8.lambda.function_interface;

public class Demo {

	public static void main(String[] args) {
		// lambda 1
		Converter<String,Integer> converter = (String a)->{
			return Integer.valueOf(a);
		};
		Integer r1=converter.convert("123");
		System.out.println(r1);
		// lambda 2
		converter =(String a)-> Integer.valueOf(a);
		// lambda 3
		converter =(from)-> Integer.valueOf(from);
		r1=converter.convert("345"); 
		System.out.println(r1);
	}
}
