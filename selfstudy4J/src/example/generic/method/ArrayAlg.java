package example.generic.method;

import java.io.Serializable;

public class ArrayAlg {

	public static <T> T getMiddle(T[] array) {

		return array[array.length / 2];
	}

	public static <T extends Comparable<T> & Serializable> T min(T[] array) {
		if (array == null || array.length == 0) {
			return null;
		}
		T smallest = array[0];
		for (int i = 0; i < array.length; i++) {
			if (smallest.compareTo(array[i]) > 0) {
				smallest = array[i];
			}
		}
		return smallest;
	}

	public void typeSearch() {
		Comparable<String> com = null;
		if (com instanceof Comparable) {

		}
		if (com instanceof Comparable<?>) {

		}

	}

	public static void set1(Comparable<?> com) {

	}

	@SuppressWarnings("rawtypes")
	public static void set2(Comparable com) {

	}

	@SuppressWarnings("rawtypes")
	public static void main(String[] args) {
		String[] arrays = { "A", "B", "C" };
		System.out.println(ArrayAlg.<String> getMiddle(arrays));
		System.out.println(getMiddle(new Object[] { 12.3, 11, 0 }));
		Comparable<?> com = new String();
		set1(com);
		Comparable com2 = new Comparable() {
			@Override
			public int compareTo(Object o) {
				// TODO Auto-generated method stub
				return 0;
			}
		};
		set1(com2);
		set2(com2);
	}
}
