package example.javabean.serialization;

import java.awt.FlowLayout;
import java.awt.Frame;
import java.awt.TextField;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class PickleMaker extends Frame {
	private static final long serialVersionUID = -5292877841170086502L;

	public PickleMaker(String text, int size) {
		super("Pickle Maker");
		addWindowListener(new Win());
		setLayout(new FlowLayout());
		TextField textField = makeTextField(text, size);
		serializeTextField(textField, "mytextfield.ser");
		add(textField);
	}

	private void serializeTextField(TextField textField, String filename) {
		try {
			FileOutputStream outStream = new FileOutputStream(filename);
			ObjectOutputStream out = new ObjectOutputStream(outStream);
			out.writeObject(textField);
			out.flush();
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	private TextField makeTextField(String text, int size) {
		return new TextField(text, size);
	}
	
	public static void main(String[] args) {
		Frame frame=new PickleMaker("No matter where you go,&this.",25);
		frame.setBounds(0, 0, 300, 200);
		frame.setVisible(true);
	}

}
