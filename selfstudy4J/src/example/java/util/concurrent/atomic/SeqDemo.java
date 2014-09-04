package example.java.util.concurrent.atomic;

import static example.java.util.concurrent.common.Help.sleep;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

public class SeqDemo {
	static class NotAtomicSequencer extends Sequencer {
		private long seq = 0;

		@Override
		public long next() {
			return seq++;
		}
	}

	public static void main(String[] args) throws InterruptedException {
		for (int i = 0; i < 500; i++) {
			testAtomic(i);
			sleep(10);
		}
	}

	private static void testAtomic(int index) throws InterruptedException {
		final Sequencer seqInvoker = //new NotAtomicSequencer();
				Sequencer.createAtomicLongSequencer();
		final List<Long> seqList = new Vector<Long>();
		// new ConcurrentStack<Long>();
		Thread[] threads = new Thread[500];
		for (int i = 0; i < threads.length; i++) {
			threads[i] = new Thread(new Runnable() {
				@Override
				public void run() {
					long seq = seqInvoker.next();
					seqList.add(seq);
				}
			});
			threads[i].start();
		}
		for (Thread t : threads) {
			t.join();
		}

		Map<Long, Integer> countMap = new HashMap<Long, Integer>();
		// new TreeMap<Long, Integer>();
		for (Long seq : seqList) {
			Integer count = 1;
			if (countMap.containsKey(seq)) {
				count = countMap.get(seq);
				count = count + 1;
				System.out.println("Get it from thread:" + index + "(" + seq
						+ ")..............................................");
			}
			countMap.put(seq, count);
		}
		// for (Map.Entry<Long, Integer> entry : countMap.entrySet())
		// System.out.println(entry);
	}

}
