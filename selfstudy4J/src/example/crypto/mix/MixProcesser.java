package example.crypto.mix;

public interface MixProcesser {

	void start();

	void processed(MixBlock block);

	void completed();

	long cost();
}
