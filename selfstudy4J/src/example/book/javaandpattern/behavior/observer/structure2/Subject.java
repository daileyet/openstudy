package example.book.javaandpattern.behavior.observer.structure2;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public abstract class Subject {
private List<Observer> observerList=null;
	
	public Subject() {
		observerList=Collections.synchronizedList(new ArrayList<Observer>());
	}
	
	
	public void attach(Observer observer){
		observerList.add(observer);
	}
	
	public void detach(Observer observer){
		observerList.remove(observer);
	}
	
	public void notifyObservers(){
		for(Observer observer:observerList){
			observer.update();
		}
	}
	
}
