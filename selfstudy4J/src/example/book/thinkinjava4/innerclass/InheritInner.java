package example.book.thinkinjava4.innerclass;

//: InheritInner.java
// Inheriting an inner class
class WithInner {
	class Inner {
		class InInner{
			
		}
	}
}

public class InheritInner extends WithInner.Inner {
	//! InheritInner() {} // Won't compile
	InheritInner(WithInner wi) {
		wi.super();
	}

	public static void main(String[] args) {
		WithInner wi = new WithInner();
		InheritInner ii = new InheritInner(wi);
	}
} ///:~