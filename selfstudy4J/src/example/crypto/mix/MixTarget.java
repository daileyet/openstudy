package example.crypto.mix;

public interface MixTarget {

	MixBlocks blocks();

	void initial();
	
	void free();
}
