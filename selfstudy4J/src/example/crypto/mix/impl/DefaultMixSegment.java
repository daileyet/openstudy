/**
 * 
 */
package example.crypto.mix.impl;

import java.util.ArrayList;
import java.util.List;

import example.crypto.mix.MixSegment;
import example.crypto.mix.Segment;

/**
 * @author minjdai
 *
 */
public class DefaultMixSegment implements MixSegment {
	
	public static final DefaultMixSegment get(long...args){
		if(args!=null && args.length>2)
			return new DefaultMixSegment((int)args[0],  args[1]);
		else if(args!=null && args.length==1){
			return new DefaultMixSegment((int)args[0]);
		}
		return new DefaultMixSegment();
	}
	
	private final long SEGMENT_DEFAULT_LENGTH = 32; 
	private final int SEGMENT_DEFAULT_SPACE = 3;
	
	private Integer space;
	private Long length;
	
	public int getSpace() {
		if(space==null || space==0){
			return SEGMENT_DEFAULT_SPACE;
		}
		return space;
	}
	
	public Long getLength() {
		if(length==null || length==0){
			return SEGMENT_DEFAULT_LENGTH;
		}
		return length;
	}
	
	public void setSpace(Integer space) {
		this.space = space;
	}
	
	public void setLength(Long length) {
		this.length = length;
	}
	
	public DefaultMixSegment() {
	}
	
	public DefaultMixSegment(Integer space) {
		super();
		this.space = space;
	}
	
	public DefaultMixSegment(Integer space,Long length) {
		super();
		this.space = space;
		this.length=length;
	}

	/* (non-Javadoc)
	 * @see example.crypto.mix.MixSegment#calcuate(long)
	 */
	@Override
	public Segment[] calcuate(long fileLength) {
		long segmentLength = this.getLength();
		long totalPiece = fileLength/segmentLength;
		List<Segment> segments =new ArrayList<Segment>();
		int _space = this.getSpace();
		for(int i=0;i<totalPiece;){
			long poistion = i*segmentLength;
			segments.add(new Segment(poistion, segmentLength));
			i=i+_space;
		}
		return segments.toArray(new Segment[0]);
	}

}
