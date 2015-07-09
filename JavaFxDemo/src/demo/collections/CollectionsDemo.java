package demo.collections;

import java.util.ArrayList;
import java.util.List;

import javafx.collections.FXCollections;
import javafx.collections.ListChangeListener;
import javafx.collections.ObservableList;

public class CollectionsDemo {

	public static void main(String[] args) {

		// Use Java Collections to create the List.
		List<String> list = new ArrayList<String>();

		// Now add observability by wrapping it with ObservableList.
		ObservableList<String> observableList = FXCollections
				.observableList(list);
		observableList.addListener((ListChangeListener<String>) change -> {
			System.out.println("Detected a change! ");
			change.next();
			System.out.println(change.getAddedSubList());
		});

		// Changes to the observableList WILL be reported.
		// This line will print out "Detected a change!"
		observableList.add("item one");

		// Changes to the underlying list will NOT be reported
		// Nothing will be printed as a result of the next line.
		observableList.add("item two");

		System.out.println("Size: " + observableList.size());

	}
}