package example.book.javaandpattern.behavior.observer.structure1;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ConcreteSubject implements Subject {
	private List<Observer> observerList=null;
	
	public ConcreteSubject() {
		observerList=Collections.synchronizedList(new ArrayList<Observer>());
	}
	
	
	@Override
	public void attach(Observer observer) {
		observerList.add(observer);
	}

	@Override
	public void detach(Observer observer) {
		observerList.remove(observer);
	}

	@Override
	public void notifyObservers() {
		for(Observer observer:observerList){
			observer.update();
		}
	}

}
