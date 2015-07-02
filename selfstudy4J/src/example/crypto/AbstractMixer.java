/**
 * 
 */
package example.crypto;

import java.util.concurrent.Callable;
import java.util.concurrent.CompletionService;
import java.util.concurrent.ExecutorCompletionService;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @author minjdai
 *
 */
public abstract class AbstractMixer implements Mixer {

	/* (non-Javadoc)
	 * @see example.crypto.Mixer#mix()
	 */
	protected MixTarget mixTarget;
	protected MixStrategy mixStrategy;
	@Override
	public void mix() {

		final ExecutorService executorService =Executors.newCachedThreadPool();
		final CompletionService<MixBlock> competeService = new ExecutorCompletionService<MixBlock>(
				executorService);
		
		for(MixBlock mixBlock: mixTarget.blocks()){
			competeService.submit(new Callable<MixBlock>() {
				@Override
				public MixBlock call() throws Exception {
					mixStrategy.action(mixBlock);
					return mixBlock;
				}
			});
		}
		

	}

}
