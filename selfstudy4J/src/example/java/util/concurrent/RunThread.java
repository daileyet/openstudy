package example.java.util.concurrent;

import java.util.concurrent.Executors;

public class RunThread {

	public static void main(String[] args) {
		MyThread thread1 = new MyThread();
		thread1.start();

		MyRunnable runnable=new MyRunnable();
		new Thread(runnable).start();
		
		Executors.newCachedThreadPool().execute(runnable);

	}
}

class MyThread extends Thread {
	@Override
	public void run() {
		System.out.println(Thread.currentThread().getName() + " start run.");
	}
}

class MyRunnable implements Runnable {
	@Override
	public void run() {
		System.out.println(Thread.currentThread().getName() + " start run.");
	}
}