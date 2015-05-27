package example.java8.lambda.function_interface;

@FunctionalInterface
public interface Converter<F,T> {
	T convert(F from);
	
}
