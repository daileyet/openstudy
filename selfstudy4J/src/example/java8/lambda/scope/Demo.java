package example.java8.lambda.scope;

import example.java8.lambda.function_interface.Converter;
import example.java8.trait.Formula;

public class Demo {

	int outerNum;
	static int outerStaticNum;
	
	public static void main(String[] args) {
		Demo demo =new Demo();
		demo.localVariable();
		demo.memberVariable();
	}
	
	//local variable
	void localVariable(){
		int num=1;
		//final int num=1; // best define final
		Converter<Integer,String> stringConverter=(from)->String.valueOf(from+num);
		String r1 = stringConverter.convert(123);
		System.out.println(r1);
		//num=2; //compile error
	}
	
	//object property and class static property
	void memberVariable(){
		Converter<Integer, String> stringConverter1 = (from) -> {
            outerNum = 23;
            return String.valueOf(from);
        };
        Converter<Integer, String> stringConverter2 = (from) -> {
            outerStaticNum = 72;
            return String.valueOf(from);
        };
        stringConverter1.convert(1);
        stringConverter2.convert(1);
        System.out.println(this.outerNum);
        System.out.println(Demo.outerStaticNum);
	}
	//can not access default function in interface
	void defaultFunction(){
		Formula formula = new Formula() {
			@Override
			public double calculate(int a) {
				return sqrt(a*100);
			}
		};
		// Formula formula = (a)->sqrt(a*100); // compile error
	}
	
	
	
}
