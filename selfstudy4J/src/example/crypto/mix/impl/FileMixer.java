/**
 * 
 */
package example.crypto.mix.impl;

import java.io.File;

import example.crypto.mix.AbstractMixer;
import example.crypto.mix.MixProcesser;
import example.crypto.mix.MixStrategy;
import example.crypto.mix.MixTarget;

/**
 * @author minjdai
 *
 */
public class FileMixer extends AbstractMixer {
	private MixFile mixFile;
	private MixStrategy mixStrategy;
	private MixProcesser mixProcesser;
	
	public FileMixer(MixFile mixFile, MixStrategy mixStrategy,
			MixProcesser mixProcesser) {
		super();
		this.mixFile = mixFile;
		this.mixStrategy = mixStrategy;
		this.mixProcesser = mixProcesser;
	}

	public FileMixer(MixFile mixFile, MixStrategy mixStrategy) {
		this(mixFile,mixStrategy,DefaultMixProcesser.get());
	}
	
	public FileMixer(File file, MixStrategy mixStrategy) {
		this(new MixFile(file),mixStrategy,DefaultMixProcesser.get());
	}

	public FileMixer(File file,String key){
		this(new MixFile(file),DefaultMixStrategy.get(key),DefaultMixProcesser.get());
	}

	@Override
	protected MixTarget getMixTarget() {
		return mixFile;
	}

	@Override
	protected MixStrategy getMixStrategy() {
		return mixStrategy;
	}

	@Override
	protected MixProcesser getMixProcesser() {
		return mixProcesser;
	}
	
}
