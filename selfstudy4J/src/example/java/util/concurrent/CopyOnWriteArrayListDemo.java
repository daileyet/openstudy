package example.java.util.concurrent;

import static example.java.util.concurrent.common.Help.printList;
import static example.java.util.concurrent.common.Help.sleep;

import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

public class CopyOnWriteArrayListDemo {

	static class TestContext {
		final List<String> cwList = new CopyOnWriteArrayList<String>();
		// initial list
		{
			for (int i = 0; i < 10; i++) {
				cwList.add(UUID.randomUUID().toString() + "_" + i);
			}
			printList(cwList);
		}

		public void testConcurrentModificationException() {
			String find = cwList.get(5);
			System.out.println("Want to remove:" + find);
			for (Iterator<String> it = cwList.iterator(); it.hasNext();) {
				String uuid = it.next();
				if (find.equals(uuid)) {
					cwList.remove(uuid);
				}
			}
			printList(cwList);
		}

		public void testMulityThreadSafe() {
			new Thread(new Runnable() {
				private int count = 0;

				@Override
				public void run() {
					while (true) {
						sleep(100);
						String data = UUID.randomUUID() + "_"
								+ Thread.currentThread().getName() + "_"
								+ count++;
						cwList.add(data);
						System.out.println(Thread.currentThread().getName()
								+ " add data:" + data);
					}
				}
			}).start();

			new Thread(new Runnable() {
				@Override
				public void run() {
					while (true) {
						String data = cwList.get(cwList.size() - 1);
						System.out.println(Thread.currentThread().getName()
								+ " get data:" + data);
						sleep(100);
					}
				}
			}).start();

			new Thread(new Runnable() {
				@Override
				public void run() {
					while (true) {
						String data = cwList.get(cwList.size() - 1);
						System.out.println(Thread.currentThread().getName()
								+ " get data:" + data);
						sleep(100);
					}
				}
			}).start();

		}

	}

	public static void main(String[] args) {
		TestContext context = new TestContext();
		context.testConcurrentModificationException();
		// context.testMulityThreadSafe();
	}

}
