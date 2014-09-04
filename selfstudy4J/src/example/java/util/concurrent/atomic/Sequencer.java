package example.java.util.concurrent.atomic;

import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicLongFieldUpdater;

public abstract class Sequencer {
	//get next sequence
	public abstract long next();

	
	
	
	
	
	
	
	
	
	
	
	
	
	public static Sequencer createAtomicLongSequencer() {
		return new AtomicLongSequencer();
	}
	public static Sequencer createAtomicFiledUpdaterSequencer() {
		return new AtomicFiledUpdaterSequencer();
	}
}

















class AtomicLongSequencer extends Sequencer {
	private AtomicLong seq = new AtomicLong(0);
	@Override
	public long next() {
		return seq.getAndIncrement();
	}
}


















class AtomicFiledUpdaterSequencer extends Sequencer {
	@SuppressWarnings("unused")
	private volatile long seq = 0;
	private AtomicLongFieldUpdater<AtomicFiledUpdaterSequencer> updater = AtomicLongFieldUpdater
			.newUpdater(AtomicFiledUpdaterSequencer.class, "seq");
	@Override
	public long next() {
		return updater.getAndIncrement(this);
	}
}







