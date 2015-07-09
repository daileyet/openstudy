package address;

import java.io.File;
import java.io.IOException;
import java.util.prefs.Preferences;

import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Modality;
import javafx.stage.Stage;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import resources.images.ResourceLoader;
import address.controller.BirthdayStatisticsController;
import address.controller.PersonEditDialogController;
import address.controller.PersonOverviewController;
import address.controller.RootLayoutController;
import address.model.Person;
import address.model.PersonListWrapper;

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
		this.primaryStage.getIcons().add(ResourceLoader.APP_ICON);
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
			dialogStage.getIcons().add(ResourceLoader.APP_ICON);
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
	
	public void showBirthdayStatistics(){
		FXMLLoader loader = new FXMLLoader();
		loader.setLocation(MainApp.class.getResource("view/BirthdayStatistics.fxml"));
		try {
			AnchorPane anchorPane = loader.load();
			Stage dialogStage =new Stage();
			dialogStage.initOwner(primaryStage);
			dialogStage.setTitle("Birthday Statistics");
			dialogStage.initModality(Modality.WINDOW_MODAL);
			dialogStage.getIcons().add(ResourceLoader.APP_ICON);
			Scene scene =new Scene(anchorPane);
			dialogStage.setScene(scene);
			BirthdayStatisticsController birthdayStatisticsController =loader.getController();
			birthdayStatisticsController.setPersonData(personData);
			dialogStage.show();
			
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
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
			
			RootLayoutController controller = loader.getController();
			controller.setMainApp(this);
			// Show the scene containing the root layout.
			Scene scene = new Scene(this.rootLayout);
			primaryStage.setScene(scene);
			primaryStage.show();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		  // Try to load last opened person file.
	    File file = getPersonFilePath();
	    if (file != null) {
	        loadPersonDataFromFile(file);
	    }
	}

	public Stage getPrimaryStage() {
		return primaryStage;
	}

	public static void main(String[] args) {
		launch(args);
	}
	
	
	public static final String PREF_FILE ="filePath";
	/**
	 * Returns the person file preference, i.e. the file that was last opened.
	 * The preference is read from the OS specific registry. If no such
	 * preference can be found, null is returned.
	 * 
	 * @return
	 */
	public File getPersonFilePath(){
		Preferences preferences =Preferences.userNodeForPackage(MainApp.class);
		
		String filePath = preferences.get(PREF_FILE, null);
		if(filePath!=null){
			return new File(filePath);
		}
		return null;
	}
	
	public void setPersonFilePath(File file){
		Preferences preferences =Preferences.userNodeForPackage(MainApp.class);
		if(file!=null){
			preferences.put(PREF_FILE, file.getPath());
			primaryStage.setTitle("AddressApp - " + file.getName());
		}else{
			preferences.remove(PREF_FILE);
			primaryStage.setTitle("AddressApp");
		}
	}
	
	
	public void loadPersonDataFromFile(File file){
		
		try {
			JAXBContext context = JAXBContext.newInstance(PersonListWrapper.class);
			
			Unmarshaller unmarshaller = context.createUnmarshaller();
			
			PersonListWrapper personListWrapper = (PersonListWrapper) unmarshaller.unmarshal(file);
			
			personData.clear();
			
			personData.setAll(personListWrapper.getPersonList());
			
			setPersonFilePath(file);
		} catch (JAXBException e) {
			Alert alert =new Alert(AlertType.ERROR);
			alert.setTitle("Error");
			alert.setHeaderText("Could not load data from file:\n" + file.getPath());
			alert.setContentText(e.getMessage());
			alert.initOwner(primaryStage);
			alert.showAndWait();
		}
		
	}
	
	public void savePersonDataToFile(File file){
		try {
			JAXBContext context = JAXBContext.newInstance(PersonListWrapper.class);
			
			Marshaller marshaller = context.createMarshaller();
			
			PersonListWrapper personListWrapper = new PersonListWrapper();
			personListWrapper.setPersonList(personData);
			
			marshaller.marshal(personListWrapper, file);
			setPersonFilePath(file);
			
		} catch (JAXBException e) {
			Alert alert =new Alert(AlertType.ERROR);
			alert.setTitle("Error");
			alert.setHeaderText("Could not save data to file:\n" + file.getPath());
			alert.setContentText(e.getMessage());
			alert.initOwner(primaryStage);
			alert.showAndWait();
		}
	}
	
	
}
