package demo.processbar;

import java.net.URL;
import java.util.ResourceBundle;
import java.util.concurrent.TimeUnit;

import javafx.concurrent.Task;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.TableView;
import javafx.scene.layout.FlowPane;

import com.sun.javafx.binding.StringFormatter;

public class ProgressController implements Initializable{
	@FXML
	private FlowPane flowPane;
	@FXML
	private TableView<Object> tableView;
	@FXML
	private ProgressBar progressBar;
	@FXML
	private Label progressLabel;
	
	private Task<Object> progressTask;
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		flowPane.setPadding(new Insets(10, 0, 0, 5));
		//progressBar.prefWidthProperty().bind(tableView.widthProperty().add(-100));
		progressLabel.textProperty().bind(StringFormatter.convert(progressBar.progressProperty()));
		progressTask=new Task<Object>() {

			@Override
			protected Object call() throws Exception {
				for(int i=1;i<=100;i++){
					TimeUnit.MILLISECONDS.sleep(100);
					updateProgress(i,100);
				}
				return null;
			}
			
		};
		progressBar.progressProperty().bind(progressTask.progressProperty());
	}

	@FXML
	private void handStartAction(){
		new Thread(progressTask).start();
	}
}
