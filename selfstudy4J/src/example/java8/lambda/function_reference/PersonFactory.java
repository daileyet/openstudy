package example.java8.lambda.function_reference;

public interface PersonFactory<P extends Person> {

	P create(String firstName,String lastName);
}
