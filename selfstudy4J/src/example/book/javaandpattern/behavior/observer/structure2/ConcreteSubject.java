package example.book.javaandpattern.behavior.observer.structure2;


public class ConcreteSubject extends Subject {
	private String state;
	
	public void change(String state){
		this.state=state;
		this.notifyObservers();
	}
	
	public String getState() {
		return state;
	}

}
