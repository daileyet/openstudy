/**
 * 
 */
package example.crypto.mix.impl;

import java.io.IOException;
import java.nio.MappedByteBuffer;

import example.crypto.mix.MixBlock;
import example.crypto.mix.MixTarget;
import example.crypto.mix.Segment;

/**
 * @author minjdai
 *
 */
public final class MixFileBlock extends MixBlock {
	private MixFile mixFile = null;
	private byte[] bytes = null;
	
	public MixFileBlock(Segment segment,MixFile mixFile) {
		this.segment=segment;
		this.mixFile=mixFile;
	}
	
	/* (non-Javadoc)
	 * @see example.crypto.mix.MixBlock#target()
	 */
	@Override
	protected MixTarget target() {
		return mixFile;
	}

	/* (non-Javadoc)
	 * @see example.crypto.mix.MixBlock#getBytes()
	 */
	@Override
	public byte[] getBytes() {
		MappedByteBuffer mappedByteBuffer = null;
		bytes = new byte[(int) segment.getLength()];
		try {
			mappedByteBuffer = mixFile.getMappedByteBuffer(this);
			mappedByteBuffer.get(bytes);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return bytes;
	}

	/* (non-Javadoc)
	 * @see example.crypto.mix.MixBlock#persist()
	 */
	@Override
	public void persist() {
		if(this.bytes==null) return;
		MappedByteBuffer mappedByteBuffer = null;
		try {
			mappedByteBuffer = mixFile.getMappedByteBuffer(this);
			mappedByteBuffer.put(this.bytes);
			mappedByteBuffer.force();
			mappedByteBuffer.clear();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
