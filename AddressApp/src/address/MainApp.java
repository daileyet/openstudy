package address;

import java.io.IOException;

import address.controller.PersonEditDialogController;
import address.controller.PersonOverviewController;
import address.model.Person;
import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class MainApp extends Application {
	private Stage primaryStage;
	private BorderPane rootLayout;
	/**
	 * The data as an observable list of Persons.
	 */
	private ObservableList<Person> personData = FXCollections
			.observableArrayList();

	{
		// Add some sample data
		personData.add(new Person("Hans", "Muster"));
		personData.add(new Person("Ruth", "Mueller"));
		personData.add(new Person("Heinz", "Kurz"));
		personData.add(new Person("Cornelia", "Meier"));
		personData.add(new Person("Werner", "Meyer"));
		personData.add(new Person("Lydia", "Kunz"));
		personData.add(new Person("Anna", "Best"));
		personData.add(new Person("Stefan", "Meier"));
		personData.add(new Person("Martin", "Mueller"));
	}

	/**
	 * Returns the data as an observable list of Persons.
	 * 
	 * @return
	 */
	public ObservableList<Person> getPersonData() {
		return personData;
	}

	@Override
	public void start(Stage primaryStage) {
		this.primaryStage = primaryStage;
		this.primaryStage.setTitle("AddressApp");
		this.primaryStage.getIcons().add(new Image("file:resources/images/address_book_32.png"));
		initRootLayout();
		showPersonOverview();
	}

	/**
	 * Shows the person overview inside the root layout.
	 */
	private void showPersonOverview() {
		// Load person overview.
		FXMLLoader loader = new FXMLLoader();
		loader.setLocation(MainApp.class
				.getResource("view/PersonOverview.fxml"));
		try {
			AnchorPane anchorPane = loader.load();
			// Set person overview into the center of root layout.
			this.rootLayout.setCenter(anchorPane);
			

	        // Give the controller access to the main app.
	        PersonOverviewController controller = loader.getController();
	        controller.setMainApp(this);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	public boolean showPersonEditDialog(Person person){
		FXMLLoader loader = new FXMLLoader();
		loader.setLocation(MainApp.class.getResource("view/PersonEditDialog.fxml"));
		try {
			AnchorPane anchorPane = loader.load();
			Stage dialogStage = new Stage();
			dialogStage.setTitle("Edit Person");
			dialogStage.initModality(Modality.WINDOW_MODAL);
			dialogStage.initOwner(primaryStage);
			Scene scene =new Scene(anchorPane);
			dialogStage.setScene(scene);
			dialogStage.getIcons().add(new Image("file:resources/images/address_book_32.png"));
			PersonEditDialogController editDialogController = loader.getController();
			editDialogController.setDialogStage(dialogStage);
			editDialogController.setPerson(person);
			dialogStage.showAndWait();
			return editDialogController.isOkClicked();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
		
	}

	/**
	 * Initializes the root layout.
	 */
	private void initRootLayout() {
		// Load root layout from fxml file.
		FXMLLoader loader = new FXMLLoader();
		loader.setLocation(MainApp.class.getResource("view/RootLayout.fxml"));
		try {
			this.rootLayout = loader.load();
			// Show the scene containing the root layout.
			Scene scene = new Scene(this.rootLayout);
			primaryStage.setScene(scene);
			primaryStage.show();

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public Stage getPrimaryStage() {
		return primaryStage;
	}

	public static void main(String[] args) {
		launch(args);
	}
}
