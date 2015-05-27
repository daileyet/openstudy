package example.java8.lambda.function_interface;

/**
 * @author minjdai
 *
 */
public class Demo {

	public static void main(String[] args) {
		Converter<String,Integer> converter = (String a)->{
			return Integer.valueOf(a);
		};
		Integer r1=converter.convert("123");
		System.out.println(r1);
		
		converter =(String a)-> Integer.valueOf(a);
		converter =(from)-> Integer.valueOf(from);
		
		r1=converter.convert("345");
		System.out.println(r1);
	}
	
}
