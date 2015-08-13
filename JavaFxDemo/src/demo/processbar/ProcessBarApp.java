package demo.processbar;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

public class ProcessBarApp extends Application {

	@Override
	public void start(Stage primaryStage) throws Exception {
		FXMLLoader loader = new FXMLLoader();
		loader.setLocation(getClass().getResource("/demo/processbar/Sample.fxml"));
		BorderPane root = loader.load();
		Scene scene = new Scene(root);
		primaryStage.setScene(scene);
		primaryStage.setTitle("Process Demo");
		primaryStage.show();
	}

	public static void main(String[] args) {
		launch(args);
	}

}
