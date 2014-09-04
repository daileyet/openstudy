package example.book.javaandpattern.behavior.observer.structure1;

public interface Subject {
	
	public void attach(Observer observer);
	
	public void detach(Observer observer);
	
	public void notifyObservers();
	
}
