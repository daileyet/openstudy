package example.java.util.concurrent.threadpool;

import static example.java.util.concurrent.common.Help.next;
import static example.java.util.concurrent.common.Help.sleep;
import static example.java.util.concurrent.common.Help.now;
import java.util.UUID;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class FutureCallableDemo {

	final ExecutorService executorService = Executors.newCachedThreadPool();

	public void testCallable() {
		Future<String> futureResult = executorService
				.submit(new Callable<String>() {
					@Override
					public String call() throws Exception {
						String ret = UUID.randomUUID().toString();
						sleep(next(10) * 1000);
						return ret;
					}
				});
		
		System.out.println(now() + " Task has been submit.");
		
		try {
			String result = futureResult.get();
			System.out.println(now() + " Executor result:" + result);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		FutureCallableDemo context = new FutureCallableDemo();
		context.testCallable();
	}
}
