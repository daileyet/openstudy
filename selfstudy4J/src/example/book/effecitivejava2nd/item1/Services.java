package example.book.effecitivejava2nd.item1;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
/**
 * Service provider framework
 * @author dailey
 * Jan 9, 2012
 */
public class Services {

	private Services() {
	}

	private static final Map<String, Provider> providers = new ConcurrentHashMap<String, Provider>();

	private static final String DEFAULT_PROVIDER_NAME = "<def>";

	public static void registerDefaultProvider(Provider provider) {
		registerDefaultProvider(DEFAULT_PROVIDER_NAME, provider);
	}

	public static void registerDefaultProvider(String name, Provider provider) {
		providers.put(name, provider);
	}

	public static Service newInstance(String name) {
		Provider provider = providers.get(name);
		if (provider == null) {
			throw new IllegalArgumentException(
					"No provider registered with name: " + name);
		}
		return provider.newService();
	}

}
