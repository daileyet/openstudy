package example.book.thinkinjava4.serializable.controller;

//: MyWorld.java
import java.io.*;
import java.util.*;

class House implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5387191497040689694L;
}

class Animal implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3214783393843465037L;
	String name;
	House preferredHouse;

	Animal(String nm, House h) {
		name = nm;
		preferredHouse = h;
	}

	public String toString() {
		return name + "[" + super.toString() + "], " + preferredHouse + "\n";
	}
}

public class MyWorld {
	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
		House house = new House();
		Vector<Animal> animals = new Vector<Animal>();
		animals.addElement(new Animal("Bosco the dog", house));
		animals.addElement(new Animal("Ralph the hamster", house));
		animals.addElement(new Animal("Fronk the cat", house));
		System.out.println("animals: " + animals);
		try {
			ByteArrayOutputStream buf1 = new ByteArrayOutputStream();
			ObjectOutputStream o1 = new ObjectOutputStream(buf1);
			o1.writeObject(animals);
			o1.writeObject(animals); // Write a 2nd set
			// Write to a different stream:
			ByteArrayOutputStream buf2 = new ByteArrayOutputStream();
			ObjectOutputStream o2 = new ObjectOutputStream(buf2);
			o2.writeObject(animals);
			// Now get them back:
			ObjectInputStream in1 = new ObjectInputStream(new ByteArrayInputStream(buf1.toByteArray()));
			ObjectInputStream in2 = new ObjectInputStream(new ByteArrayInputStream(buf2.toByteArray()));
			Vector<Animal> animals1 = (Vector<Animal>) in1.readObject();
			Vector<Animal> animals2 = (Vector<Animal>) in1.readObject();
			Vector<Animal> animals3 = (Vector<Animal>) in2.readObject();
			System.out.println("animals1: " + animals1);
			System.out.println("animals2: " + animals2);
			System.out.println("animals3: " + animals3);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
} ///:~