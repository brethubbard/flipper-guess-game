const WORD_CATEGORIES = {
    movies: {
        name: "Movies & TV",
        icon: "🎬",
        words: [
            "Titanic", "Avatar", "The Matrix", "Jurassic Park", "Star Wars",
            "Harry Potter", "The Avengers", "Frozen", "Toy Story", "Shrek",
            "The Lion King", "Finding Nemo", "Inception", "The Dark Knight", "Pulp Fiction",
            "Forrest Gump", "The Godfather", "Jaws", "E.T.", "Back to the Future",
            "Indiana Jones", "Spider-Man", "Batman", "Superman", "Wonder Woman",
            "Black Panther", "Iron Man", "Thor", "Hulk", "Captain America",
            "Guardians of the Galaxy", "Doctor Strange", "Ant-Man", "Deadpool", "X-Men",
            "Terminator", "Alien", "Predator", "RoboCop", "Mad Max",
            "The Hunger Games", "Twilight", "Lord of the Rings", "The Hobbit", "Game of Thrones",
            "Breaking Bad", "Friends", "The Office", "Seinfeld", "Stranger Things",
            "The Walking Dead", "Lost", "Prison Break", "Dexter", "House"
        ]
    },
    people: {
        name: "Famous People",
        icon: "⭐",
        words: [
            "Beyoncé", "Taylor Swift", "Drake", "Ed Sheeran", "Ariana Grande",
            "Justin Bieber", "Rihanna", "Kanye West", "Lady Gaga", "Bruno Mars",
            "Adele", "Eminem", "Jay-Z", "Madonna", "Michael Jackson",
            "Elvis Presley", "The Beatles", "Rolling Stones", "Queen", "David Bowie",
            "Tom Cruise", "Brad Pitt", "Leonardo DiCaprio", "Johnny Depp", "Will Smith",
            "Dwayne Johnson", "Robert Downey Jr", "Chris Hemsworth", "Scarlett Johansson", "Jennifer Lawrence",
            "Meryl Streep", "Tom Hanks", "Denzel Washington", "Morgan Freeman", "Samuel L Jackson",
            "Oprah Winfrey", "Ellen DeGeneres", "Jimmy Fallon", "Stephen Colbert", "Trevor Noah",
            "LeBron James", "Michael Jordan", "Cristiano Ronaldo", "Lionel Messi", "Serena Williams",
            "Tiger Woods", "Roger Federer", "Usain Bolt", "Muhammad Ali", "Mike Tyson",
            "Barack Obama", "Donald Trump", "Joe Biden", "Elon Musk", "Bill Gates"
        ]
    },
    animals: {
        name: "Animals",
        icon: "🐾",
        words: [
            "Dog", "Cat", "Elephant", "Lion", "Tiger",
            "Bear", "Wolf", "Fox", "Deer", "Moose",
            "Giraffe", "Zebra", "Hippo", "Rhino", "Gorilla",
            "Monkey", "Chimpanzee", "Orangutan", "Panda", "Koala",
            "Kangaroo", "Penguin", "Dolphin", "Whale", "Shark",
            "Octopus", "Jellyfish", "Starfish", "Crab", "Lobster",
            "Eagle", "Hawk", "Owl", "Parrot", "Peacock",
            "Flamingo", "Swan", "Duck", "Chicken", "Rooster",
            "Cow", "Horse", "Pig", "Sheep", "Goat",
            "Rabbit", "Squirrel", "Hamster", "Guinea Pig", "Turtle",
            "Snake", "Lizard", "Frog", "Crocodile", "Alligator"
        ]
    },
    food: {
        name: "Food & Drinks",
        icon: "🍕",
        words: [
            "Pizza", "Burger", "Hot Dog", "Taco", "Burrito",
            "Sushi", "Ramen", "Pasta", "Spaghetti", "Lasagna",
            "Steak", "Chicken Wings", "Fried Chicken", "BBQ Ribs", "Bacon",
            "Sandwich", "Submarine", "Wrap", "Quesadilla", "Nachos",
            "French Fries", "Onion Rings", "Mozzarella Sticks", "Chicken Nuggets", "Popcorn",
            "Ice Cream", "Cake", "Cookies", "Brownies", "Donuts",
            "Pancakes", "Waffles", "Cereal", "Toast", "Bagel",
            "Salad", "Soup", "Chili", "Curry", "Stir Fry",
            "Coffee", "Tea", "Soda", "Juice", "Smoothie",
            "Milkshake", "Hot Chocolate", "Lemonade", "Water", "Beer",
            "Wine", "Cocktail", "Margarita", "Mojito", "Champagne"
        ]
    },
    actions: {
        name: "Actions & Activities",
        icon: "🎯",
        words: [
            "Swimming", "Running", "Dancing", "Singing", "Jumping",
            "Cooking", "Baking", "Painting", "Drawing", "Writing",
            "Reading", "Sleeping", "Snoring", "Yawning", "Stretching",
            "Exercising", "Yoga", "Meditation", "Hiking", "Climbing",
            "Skiing", "Snowboarding", "Surfing", "Skateboarding", "Biking",
            "Driving", "Flying", "Sailing", "Rowing", "Fishing",
            "Camping", "Gardening", "Shopping", "Cleaning", "Vacuuming",
            "Ironing", "Washing Dishes", "Doing Laundry", "Taking Shower", "Brushing Teeth",
            "Combing Hair", "Applying Makeup", "Shaving", "Getting Dressed", "Tying Shoes",
            "Playing Guitar", "Playing Piano", "Playing Drums", "Playing Violin", "Playing Flute",
            "Texting", "Calling", "Emailing", "Typing", "Scrolling"
        ]
    },
    places: {
        name: "Places & Travel",
        icon: "✈️",
        words: [
            "Paris", "London", "New York", "Tokyo", "Rome",
            "Sydney", "Dubai", "Los Angeles", "Barcelona", "Amsterdam",
            "Venice", "Hawaii", "Maldives", "Bali", "Iceland",
            "Switzerland", "Norway", "Greece", "Egypt", "Morocco",
            "Beach", "Mountain", "Desert", "Forest", "Lake",
            "River", "Ocean", "Island", "Volcano", "Waterfall",
            "Hotel", "Restaurant", "Airport", "Train Station", "Bus Stop",
            "School", "Library", "Museum", "Zoo", "Aquarium",
            "Park", "Playground", "Stadium", "Cinema", "Theater",
            "Mall", "Supermarket", "Pharmacy", "Hospital", "Bank",
            "Post Office", "Police Station", "Fire Station", "Gas Station", "Gym"
        ]
    },
    sports: {
        name: "Sports",
        icon: "⚽",
        words: [
            "Soccer", "Football", "Basketball", "Baseball", "Tennis",
            "Golf", "Hockey", "Cricket", "Rugby", "Volleyball",
            "Swimming", "Running", "Cycling", "Boxing", "Wrestling",
            "Karate", "Judo", "Taekwondo", "Kung Fu", "MMA",
            "Skiing", "Snowboarding", "Ice Skating", "Figure Skating", "Speed Skating",
            "Surfing", "Skateboarding", "BMX", "Motocross", "Formula One",
            "NASCAR", "Bowling", "Pool", "Darts", "Archery",
            "Fencing", "Badminton", "Table Tennis", "Squash", "Racquetball",
            "Gymnastics", "Cheerleading", "Diving", "Pole Vault", "High Jump",
            "Long Jump", "Shot Put", "Javelin", "Discus", "Hammer Throw",
            "Marathon", "Triathlon", "Decathlon", "Pentathlon", "CrossFit"
        ]
    },
    kids: {
        name: "Kids & Family",
        icon: "🎈",
        words: [
            "Balloon", "Birthday Cake", "Presents", "Party Hat", "Candles",
            "Teddy Bear", "Doll", "Action Figure", "Lego", "Puzzle",
            "Crayons", "Coloring Book", "Stickers", "Play-Doh", "Bubbles",
            "Swing", "Slide", "Seesaw", "Sandbox", "Trampoline",
            "Bicycle", "Scooter", "Tricycle", "Wagon", "Kite",
            "Jump Rope", "Hula Hoop", "Frisbee", "Ball", "Yo-Yo",
            "Cartoon", "Superhero", "Princess", "Dinosaur", "Unicorn",
            "Dragon", "Fairy", "Mermaid", "Pirate", "Cowboy",
            "Clown", "Magician", "Circus", "Carnival", "Fair",
            "Ice Cream Truck", "Lemonade Stand", "Treehouse", "Fort", "Hide and Seek",
            "Tag", "Red Rover", "Simon Says", "Duck Duck Goose", "Musical Chairs"
        ]
    },
    random: {
        name: "Random Mix",
        icon: "🎲",
        words: []
    }
};

// Populate random category with words from all other categories
WORD_CATEGORIES.random.words = Object.keys(WORD_CATEGORIES)
    .filter(key => key !== 'random')
    .flatMap(key => WORD_CATEGORIES[key].words);

// Shuffle function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
