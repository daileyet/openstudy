package example.javabean.serialization;

import java.awt.Frame;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class Win extends WindowAdapter {

	@Override
	public void windowClosing(WindowEvent e) {
		Frame frame=(Frame) e.getSource();
		frame.setVisible(false);
		frame.dispose();
		System.exit(0);
	}

}
