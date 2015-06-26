package example.java8.lambda;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
public class SortDemo {

	public void print(List<String> names){
		for(String name:names){
			System.out.print(name);
			System.out.print(" ");
		}
		System.out.println();
	}
	// in old java use interface Comparator
	public void old(){
		List<String> names = Arrays.asList("peter", "anna", "mike", "xenia");
		Collections.sort(names, new Comparator<String>() {
			@Override
			public int compare(String arg0, String arg1) {
				return arg0.compareTo(arg1);
			}
		});
		print(names);
	}
	// in java 8 use lambda
	public void lambda(){
		List<String> names = Arrays.asList("peter", "anna", "mike", "xenia");
		//lambda 1
		Collections.sort(names,(String a,String b)->{return a.compareTo(b);});
		//lambda 2
		Collections.sort(names,(String a, String b)-> a.compareTo(b));
		//lambda 3
		Collections.sort(names,(a,b)->a.compareTo(b));
		print(names);
	}
	
	public static void main(String[] args) {
		SortDemo sortDemo =new SortDemo();
		sortDemo.old();
		sortDemo.lambda();
	}
}
