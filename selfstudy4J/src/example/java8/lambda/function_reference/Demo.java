package example.java8.lambda.function_reference;

import java.io.File;
import java.util.function.Predicate;

import example.java8.lambda.function_interface.Converter;

public class Demo {
	public static void main(String[] args) {
		Converter<String, Integer> converter = Integer::valueOf;

		Integer r1 = converter.convert("345");
		System.out.println(r1);

		PersonFactory<Person> personFactory = Person::new;
		Person person = personFactory.create("Park", "Heng");

		System.out.println(person);

		Predicate<File> predicate = File::isHidden;
	}
}
