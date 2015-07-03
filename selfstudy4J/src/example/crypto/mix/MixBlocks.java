package example.crypto.mix;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public final class MixBlocks implements Iterable<MixBlock>{
	
	public static final MixBlocks create(List<MixBlock> blocks){
		return new MixBlocks(blocks);
	}
	
	private List<MixBlock> list =new ArrayList<MixBlock>();
	
	public MixBlocks(MixBlock[] blocks) {
		list.addAll(Arrays.asList(blocks));
	}
	
	public MixBlocks(List<MixBlock> blocks) {
		list.addAll(blocks);
	}
	
	public int size(){
		return list.size();
	}
	
	@Override
	public Iterator<MixBlock> iterator() {
		return new Iterator<MixBlock>(){
			private int index = 0;
			@Override
			public boolean hasNext() {
				return (index) < MixBlocks.this.size();
			}

			@Override
			public MixBlock next() {
				MixBlock block = list.get(index);
				index++;
				return block;
			}
		};
	}

	

}
