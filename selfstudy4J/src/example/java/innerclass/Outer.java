package example.java.innerclass;
import java.lang.reflect.Field;
public class Outer {
	public class FirstInner {
		public class SecondInner {
			public class ThirdInner {
			}
		}
	}

	public static void main(String[] args) throws Exception{
		Outer test = new Outer();
		FirstInner first = test.new FirstInner();
		FirstInner.SecondInner second = first.new SecondInner();
		FirstInner.SecondInner.ThirdInner third=second.new ThirdInner();

		Field outerfield = first.getClass().getDeclaredField("this$0");
		outerfield.setAccessible(true);
		Object object = outerfield.get(first);
		System.out.println(object instanceof Outer);

		Field firstInnerfied = second.getClass().getDeclaredField("this$1");
		firstInnerfied.setAccessible(true);
		object = firstInnerfied.get(second);
		System.out.println(object instanceof FirstInner);
		
		Field secondInnerfield = third.getClass().getDeclaredField("this$2");
		secondInnerfield.setAccessible(true);
		object = secondInnerfield.get(third);
		System.out.println(object instanceof FirstInner.SecondInner);
		
	}

}
