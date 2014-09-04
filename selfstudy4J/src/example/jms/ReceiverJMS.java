/*
 * @(#) ReceiverJMS.java Mar 29, 2012 5:21:06 PM
 *
 * Copyright 2012 Rockwell Automation, Inc. All rights reserved.
 * Rockwell Automation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */package example.jms;

import java.util.concurrent.CountDownLatch;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.apache.activemq.ActiveMQConnectionFactory;

/**
 * TODO Please enter the description of this type. This is mandatory!
 * <p>
 * 
 * @author dailey_dai, Mar 29, 2012 5:21:06 PM
 */
public class ReceiverJMS
{
	public static final String URL = "tcp://localhost:61616";

	public static void main(String[] args)
		throws JMSException, InterruptedException
	{
//		ExecutorService service = Executors.newCachedThreadPool();
//		for (int i = 0; i < 2; i++)
//		{
//			final int index = i;
//			service.submit(new Runnable()
//			{
//				@Override
//				public void run()
//				{
//					try
//					{
//						receive("ConsumerThread" + index);
//					}
//					catch (JMSException e)
//					{
//						e.printStackTrace();
//					}
//					catch (InterruptedException e)
//					{
//						e.printStackTrace();
//					}
//				}
//			});
//		}
		receive(Thread.currentThread().getName());
		down.await();
	}

	final static CountDownLatch down = new CountDownLatch(10);

	private static void receive(final String name)
		throws JMSException, InterruptedException
	{
		ConnectionFactory confactory = new ActiveMQConnectionFactory(URL);
		Connection con = confactory.createConnection();
		con.start();
		Session session = con.createSession(
			false, Session.AUTO_ACKNOWLEDGE);
		// final Destination queue = session.createQueue("TEST.QUEUE");
		// MessageConsumer consumer = session.createConsumer(queue);
		final Destination topic = session.createTopic("TEST.TOPIC");
		MessageConsumer consumer = session.createConsumer(topic);
		consumer.setMessageListener(new MessageListener()
		{
			@Override
			public void onMessage(Message msg)
			{
				try
				{
					// msg.acknowledge();
					down.countDown();
					if (msg instanceof TextMessage)
						System.out.println(name + "-"
							+ ((TextMessage) msg).getText());
				}
				catch (JMSException e)
				{
					e.printStackTrace();
				}
			}
		});

		// down.await();
		// con.close();
	}

}
