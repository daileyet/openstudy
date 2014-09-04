package example.operators;

public class Displacement {
	
	/**
	 * >>
	 */
	public static void test1(){
		byte o=-128;
		byte ret=(byte) (o>>1);
		System.out.println(ret);
		o=127;
		ret=(byte) (o>>1);
		System.out.println(ret);
		
	}
	
	/**
	 * >>>
	 */
	public static void test2(){
		byte o=-128;
		byte ret=(byte) (o>>>1);
		System.out.println(ret);
		o=127;
		ret=(byte) (o>>>1);
		System.out.println(ret);
	}
	
	/**
	 * <<
	 */
	public static void test3(){
		byte o=-128;
		byte ret=(byte) (o<<1);
		System.out.println(ret);
		o=127;
		ret=(byte) (o<<1);
		System.out.println(ret);
	}
	
	/**
	 * ^
	 */
	public static void test4(){
		byte o1=2;
		byte o2=1;
		System.out.println(o1^o2);
		System.out.println(o1^o2^o2);
	}
	
	public static void main(String[] args) {
		test1();
		test2();
		test3();
		test4();
	}
	
}
