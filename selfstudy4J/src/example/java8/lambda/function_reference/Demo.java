package example.java8.lambda.function_reference;

import example.java8.lambda.function_interface.Converter;

public class Demo {
	public static void main(String[] args) {
		Converter<String,Integer> converter =Integer::valueOf;
		
		Integer r1=converter.convert("345");
		System.out.println(r1);
		
		PersonFactory<Person> personFactory = Person::new;
		Person person = personFactory.create("Park", "Heng");
		
		System.out.println(person);
		
	}
}
