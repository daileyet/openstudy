/**
 * 
 */
package example.crypto.mix.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel.MapMode;
import java.util.ArrayList;
import java.util.List;

import example.crypto.mix.MixBlock;
import example.crypto.mix.MixBlocks;
import example.crypto.mix.MixSegment;
import example.crypto.mix.MixTarget;
import example.crypto.mix.Segment;

/**
 * @author minjdai
 *
 */
public class MixFile implements MixTarget {
	private File file;
	private RandomAccessFile randomAccessFile;
	private MixSegment mixSegment;
	
	public MixFile(File file) {
		super();
		this.file = file;
		this.mixSegment = DefaultMixSegment.get();
	}
	
	public MixFile(File file,MixSegment mixSegment) {
		super();
		this.file = file;
		if(mixSegment!=null){
			this.mixSegment=mixSegment;
		}else{
			this.mixSegment = DefaultMixSegment.get();
		}
		
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see example.crypto.mix.MixTarget#blocks()
	 */
	@Override
	public MixBlocks blocks() {
		long fileLength = file.length();
		Segment[] segments = mixSegment.calcuate(fileLength);
		List<MixBlock> list =new ArrayList<MixBlock>();
		for(Segment segment :segments){
			list.add(new MixFileBlock(segment,this));
		}
		return MixBlocks.create(list);
	}

	protected MappedByteBuffer getMappedByteBuffer(MixBlock mixblock) throws IOException{
		MappedByteBuffer mappedByteBuffer = randomAccessFile.getChannel().map(MapMode.READ_WRITE,mixblock.getPosition(), mixblock.getLength());
		return mappedByteBuffer;
	}
	
	@Override
	public void initial() {
		if (randomAccessFile != null) {
			this.free();
			randomAccessFile = null;
		}
		
		try {
			randomAccessFile = new RandomAccessFile(file, "rw");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	

	/*
	 * (non-Javadoc)
	 * 
	 * @see example.crypto.mix.MixTarget#free()
	 */
	@Override
	public void free() {
		if (randomAccessFile != null) {
			try {
				randomAccessFile.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
