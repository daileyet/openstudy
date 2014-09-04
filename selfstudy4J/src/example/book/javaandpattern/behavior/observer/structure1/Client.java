package example.book.javaandpattern.behavior.observer.structure1;

public class Client {
	
	public static void main(String[] args) {
		Subject subject =new ConcreteSubject();
		
		Observer observer=new ConcreteObserver();
		
		subject.attach(observer);
		
		subject.notifyObservers();
		
	}
	
}
