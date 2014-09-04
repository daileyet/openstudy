package example.book.effecitivejava2nd.item2;

public class Animal {
	private final String type;
	private final int age;
	private final int weight;

	private Animal(Builder builder) {
		this.type = builder.type;
		this.age = builder.age;
		this.weight = builder.weight;
	}
	
	

	public static class Builder {
		private final String type;
		private int age=0;
		private int weight=0;

		public Builder(String type) {
			this.type = type;
		}

		public Builder age(int age) {
			this.age = age;
			return this;
		}

		public Builder weight(int weight) {
			this.weight = weight;
			return this;
		}

		public Animal build() {
			return new Animal(this);
		}
	}

	public static void main(String[] args) {
		Animal cat=new Animal.Builder("Cat-Type").age(11).weight(10).build();
	}
	
}
