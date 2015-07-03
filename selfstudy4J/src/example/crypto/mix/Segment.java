package example.crypto.mix;

public final class Segment {
	
	public final static Segment create(long p, long l){
		return new Segment(p, l);
	}
	
	private long position;
	private long length;
	public Segment() {
		super();
	}
	
	public Segment(long position, long length) {
		super();
		this.position = position;
		this.length = length;
	}
	
	public long getPosition() {
		return position;
	}
	public void setPosition(long position) {
		this.position = position;
	}
	public long getLength() {
		return length;
	}
	public void setLength(long length) {
		this.length = length;
	}

	@Override
	public String toString() {
		return "Segment [position=" + position + ", length=" + length + "]";
	}
}
