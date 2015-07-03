package example.crypto.mix;

public abstract class MixBlock {
	protected Segment segment;
	
	@Override
	public String toString() {
		return "MixBlock [segment=" + segment + "]";
	}

	protected abstract MixTarget target();
	
	/**
	 * @return byte[] block content as byte
	 */
	public abstract byte[] getBytes();

	public abstract void persist();
	
	public Segment getSegment() {
		return segment;
	}
	
	public void setSegment(Segment segment) {
		this.segment = segment;
	}
	
	public long getPosition(){
		if(segment!=null){
			return segment.getPosition();
		}
		return 0;
	}
	
	public long getLength(){
		if(segment!=null){
			return segment.getLength();
		}
		return 0;
	}
	
}
