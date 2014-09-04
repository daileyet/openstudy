/*
 * @(#) SendJMS.java Mar 29, 2012 5:00:10 PM
 *
 * Copyright 2012 Rockwell Automation, Inc. All rights reserved.
 * Rockwell Automation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */package example.jms;

import java.awt.Dimension;
import java.awt.event.ActionListener;
import java.beans.EventHandler;
import java.util.Date;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.DeliveryMode;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.swing.JButton;
import javax.swing.JFrame;

import org.apache.activemq.ActiveMQConnectionFactory;

/**
 * TODO Please enter the description of this type. This is mandatory!
 * <p>
 * 
 * @author dailey_dai, Mar 29, 2012 5:00:10 PM
 */
public class SendJMS
{
	public static final String URL = "tcp://127.0.0.1:61616";

	public static void main(String[] args)
	{
		SendJMS sender = new SendJMS();
		JFrame frame = new JFrame("JMS Sender");
		JButton button = new JButton("Send");
		button.addActionListener(EventHandler.create(
			ActionListener.class, sender, "send"));
		frame.setLayout(null);
		frame.add(button);
		button.setBounds(
			10, 10, 80, 50);
		frame.setPreferredSize(new Dimension(200, 300));
		frame.setSize(
			200, 300);
		frame.setVisible(true);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	public void send()
	{
		Session session = null;
		try
		{
			ConnectionFactory confactory = new ActiveMQConnectionFactory(URL);
			Connection con = confactory.createConnection();
			con.start();
			session = con.createSession(
				true, Session.AUTO_ACKNOWLEDGE);
			// Destination queue = session.createQueue("TEST.QUEUE");
			// MessageProducer producer = session.createProducer(queue);
			Destination topic = session.createTopic("TEST.TOPIC");
			MessageProducer producer = session.createProducer(topic);
			producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
			TextMessage message = session.createTextMessage(new Date().toString());
			producer.send(message);
			session.commit();
			con.close();
		}
		catch (JMSException e)
		{
			try
			{
				if (session != null)
					session.rollback();
			}
			catch (JMSException e1)
			{
				e1.printStackTrace();
			}
		}
	}

}
