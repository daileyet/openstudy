package example.java.util.concurrent.locks;

import java.util.Random;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import static example.java.util.concurrent.common.Help.sleep;

public class ReadWritLockDemo {

	static class DataContainer {
		private volatile Object value = null;
		ReadWriteLock rwl = new ReentrantReadWriteLock();

		public Object get() {
			rwl.readLock().lock();
			try {
				if (value == null) {
					rwl.readLock().unlock();
					rwl.writeLock().lock();
					if (value == null) {
						value = new Random().nextInt(100);
					}
					rwl.readLock().lock();
					rwl.writeLock().unlock();
				}
				return value;
			} finally {
				rwl.readLock().unlock();
			}
		}

		public Object put() {
			rwl.writeLock().lock();
			try {
				value = new Random().nextInt(100);
				return value;
			} finally {
				rwl.writeLock().unlock();
			}

		}

	}

	public static void main(String[] args) {
		final DataContainer data = new DataContainer();
		new Thread(new Runnable() {
			@Override
			public void run() {
				while (true) {
					System.out.println(Thread.currentThread().getName()
							+ " get data:[" + data.get() + "]");
					sleep(100);
				}
			}
		}).start();
		
		new Thread(new Runnable() {
			@Override
			public void run() {
				while (true) {
					System.out.println(Thread.currentThread().getName()
							+ " get data:[" + data.get() + "]");
					sleep(100);
				}
			}
		}).start();

		new Thread(new Runnable() {
			@Override
			public void run() {
				while (true) {
					System.out.println(Thread.currentThread().getName()
							+ " put data:[" + data.put() + "]");
					sleep(500);
				}
			}
		}).start();
		

	}
}
