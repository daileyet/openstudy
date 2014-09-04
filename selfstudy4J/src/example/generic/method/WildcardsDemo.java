package example.generic.method;

public class WildcardsDemo {

	public static <T> void test1(Pair<T> pair) {

	}

	public static void test2(Pair<Employee> pair) {

	}

	public static void test3(Pair<Manager> pair) {

	}

	public static void test4(Pair<?> pair) {

	}

	public static void test5(Pair<? extends Employee> pair) {

	}

	public static void test6(Pair<? extends Manager> pair) {

	}

	public static void test7(Pair<? super Manager> pair) {

	}

	public static void test8(Pair<? super Employee> pair) {

	}

	public static <T> void test9(T pair) {

	}

	public static <T extends Employee> void test10(T pair) {

	}

	public static <T extends Manager> void test11(T pair) {

	}

	public static void main(String[] args) {
		{
			test1(new Pair<Employee>());
			test1(new Pair<Manager>());
			test1(new Pair<Object>());
		}

		{
			test2(new Pair<Employee>());
			// test2(new Pair<Manager>());
			// test2(new Pair<Object>());
		}

		{
			// test3(new Pair<Employee>());
			test3(new Pair<Manager>());
			// test3(new Pair<Object>());
		}

		{
			test4(new Pair<Employee>());
			test4(new Pair<Manager>());
			test4(new Pair<Object>());
		}

		{
			test5(new Pair<Employee>());
			test5(new Pair<Manager>());
			// test5(new Pair<Object>());
		}

		{
			// test6(new Pair<Employee>());
			test6(new Pair<Manager>());
			// test6(new Pair<Object>());
		}

		{
			test7(new Pair<Employee>());
			test7(new Pair<Manager>());
			test7(new Pair<Object>());
			// test7(new Pair<Boss>());
		}

		{
			test8(new Pair<Employee>());
			// test8(new Pair<Manager>());
			test8(new Pair<Object>());
			// test8(new Pair<Boss>());
		}

		Employee employee = new Employee();
		Manager manager = new Manager();
		Object object = new Object();
		{
			test9(employee);
			test9(manager);
			test9(object);
		}

		{
			test10(employee);
			test10(manager);
			// test10(object);
		}

		{
			// test11(employee);
			test11(manager);
			// test11(object);
		}
	}

}
