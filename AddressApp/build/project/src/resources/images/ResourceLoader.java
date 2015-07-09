package resources.images;

import javafx.scene.image.Image;

public class ResourceLoader {
	public static final Image APP_ICON;
	
	static{
		
		APP_ICON = new Image(ResourceLoader.class.getResourceAsStream("address_book_32.png"));
		
	}
}
