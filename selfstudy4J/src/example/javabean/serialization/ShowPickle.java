package example.javabean.serialization;

import java.awt.Button;
import java.awt.FlowLayout;
import java.awt.Frame;
import java.awt.TextField;
import java.awt.event.ActionListener;
import java.beans.Beans;
import java.beans.EventHandler;
import java.io.IOException;

import javax.swing.SwingUtilities;

public class ShowPickle extends Frame {

	private static final long serialVersionUID = 910137913546568454L;

	private String serComponenet = null;

	public ShowPickle(String serComponent) {
		super("Show Pickle");
		addWindowListener(new Win());
		setLayout(new FlowLayout());
		this.serComponenet = serComponent;
		Button btn = new Button("Add");
		add(btn);
		btn.addActionListener(EventHandler.create(ActionListener.class, this,
				"addTextField"));
	}

	public void addTextField() {
		TextField txt = null;
		try {
			txt = (TextField) Beans.instantiate(null, serComponenet);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		if (txt != null)
			add(txt);
		SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				repaint();
			}
		});
	}

	public static void main(String[] args) {
		Frame frame = new ShowPickle("mytextfield");
		frame.setSize(300, 200);
		frame.pack();
		frame.setVisible(true);
	}

}
