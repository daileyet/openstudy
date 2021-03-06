package demo.group;

import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

public class GroupMain extends Application{

	@Override
	public void start(Stage primaryStage) throws Exception {
		 Group root = new Group();
		    Scene scene = new Scene(root, 440, 200);
		    primaryStage.setScene(scene);
		    primaryStage.setTitle("");

		    VBox vb = new VBox();

		    Pane canvas = new Pane();
		    canvas.setStyle("-fx-background-color: white;");
		    canvas.setPrefSize(200,200);
		    Group group = new Group();
		    canvas.getChildren().add(group);
		    int row_cell_count = 40;
		    for(int i=0;i<500;i++){
			    Rectangle rectangle = new Rectangle(10,10,Color.RED);
			    int x = i%row_cell_count;
			    int y = i/row_cell_count;
			    rectangle.relocate(x*11,y*11);
			    rectangle.setArcWidth(3);
			    rectangle.setArcHeight(3);
			    group.getChildren().add(rectangle);
			   
		    }
		    
		    vb.getChildren().add(canvas);
		    scene.setRoot(vb);
		    primaryStage.setOnShown((event)->{
		    	 new Thread(){
				    	public void run() {
				    		for(int i=0;i<500;i++){
						    	Rectangle rectangle  = (Rectangle) group.getChildren().get(i);
						    	rectangle.setFill(Color.GREEN);
						    	try {
									Thread.sleep(10);
								} catch (InterruptedException e) {
									e.printStackTrace();
								}
						    }
				    	};
				    }.start();
		    });
		    primaryStage.show();
		   
	}
	
	public static void main(String[] args) {
		launch(args);
	}

}
