/**
 * Handmade Haven Product Database
 * Using Unsplash direct image URLs
 */

// Image URLs from Unsplash
const IMAGES = {
  // Cookies
  cookieClassic: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600',
  cookieChocolate: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600',
  cookieRedvelvet: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600',
  cookieMonster: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600',
  
  // Brownies
  brownieFudgy: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600',
  brownieChocolate: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600',
  brownieOreo: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=600',
  brownieSlab: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=600',
  
  // Cupcakes
  cupcakeBanana: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600',
  cupcakeLava: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600',
  cupcakeOreo: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600',
  cupcakeChocolate: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600',
  cupcakeKitkat: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=600',
  cupcakeHazelnut: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600',
  cakeMarble: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
  
  // Savory
  sandwichGrilled: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600',
  sandwichFajita: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600',
  breadRoll: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600',
  chickenBread: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
  chickenPops: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600',
  dynamiteChicken: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=600',
  samosa: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600',
  
  // Hero
  heroBakery: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1200',
  heroCupcakes: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=1200',
  heroSavory: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1200'
};

const PRODUCTS = [
  // COOKIES
  {
    id: 'cookie-001', name: 'Classic Cookie', category: 'cookies', price: 100, oldPrice: null, badge: 'Popular',
    images: [IMAGES.cookieClassic],
    description: 'Our signature classic cookie - crispy on the outside, chewy on the inside. Perfect with tea or coffee!',
    details: { weight: '80g', ingredients: 'Flour, Butter, Sugar, Eggs, Vanilla', allergens: 'Gluten, Dairy, Eggs', shelfLife: '5 days' },
    colors: ['Single'], rating: 4.8, reviews: 124, inStock: true
  },
  {
    id: 'cookie-002', name: 'Chocolate Filled Cookie', category: 'cookies', price: 120, oldPrice: null, badge: 'Bestseller',
    images: [IMAGES.cookieChocolate],
    description: 'Soft cookie with a gooey chocolate center that melts in your mouth. Chocolate lovers favorite!',
    details: { weight: '90g', ingredients: 'Flour, Butter, Chocolate, Sugar, Eggs', allergens: 'Gluten, Dairy, Eggs', shelfLife: '4 days' },
    colors: ['Single'], rating: 4.9, reviews: 189, inStock: true
  },
  {
    id: 'cookie-003', name: 'Red Velvet Cookie', category: 'cookies', price: 150, oldPrice: null, badge: 'Premium',
    images: [IMAGES.cookieRedvelvet],
    description: 'Beautiful red velvet cookie with white chocolate chips. A treat for the eyes and taste buds!',
    details: { weight: '85g', ingredients: 'Flour, Cocoa, White Chocolate, Cream Cheese', allergens: 'Gluten, Dairy, Eggs', shelfLife: '4 days' },
    colors: ['Single'], rating: 4.9, reviews: 156, inStock: true
  },
  {
    id: 'cookie-004', name: 'Monster Cookie', category: 'cookies', price: 120, oldPrice: null, badge: null,
    images: [IMAGES.cookieMonster],
    description: 'Loaded cookie with oats, peanut butter, chocolate chips & M&Ms. A monster of flavors!',
    details: { weight: '100g', ingredients: 'Oats, Peanut Butter, Chocolate, M&Ms', allergens: 'Gluten, Dairy, Nuts, Eggs', shelfLife: '5 days' },
    colors: ['Single'], rating: 4.7, reviews: 98, inStock: true
  },
  // BROWNIES
  {
    id: 'brownie-001', name: 'Chococo Fudgy Brownie', category: 'brownies', price: 180, oldPrice: null, badge: 'Bestseller',
    images: [IMAGES.brownieFudgy],
    description: 'Dense, fudgy brownie with intense chocolate flavor. Rich and decadent!',
    details: { weight: '100g', ingredients: 'Dark Chocolate, Butter, Sugar, Eggs, Flour', allergens: 'Gluten, Dairy, Eggs', shelfLife: '5 days' },
    colors: ['Single'], rating: 4.9, reviews: 234, inStock: true
  },
  {
    id: 'brownie-002', name: "D'Choco Brownie", category: 'brownies', price: 200, oldPrice: null, badge: 'Premium',
    images: [IMAGES.brownieChocolate],
    description: 'Double chocolate brownie with chocolate chips and chocolate drizzle. For serious chocoholics!',
    details: { weight: '110g', ingredients: 'Double Chocolate, Chocolate Chips, Butter, Eggs', allergens: 'Gluten, Dairy, Eggs', shelfLife: '5 days' },
    colors: ['Single'], rating: 4.9, reviews: 178, inStock: true
  },
  {
    id: 'brownie-003', name: 'Oreo Brownie', category: 'brownies', price: 200, oldPrice: null, badge: 'Popular',
    images: [IMAGES.brownieOreo],
    description: 'Fudgy brownie loaded with crushed Oreos and topped with Oreo pieces. Cookies & cream heaven!',
    details: { weight: '120g', ingredients: 'Chocolate, Oreo Cookies, Butter, Eggs, Flour', allergens: 'Gluten, Dairy, Eggs', shelfLife: '5 days' },
    colors: ['Single'], rating: 4.8, reviews: 167, inStock: true
  },
  {
    id: 'brownie-004', name: 'Brownie Slab', category: 'brownies', price: 1000, oldPrice: null, badge: 'Party Size',
    images: [IMAGES.brownieSlab],
    description: 'Large brownie slab perfect for parties and gatherings. Serves 8-10 people!',
    details: { weight: '800g', serves: '8-10 people', ingredients: 'Dark Chocolate, Butter, Sugar, Eggs', allergens: 'Gluten, Dairy, Eggs', shelfLife: '5 days' },
    colors: ['Plain', 'With Nuts', 'Oreo Top'], rating: 5.0, reviews: 89, inStock: true
  },
  // CUPCAKES
  {
    id: 'cupcake-001', name: 'BananChoco Bites', category: 'cupcakes', price: 120, oldPrice: null, badge: null,
    images: [IMAGES.cupcakeBanana],
    description: 'Moist banana muffin with chocolate chips. Healthy meets delicious!',
    details: { weight: '80g', ingredients: 'Banana, Chocolate Chips, Flour, Eggs', allergens: 'Gluten, Dairy, Eggs', shelfLife: '3 days' },
    colors: ['Single'], rating: 4.6, reviews: 87, inStock: true
  },
  {
    id: 'cupcake-002', name: 'Choco Lava Muffin', category: 'cupcakes', price: 180, oldPrice: null, badge: 'Bestseller',
    images: [IMAGES.cupcakeLava],
    description: 'Warm chocolate muffin with molten chocolate center. Best served warm!',
    details: { weight: '90g', ingredients: 'Dark Chocolate, Butter, Eggs, Flour', allergens: 'Gluten, Dairy, Eggs', shelfLife: '2 days', tip: 'Microwave 15 sec' },
    colors: ['Single'], rating: 4.9, reviews: 256, inStock: true
  },
  {
    id: 'cupcake-003', name: 'Oreo Bliss', category: 'cupcakes', price: 160, oldPrice: null, badge: 'Popular',
    images: [IMAGES.cupcakeOreo],
    description: 'Cookies & cream cupcake with Oreo frosting and Oreo crumbs. Oreo lovers dream!',
    details: { weight: '85g', ingredients: 'Oreo, Cream Cheese, Flour, Butter', allergens: 'Gluten, Dairy, Eggs', shelfLife: '3 days' },
    colors: ['Single'], rating: 4.8, reviews: 145, inStock: true
  },
  {
    id: 'cupcake-004', name: 'Double Choco Bliss', category: 'cupcakes', price: 160, oldPrice: null, badge: null,
    images: [IMAGES.cupcakeChocolate],
    description: 'Rich chocolate cupcake with chocolate buttercream frosting. Double the chocolate!',
    details: { weight: '85g', ingredients: 'Cocoa, Chocolate, Butter, Eggs, Flour', allergens: 'Gluten, Dairy, Eggs', shelfLife: '3 days' },
    colors: ['Single'], rating: 4.7, reviews: 112, inStock: true
  },
  {
    id: 'cupcake-005', name: 'KitKat Craze', category: 'cupcakes', price: 160, oldPrice: null, badge: null,
    images: [IMAGES.cupcakeKitkat],
    description: 'Chocolate cupcake topped with KitKat pieces and chocolate drizzle. Crunchy & creamy!',
    details: { weight: '90g', ingredients: 'Chocolate, KitKat, Butter, Eggs, Flour', allergens: 'Gluten, Dairy, Eggs', shelfLife: '3 days' },
    colors: ['Single'], rating: 4.7, reviews: 98, inStock: true
  },
  {
    id: 'cupcake-006', name: 'Hazel Bliss', category: 'cupcakes', price: 200, oldPrice: null, badge: 'Premium',
    images: [IMAGES.cupcakeHazelnut],
    description: 'Nutella-filled cupcake with hazelnut frosting. Rich, nutty, and divine!',
    details: { weight: '95g', ingredients: 'Nutella, Hazelnuts, Chocolate, Butter', allergens: 'Gluten, Dairy, Eggs, Nuts', shelfLife: '3 days' },
    colors: ['Single'], rating: 4.9, reviews: 134, inStock: true
  },
  {
    id: 'cupcake-007', name: 'Marble Cake', category: 'cupcakes', price: 500, oldPrice: null, badge: 'Large',
    images: [IMAGES.cakeMarble],
    description: 'Large marble cake with swirls of vanilla and chocolate. Perfect for sharing!',
    details: { weight: '500g', serves: '4-6 people', ingredients: 'Flour, Cocoa, Vanilla, Butter, Eggs', allergens: 'Gluten, Dairy, Eggs', shelfLife: '4 days' },
    colors: ['Whole'], rating: 4.8, reviews: 76, inStock: true
  },
  // SAVORY
  {
    id: 'savory-001', name: 'Grillwich', category: 'savory', price: 300, oldPrice: null, badge: 'Popular',
    images: [IMAGES.sandwichGrilled],
    description: 'Grilled sandwich with seasoned chicken, cheese, and veggies. Crispy and delicious!',
    details: { serving: '1 person', ingredients: 'Bread, Chicken, Cheese, Vegetables', allergens: 'Gluten, Dairy', prepTime: '15 mins' },
    colors: ['Regular'], rating: 4.8, reviews: 167, inStock: true
  },
  {
    id: 'savory-002', name: 'FajGrill', category: 'savory', price: 350, oldPrice: null, badge: 'Premium',
    images: [IMAGES.sandwichFajita],
    description: 'Fajita-style grilled sandwich with spiced chicken, peppers, and melted cheese.',
    details: { serving: '1 person', ingredients: 'Bread, Fajita Chicken, Peppers, Cheese', allergens: 'Gluten, Dairy', prepTime: '15 mins' },
    colors: ['Regular'], rating: 4.9, reviews: 145, inStock: true
  },
  {
    id: 'savory-003', name: "Stuff'd Roll", category: 'savory', price: 100, oldPrice: null, badge: null,
    images: [IMAGES.breadRoll],
    description: 'Soft bread roll stuffed with spiced potato and chicken filling. Great snack!',
    details: { weight: '120g', ingredients: 'Bread, Potato, Chicken, Spices', allergens: 'Gluten', prepTime: '10 mins' },
    colors: ['Single'], rating: 4.6, reviews: 89, inStock: true
  },
  {
    id: 'savory-004', name: 'Chicken Bread Large', category: 'savory', price: 350, oldPrice: null, badge: 'Bestseller',
    images: [IMAGES.chickenBread],
    description: 'Large chicken bread stuffed with creamy chicken filling. Party favorite!',
    details: { serves: '3-4 people', ingredients: 'Bread Dough, Chicken, Cream, Spices', allergens: 'Gluten, Dairy', prepTime: '25 mins' },
    colors: ['Large'], rating: 4.9, reviews: 234, inStock: true
  },
  {
    id: 'savory-005', name: 'Chicken Bread Small', category: 'savory', price: 250, oldPrice: null, badge: null,
    images: [IMAGES.chickenBread],
    description: 'Small chicken bread perfect for 1-2 people. Same great taste, smaller size!',
    details: { serves: '1-2 people', ingredients: 'Bread Dough, Chicken, Cream, Spices', allergens: 'Gluten, Dairy', prepTime: '20 mins' },
    colors: ['Small'], rating: 4.8, reviews: 156, inStock: true
  },
  {
    id: 'savory-006', name: 'Bread Kachori', category: 'savory', price: 120, oldPrice: null, badge: null,
    images: [IMAGES.samosa],
    description: 'Crispy bread kachori with spiced lentil filling. Traditional taste with a twist!',
    details: { weight: '100g', ingredients: 'Bread, Lentils, Spices', allergens: 'Gluten', prepTime: '10 mins' },
    colors: ['Single'], rating: 4.5, reviews: 67, inStock: true
  },
  {
    id: 'savory-007', name: 'Potato Vegie Pops', category: 'savory', price: 80, oldPrice: null, badge: null,
    images: [IMAGES.chickenPops],
    description: 'Crispy potato and vegetable balls. Perfect tea-time snack!',
    details: { quantity: '4 pieces', ingredients: 'Potato, Vegetables, Breadcrumbs', allergens: 'Gluten', prepTime: '10 mins' },
    colors: ['4 pcs'], rating: 4.6, reviews: 78, inStock: true
  },
  {
    id: 'savory-008', name: 'Chicken Pops', category: 'savory', price: 80, oldPrice: null, badge: 'Popular',
    images: [IMAGES.chickenPops],
    description: 'Crispy chicken balls with juicy filling. Kids favorite!',
    details: { quantity: '4 pieces', ingredients: 'Chicken, Breadcrumbs, Spices', allergens: 'Gluten', prepTime: '10 mins' },
    colors: ['4 pcs'], rating: 4.7, reviews: 112, inStock: true
  },
  {
    id: 'savory-009', name: 'Chicken ChocBar Sticks', category: 'savory', price: 80, oldPrice: null, badge: null,
    images: [IMAGES.chickenPops],
    description: 'Crispy chicken sticks - crunchy outside, tender inside. Great appetizer!',
    details: { quantity: '4 pieces', ingredients: 'Chicken, Breadcrumbs, Spices', allergens: 'Gluten', prepTime: '10 mins' },
    colors: ['4 pcs'], rating: 4.6, reviews: 65, inStock: true
  },
  {
    id: 'savory-010', name: 'Dynamite Chicken', category: 'savory', price: 500, oldPrice: null, badge: 'Premium',
    images: [IMAGES.dynamiteChicken],
    description: 'Spicy dynamite chicken with creamy sauce. Explosion of flavors!',
    details: { serves: '2-3 people', ingredients: 'Chicken, Mayo, Sriracha, Spices', allergens: 'Dairy, Eggs', prepTime: '20 mins' },
    colors: ['Regular'], rating: 4.9, reviews: 189, inStock: true
  },
  {
    id: 'savory-011', name: 'Bread Samosa', category: 'savory', price: 40, oldPrice: null, badge: 'Value',
    images: [IMAGES.samosa],
    description: 'Crispy bread samosa with spiced potato filling. Budget-friendly snack!',
    details: { weight: '60g', ingredients: 'Bread, Potato, Spices', allergens: 'Gluten', prepTime: '5 mins' },
    colors: ['Single'], rating: 4.5, reviews: 234, inStock: true
  },
  {
    id: 'savory-012', name: 'Zingy Parcel', category: 'savory', price: 80, oldPrice: null, badge: null,
    images: [IMAGES.samosa],
    description: 'Crispy parcel filled with zingy chicken. Tangy and delicious!',
    details: { weight: '100g', ingredients: 'Pastry, Chicken, Tangy Sauce', allergens: 'Gluten, Dairy', prepTime: '10 mins' },
    colors: ['Single'], rating: 4.6, reviews: 87, inStock: true
  }
];

const COLLECTIONS = [
  { id: 'cookies', name: 'Cookies', tagline: 'Freshly Baked', description: 'Classic, chocolate filled, red velvet & monster cookies!', image: IMAGES.cookieClassic, productCount: 4 },
  { id: 'brownies', name: 'Brownies', tagline: 'Fudgy & Rich', description: 'Dense, fudgy brownies. Try our Brownie Slab for parties!', image: IMAGES.brownieFudgy, productCount: 4 },
  { id: 'cupcakes', name: 'Cupcakes & Muffins', tagline: 'Sweet Delights', description: 'From Choco Lava to Oreo Bliss - fluffy cupcakes for every craving!', image: IMAGES.cupcakeChocolate, productCount: 7 },
  { id: 'savory', name: 'Savory Items', tagline: 'Hot & Fresh', description: 'Sandwiches, chicken bread, pops & more!', image: IMAGES.sandwichGrilled, productCount: 12 }
];
