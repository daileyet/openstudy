package example.java.util.concurrent.tool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;
import static example.java.util.concurrent.common.Help.next;
public class SemaphoreDemo {

	public static void main(String[] args) {
		ExecutorService service = Executors.newCachedThreadPool();
		final Semaphore sp = new Semaphore(3);
		for (int i = 0; i < 10; i++) {
			service.execute(new Runnable() {
				@Override
				public void run() {
					try {
						sp.acquire();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					System.out.println("�߳�:" + Thread.currentThread().getName()
							+ " ����,��ǰ����" + (3 - sp.availablePermits()));
					try {
						Thread.sleep(next(10) * 1000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					System.out.println("�߳�:" + Thread.currentThread().getName()
							+ " �����뿪");
					sp.release();

					System.out.println("�߳�:" + Thread.currentThread().getName()
							+ " ���뿪,��ǰ����" + (3 - sp.availablePermits()));
				}
			});

		}

	}

}
