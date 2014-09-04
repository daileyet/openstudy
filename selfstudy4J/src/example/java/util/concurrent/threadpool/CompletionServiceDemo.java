package example.java.util.concurrent.threadpool;

import static example.java.util.concurrent.common.Help.next;
import static example.java.util.concurrent.common.Help.sleep;
import static example.java.util.concurrent.common.Help.now;
import java.util.UUID;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletionService;
import java.util.concurrent.ExecutorCompletionService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class CompletionServiceDemo {

	final CompletionService<String> competeService = new ExecutorCompletionService<String>(
			Executors.newCachedThreadPool());

	void testCompletionService() throws Exception {

		new Thread(new Runnable() {
			@Override
			public void run() {
				for (;;) {
					competeService.submit(new Callable<String>() {
						@Override
						public String call() throws Exception {
							String ret = UUID.randomUUID().toString();
							sleep(next(10) * 1000);
							return ret;
						}
					});
					sleep(1000);
				}
			}
		}).start();

		for (;;) {
			Future<String> future = competeService.take();
			String result = future.get();
			System.out.println(now() + " Executor completed result:" + result);
		}
	}

	public static void main(String[] args) throws Exception {
		CompletionServiceDemo context = new CompletionServiceDemo();
		context.testCompletionService();
	}

}
