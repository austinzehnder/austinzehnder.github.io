/* What's cookin', good lookin'? — shared couples meal planner.
 * Plain static front-end (GitHub Pages friendly, no build step).
 * All 26 recipes ported from the recipe pack, serves 2. */

var RECIPES = [
{ id: 1, name: "Miso Udon with Tofu and Spinach", cuisine: "Japanese", cuisineLabel: "Japanese", timeMin: 20, timeLabel: "20 min", effort: "easy", img: "assets/miso-udon.jpg",
  ingredients: ["2 servings frozen udon noodles", "4 cups water (or dashi)", "3 tbsp white miso paste", "1/2 block (7 oz) firm tofu, cubed", "3 cups baby spinach", "2 eggs", "2 cloves garlic, minced", "1 tbsp sesame oil"],
  steps: ["Bring a pot of water to a boil; lower eggs in and cook 6 1/2 minutes for jammy yolks. Ice bath, peel, halve.", "In a second pot, simmer the 4 cups water with garlic for 2 minutes.", "Ladle out 1 cup of the hot water into a bowl and whisk in the miso until smooth, then stir it back into the pot. Never boil after this or the miso turns bitter.", "Add tofu and udon; simmer 3 minutes until noodles separate.", "Stir in spinach until just wilted, about 1 minute. Finish with sesame oil.", "Divide into bowls and top each with an egg half."] },
{ id: 2, name: "Salmon Bowls", cuisine: "Japanese", cuisineLabel: "Japanese / poke-style", timeMin: 25, timeLabel: "25 min", effort: "easy", img: "assets/salmon-bowls.jpg",
  ingredients: ["1 1/2 cups rice, cooked in the rice cooker", "2 salmon fillets (about 5 oz each)", "3 tbsp soy sauce, plus more for the table", "1 avocado, sliced", "1/2 cucumber, half-moons", "1 tsp sesame seeds", "Optional sriracha mayo: 1/4 cup mayo + 1 tbsp sriracha"],
  steps: ["Start the rice cooker first — everything else fits inside its timer.", "Pat salmon dry, season with salt. Sear skin-side down in a hot oiled skillet 5 minutes, flip and cook 2 more minutes. (Or bake at 400°F for 12 minutes.)", "Slice cucumber and avocado while the salmon rests.", "Build bowls: rice, salmon broken into chunks, avocado, cucumber. Drizzle with soy sauce and sriracha mayo, sprinkle sesame seeds."] },
{ id: 3, name: "Salmon and Asparagus", cuisine: "Japanese", cuisineLabel: "Japanese", timeMin: 30, timeLabel: "30 min", effort: "easy", img: "assets/salmon-asparagus.jpg",
  ingredients: ["2 salmon fillets (about 5 oz each)", "1 bunch asparagus, tough ends snapped off", "3 tbsp butter, 2 cloves garlic (sliced), 1 lemon", "If she's not flexing: 2 extra Impossible patties for her"],
  steps: ["Sear salmon skin-side down in a hot oiled skillet 5 minutes; flip, cook 2 more. Rest on a plate.", "Same skillet: asparagus with a splash of water, covered, 3 minutes. Uncover, add butter and garlic, toss 2 minutes until garlic is golden.", "Squeeze half the lemon over everything; serve with lemon wedges."] },
{ id: 4, name: "Miso Ramen with Butter, Corn, and Tofu", cuisine: "Japanese", cuisineLabel: "Japanese", timeMin: 25, timeLabel: "25 min", effort: "easy", img: "assets/miso-ramen.jpg",
  ingredients: ["2 servings ramen noodles (fresh or dried; discard seasoning packets)", "4 cups water (or dashi)", "3 tbsp white miso paste + 1 tbsp red miso (or all white)", "1/2 block (7 oz) firm tofu, cubed", "1 cup corn kernels", "2 tbsp butter, plus more for serving", "2 cloves garlic + 1 tbsp ginger, minced", "2 cups baby spinach", "1 tbsp soy sauce, 1 tsp sesame oil", "Optional: 2 soft eggs"],
  steps: ["Sear the tofu in a hot oiled pot until golden on two sides; remove.", "Same pot: melt 1 tbsp butter and soften the garlic and ginger 1 minute.", "Add the water and bring to a bare simmer. Whisk the miso with a ladle of hot broth until smooth, then stir it back in — don't boil hard after this or the miso turns bitter.", "Add the noodles and cook per the package (3–4 minutes). Stir in the corn and spinach to warm through and wilt.", "Divide into bowls. Top each with tofu, a knob of butter, sesame oil, and soy sauce to taste. Add a soft egg if you like."] },
{ id: 5, name: "Mapo Tofu, Impossible-Beef Style", cuisine: "Chinese", cuisineLabel: "Chinese", timeMin: 30, timeLabel: "30 min", effort: "medium", img: "assets/mapo-tofu.jpg",
  ingredients: ["1 block (14 oz) firm tofu, cut in 3/4-inch cubes", "1/2 lb Impossible ground beef", "2 tbsp doubanjiang (spicy fermented bean paste)", "1 tbsp soy sauce, 1 tsp sugar", "2 cloves garlic + 1 tbsp ginger, minced", "1/2 cup water + 1 tsp cornstarch stirred into 2 tbsp cold water", "1/2 tsp ground Sichuan peppercorns", "1 1/2 cups jasmine rice, 3 cups broccoli florets"],
  steps: ["Start rice. Steam broccoli 5 minutes until bright green; set aside.", "Brown the Impossible in a wok or deep skillet over high heat, breaking it up, 4 minutes.", "Add garlic, ginger, and doubanjiang; fry 1 minute until fragrant.", "Pour in water, soy sauce, and sugar; slide in tofu. Simmer gently 5 minutes, spooning sauce over the tofu — don't stir hard or it breaks.", "Stir in the cornstarch slurry; simmer 1 minute until glossy. Shower with Sichuan pepper.", "Serve over rice with broccoli on the side."] },
{ id: 6, name: "Egg Fried Rice", cuisine: "Chinese", cuisineLabel: "Chinese", timeMin: 25, timeLabel: "25 min", effort: "easy", img: "assets/egg-fried-rice.jpg",
  ingredients: ["3 cups day-old cooked rice (fresh rice gets gummy)", "3 eggs, beaten", "1 cup corn kernels", "1 cup small broccoli florets", "2 cloves garlic, minced", "2 tbsp soy sauce, 1 tbsp sesame oil", "Austin add-on: 4 oz sausage, diced"],
  steps: ["Scramble the eggs in a hot wok with a little oil until just set; remove.", "Same wok: brown the sausage if using, then add broccoli and corn, stir-fry 3 minutes.", "Add garlic, then the rice, breaking up clumps with the spatula. Fry 3–4 minutes until grains separate and toast slightly.", "Stir in soy sauce around the edge of the wok so it sizzles, then fold the eggs back in. Finish with sesame oil."] },
{ id: 7, name: "Thai Basil Tofu with Green Beans", cuisine: "Thai", cuisineLabel: "Thai", timeMin: 25, timeLabel: "25 min", effort: "easy", img: "assets/thai-basil-tofu.jpg",
  ingredients: ["1 block (14 oz) firm tofu, pressed 10 min, cubed", "2 cups green beans, cut in 2-inch pieces", "3 cloves garlic, sliced", "2 tbsp soy sauce", "1 tbsp vegetarian stir-fry sauce (or oyster sauce)", "1 tsp sugar", "1 cup Thai basil leaves, loosely packed", "1 1/2 cups jasmine rice"],
  steps: ["Start rice. Sear tofu in a hot oiled wok until golden on two sides, about 6 minutes; remove.", "Same wok: stir-fry green beans 3 minutes until blistered, then garlic 30 seconds.", "Return tofu; add soy sauce, stir-fry sauce, and sugar. Toss 1 minute.", "Kill the heat and fold in the basil until just wilted. Serve over rice."] },
{ id: 8, name: "Pad Thai with Tofu and Egg", cuisine: "Thai", cuisineLabel: "Thai", timeMin: 35, timeLabel: "35 min", effort: "medium", img: "assets/pad-thai.jpg",
  ingredients: ["6 oz flat rice noodles", "1/2 block firm tofu, cubed", "2 eggs, beaten", "Sauce: 2 tbsp tamarind paste, 2 tbsp fish sauce, 2 tbsp brown sugar, 1 tbsp soy sauce", "2 cloves garlic, minced", "1/4 cup crushed roasted peanuts, lime wedges"],
  steps: ["Soak noodles in hot tap water 20 minutes until pliable but firm; drain. Stir sauce ingredients until sugar dissolves.", "Sear tofu in a hot wok until golden; push aside. Scramble eggs in the same wok; remove both.", "Add garlic to the wok 30 seconds, then noodles plus 1/4 cup water. Toss 2 minutes until soft.", "Pour in sauce, toss 2 minutes until absorbed. Fold tofu and eggs back in.", "Serve with peanuts and lime — squeeze the lime, don't skip it."] },
{ id: 9, name: "Bibimbap Bowls", cuisine: "Korean", cuisineLabel: "Korean", timeMin: 40, timeLabel: "40 min", effort: "involved", img: "assets/bibimbap.jpg",
  ingredients: ["1 1/2 cups rice", "4 cups baby spinach", "1 cup corn", "2 eggs", "1/2 block firm tofu, sliced (or 1/2 lb Impossible beef)", "3 cloves garlic, minced; 2 tbsp sesame oil", "Sauce: 2 tbsp gochujang, 1 tbsp sesame oil, 1 tsp sugar, 1 tsp water"],
  steps: ["Start rice. Sauté spinach with half the garlic and 1 tbsp sesame oil until wilted, 2 minutes; season with salt. Set aside.", "Sear tofu slices (or brown the Impossible) until crisp-edged.", "Warm the corn. Fry the eggs sunny-side up.", "Stir sauce ingredients together.", "Build bowls: rice, neat piles of spinach, corn, and tofu, fried egg on top, big spoonful of gochujang sauce. Mix at the table — that's the whole point."] },
{ id: 10, name: "Butter Paneer", cuisine: "Indian", cuisineLabel: "Indian", timeMin: 40, timeLabel: "40 min", effort: "involved", img: "assets/butter-paneer.jpg",
  ingredients: ["14 oz paneer, cut in 3/4-inch cubes", "1 can (28 oz) crushed tomatoes", "1/4 cup raw cashews, soaked in hot water 15 minutes", "4 tbsp butter, divided", "1 tbsp ginger + 4 cloves garlic, minced (or 2 tbsp ginger-garlic paste)", "1 tsp garam masala, 1 tsp Kashmiri chili powder (mild, mostly for color), 1/2 tsp turmeric, 1 tsp ground cumin", "1/2 cup heavy cream", "1 tsp kasuri methi (dried fenugreek leaves), crushed between your palms", "1 tsp sugar, salt", "Rice or naan, cilantro to finish"],
  steps: ["Simmer the crushed tomatoes, drained cashews, ginger, and garlic for 10 minutes. Blend until completely smooth.", "Melt 2 tbsp butter in the pot; add all the ground spices and fry 30 seconds until fragrant.", "Pour in the blended puree and simmer 10 minutes, until it thickens and butter glistens at the edges.", "Stir in the cream, kasuri methi, sugar, and salt to taste.", "Add the paneer and simmer gently 5 minutes — no longer, or it toughens. Swirl in the remaining 2 tbsp butter.", "Serve over rice or with warm naan, cilantro on top."] },
{ id: 11, name: "Paneer Tikka Masala", cuisine: "Indian", cuisineLabel: "Indian", timeMin: 45, timeLabel: "45 min", effort: "involved", img: "assets/paneer-tikka-masala.jpg",
  ingredients: ["14 oz paneer, cut in 3/4-inch cubes", "Marinade: 3/4 cup plain yogurt, 1 tbsp tandoori masala (or 2 tsp garam masala + 1 tsp chili powder + 1 tsp cumin), 1 tsp grated ginger, 2 cloves garlic (minced), juice of 1/2 lemon, 1 tbsp oil, salt", "Gravy: 1 can (28 oz) crushed tomatoes, 2 tbsp butter, 1 tbsp ginger-garlic, 1 tsp garam masala, 1/2 tsp turmeric, 1/2 cup cream, 1 tsp kasuri methi, salt, pinch of sugar", "Rice or naan, cilantro"],
  steps: ["Toss the paneer with all the marinade ingredients and rest 15 minutes (or a few hours in the fridge).", "Broil on a foil-lined sheet 8–10 minutes, turning once, until charred at the edges.", "Meanwhile simmer the crushed tomatoes with the ginger-garlic 8 minutes; blend smooth.", "Melt the butter, bloom the garam masala and turmeric 30 seconds; add the puree and simmer 8 minutes.", "Stir in the cream, kasuri methi, sugar, and salt. Fold in the charred paneer and simmer 5 minutes.", "Serve with rice or naan, cilantro on top."] },
{ id: 12, name: "Impossible Picadillo Tacos", cuisine: "Mexican", cuisineLabel: "Mexican", timeMin: 30, timeLabel: "30 min", effort: "medium", img: "assets/picadillo-tacos.jpg",
  ingredients: ["1 lb Impossible ground beef", "1 tbsp chili powder, 2 tsp cumin, 1 tsp garlic powder, 1/2 tsp oregano, salt", "1/4 cup water", "8 corn tortillas", "1 avocado, sliced; 1 lime, wedges; cilantro; 1 cup charred corn"],
  steps: ["Brown the Impossible over high heat, breaking it up, 5 minutes.", "Stir in all the spices plus salt; fry 1 minute. Add water and simmer 3 minutes until it clings.", "Char tortillas directly over a gas burner 20 seconds per side (or in a dry skillet).", "Set out everything and build tacos: meat, avocado, corn, cilantro, lime."] },
{ id: 13, name: "Spinach, Corn and Cheese Quesadillas", cuisine: "Mexican", cuisineLabel: "Mexican", timeMin: 20, timeLabel: "20 min", effort: "easy", img: "assets/quesadillas.jpg",
  ingredients: ["4 large flour tortillas", "1 1/2 cups shredded mozzarella-cheddar mix", "2 cups spinach, chopped", "1 cup corn", "1/2 tsp cumin", "Avocado crema: 1 avocado, 1/4 cup sour cream, juice of 1/2 lime, salt"],
  steps: ["Mash crema ingredients in a bowl; season with salt.", "On half of each tortilla, layer cheese, spinach, corn, cumin, and more cheese (cheese on both sides glues it shut). Fold.", "Griddle in a lightly oiled skillet 3 minutes per side until golden and melted.", "Rest 1 minute, cut in wedges, serve with crema."] },
{ id: 14, name: "Loaded Baked Potatoes", cuisine: "Mexican", cuisineLabel: "Mexican-ish", timeMin: 60, timeLabel: "60 min, mostly hands-off", effort: "medium", img: "assets/loaded-baked-potatoes.jpg",
  ingredients: ["2 large russet potatoes", "1/2 block (7 oz) firm tofu", "2 tsp chili powder, 1 tsp cumin, 1/2 tsp garlic powder, 1/2 tsp oregano, salt", "1 cup corn kernels", "2 cups spinach", "1/3 cup crumbled cotija cheese", "Cilantro, sour cream, lime wedges"],
  steps: ["Heat oven to 400°F. Prick potatoes, rub with oil and salt, and bake directly on the rack 50–60 minutes until a knife slides in easily.", "While they bake: crumble the tofu into a hot oiled skillet. Season with the spices and fry, breaking it up, 8–10 minutes until browned and crisp at the edges.", "In the last 2 minutes, stir in the corn to warm through, then the spinach to wilt.", "Split the potatoes open and fluff with a fork. Load with the tofu mixture, cotija, cilantro, sour cream, and a squeeze of lime."] },
{ id: 15, name: "Pasta with Red Sauce and Garlic Bread", cuisine: "Italian", cuisineLabel: "Italian", timeMin: 20, timeLabel: "20 min", effort: "easy", img: "assets/pasta-red-sauce.jpg",
  ingredients: ["8 oz spaghetti", "1 can (28 oz) crushed tomatoes (or 1 jar of your favorite marinara, for the truly lazy night)", "4 cloves garlic, thinly sliced, plus 2 cloves for the bread", "3 tbsp olive oil, 1 tsp dried oregano", "Fresh basil and grated parmesan, to finish", "Garlic bread: 1 baguette or loaf of Italian bread, 4 tbsp butter (softened), salt"],
  steps: ["Heat oven to 400°F. Mash the softened butter with the 2 minced garlic cloves and a pinch of salt; spread thickly on the halved baguette. Bake 10 minutes until golden at the edges.", "Meanwhile warm the olive oil in a pot and soften the sliced garlic 1 minute — don't brown it.", "Add the crushed tomatoes and oregano; simmer 12–15 minutes until slightly thickened. Season with salt.", "Boil the spaghetti in well-salted water until al dente; toss with the sauce.", "Serve with torn basil, parmesan, and the garlic bread."] },
{ id: 16, name: "Pasta with Impossible Beef and Red Sauce", cuisine: "Italian", cuisineLabel: "Italian", timeMin: 30, timeLabel: "30 min", effort: "medium", img: "assets/pasta-impossible-beef.jpg",
  ingredients: ["8 oz penne (or rigatoni — the tubes hold the sauce)", "1 lb Impossible ground beef", "1 can (28 oz) crushed tomatoes", "4 cloves garlic, minced, 3 tbsp olive oil", "1 tsp dried oregano, 1/2 tsp chili flakes (optional)", "Fresh basil and grated parmesan, to finish"],
  steps: ["Brown the Impossible in a deep skillet or pot over high heat, breaking it up, 5–6 minutes.", "Add the garlic (and chili flakes if using); fry 1 minute.", "Pour in the crushed tomatoes and oregano; simmer 12–15 minutes, stirring now and then, until rich and thick.", "Boil the penne in well-salted water until al dente; toss with the sauce, loosening with pasta water if needed.", "Serve with torn basil and lots of parmesan."] },
{ id: 17, name: "Pesto Pasta with Green Beans and Potatoes", cuisine: "Italian", cuisineLabel: "Italian", timeMin: 30, timeLabel: "30 min", effort: "easy", img: "assets/pesto-pasta.jpg",
  ingredients: ["8 oz short pasta (penne, fusilli)", "2 small potatoes, 1/2-inch dice", "1 cup green beans, 1-inch pieces", "1/3 cup basil pesto", "1/2 cup grated parmesan, plus olive oil"],
  steps: ["Boil potatoes in salted water 5 minutes. Add green beans; 3 minutes later add the pasta. Cook until the pasta is done.", "Reserve 1 cup pasta water, then drain.", "Toss everything with pesto and parmesan, loosening with splashes of pasta water until glossy.", "Finish with olive oil and extra parmesan at the table."] },
{ id: 18, name: "Carbonara", cuisine: "Italian", cuisineLabel: "Italian", timeMin: 25, timeLabel: "25 min", effort: "medium", img: "assets/carbonara.jpg",
  ingredients: ["8 oz spaghetti", "4 oz bacon or pancetta, diced", "2 eggs + 1 yolk, room temperature", "3/4 cup finely grated parmesan, plus more to serve", "Lots of cracked black pepper", "Hers: skip the bacon; add 2 cloves garlic, minced, and extra parmesan"],
  steps: ["Crisp the bacon in a cold-start skillet over medium heat, 8 minutes. (Hers: soften garlic in olive oil 2 minutes instead.)", "Boil pasta in well-salted water until just shy of al dente; reserve 1 1/2 cups pasta water.", "Whisk eggs, yolk, parmesan, and a blizzard of pepper in a bowl.", "Off the heat: toss pasta with bacon (and its fat), then pour in the egg mixture, tossing constantly and loosening with pasta water until it turns into a silky sauce. The pan must be off the heat or the eggs scramble.", "Serve immediately with more parmesan and pepper."] },
{ id: 19, name: "Creamy Polenta with Sausage and Broccoli", cuisine: "Italian", cuisineLabel: "Italian", timeMin: 40, timeLabel: "40 min", effort: "involved", img: "assets/polenta-sausage.jpg",
  ingredients: ["1 cup polenta (not instant)", "4 cups water (or half milk for richer)", "2 tbsp butter, 1/2 cup grated parmesan", "2 Italian pork sausages (hers: 2 Impossible sausages, or skip)", "3 cups broccoli florets, 2 cloves garlic, olive oil"],
  steps: ["Simmer the water with 1 tsp salt; whisk in polenta. Cook on low 30 minutes, stirring often — tag-team this, it's the perfect two-person job. It should be thick and creamy.", "Meanwhile roast broccoli with garlic and olive oil at 400°F for 20 minutes. Brown sausages in a skillet, 12 minutes, turning.", "Stir butter and parmesan into the polenta; season with salt.", "Bowl it up: polenta, sliced sausage, broccoli, extra parmesan."] },
{ id: 20, name: "Sheet-Pan Gnocchi with Brussels Sprouts", cuisine: "Italian", cuisineLabel: "Italian", timeMin: 30, timeLabel: "30 min", effort: "easy", img: "assets/sheet-pan-gnocchi.jpg",
  ingredients: ["1 lb shelf-stable potato gnocchi", "3 cups brussels sprouts, halved", "3 tbsp olive oil, 3 cloves garlic (smashed), salt and pepper", "8 Impossible nuggets and/or 2 sausage links, sliced (pick your protein)", "1/2 cup grated parmesan"],
  steps: ["Heat oven to 425°F. Toss gnocchi, sprouts, garlic, oil, salt, and pepper directly on a sheet pan — no need to boil the gnocchi first.", "Add nuggets (or sausage) to the pan. Roast 20–25 minutes, flipping once, until gnocchi are crisp-edged and sprouts are charred.", "Shower with parmesan and serve straight off the pan."] },
{ id: 21, name: "Broccoli-Cheddar Frittata", cuisine: "Italian", cuisineLabel: "Italian-ish", timeMin: 35, timeLabel: "35 min", effort: "medium", img: "assets/broccoli-frittata.jpg",
  ingredients: ["8 eggs", "2 cups small broccoli florets", "1 cup shredded cheddar", "1 cup potato, small dice", "2 cloves garlic, minced; butter or oil"],
  steps: ["Heat oven to 375°F. Sauté potato in an oven-safe skillet with oil 8 minutes until nearly tender. Add broccoli and garlic; 3 more minutes.", "Whisk eggs with half the cheddar, salt, and pepper; pour over the veg. Top with remaining cheddar.", "Bake 12–15 minutes until just set in the center. Rest 5 minutes, slice in wedges.", "Great with toast or a simple green side."] },
{ id: 22, name: "Impossible Smash Burgers + Crispy Potato Wedges", cuisine: "American", cuisineLabel: "American", timeMin: 35, timeLabel: "35 min", effort: "medium", img: "assets/smash-burgers.jpg",
  ingredients: ["1 lb Impossible ground beef (or 4 preformed patties)", "4 brioche buns, 4 slices cheddar", "1 avocado, sliced", "2 russets, cut in wedges; olive oil, salt", "Toppings: keep it to avocado, pickles, ketchup, mustard, mayo"],
  steps: ["Heat oven to 425°F. Toss wedges with oil and salt; roast 30 minutes, flipping once.", "Divide Impossible into 4 loose balls. Heat a cast-iron skillet ripping hot; smash each ball flat with a spatula and hold 10 seconds. Season, cook 2 minutes, flip, top with cheddar, 1 more minute.", "Toast buns in the burger fat. Assemble: sauce, patty, avocado, pickles."] },
{ id: 23, name: "Steak Frites Night", cuisine: "American", cuisineLabel: "French-American", timeMin: 45, timeLabel: "45 min", effort: "medium", img: "assets/steak-frites.jpg",
  ingredients: ["2 steaks (ribeye or NY strip, about 10 oz each), room temperature", "2 russets, cut in fries, soaked 20 min in cold water and patted dry", "Aioli: 1/3 cup mayo, 1 clove garlic (grated), squeeze of lemon, salt", "Hers: 2 Impossible burger patties as her \"steak\"", "Side: steamed broccoli"],
  steps: ["Heat oven to 425°F. Toss fries with oil and salt; roast 35 minutes, flipping once, until crisp.", "Stir aioli ingredients together; chill.", "Sear steaks in a ripping-hot oiled skillet 3–4 minutes per side for medium-rare; rest 5 minutes. (Her patties: 3 minutes per side.)", "Slice steak against the grain. Plate with fries, broccoli, and aioli for dipping."] },
{ id: 24, name: "Impossible Shepherd's Pie", cuisine: "American", cuisineLabel: "American", timeMin: 55, timeLabel: "55 min, mostly hands-off", effort: "involved", img: "assets/shepherds-pie.jpg",
  ingredients: ["1 lb Impossible ground beef", "1 cup corn kernels, 1 cup green beans (cut in 1-inch pieces)", "2 cloves garlic, minced; 1 tsp dried thyme", "1 tbsp soy sauce, 1/2 cup vegetable broth + 1 tsp cornstarch", "2 lbs russet potatoes, peeled and quartered", "3 tbsp butter, 1/3 cup milk, salt and pepper", "1/2 cup shredded cheddar"],
  steps: ["Heat oven to 400°F. Boil potatoes in salted water 15–18 minutes until fork-tender; drain and mash with butter, milk, salt, and pepper until smooth.", "Meanwhile brown the Impossible in an oven-safe skillet, breaking it up, 5 minutes. Add garlic, thyme, corn, and green beans; cook 3 minutes.", "Stir in soy sauce and the broth-cornstarch mixture; simmer 3 minutes until thickened.", "Spread the mash over the filling, roughing the top with a fork so it crisps. Sprinkle with cheddar.", "Bake 20 minutes until the top is golden. Rest 5 minutes before scooping."] },
{ id: 25, name: "Dump-and-Bake Broccoli Mac and Cheese", cuisine: "American", cuisineLabel: "American", timeMin: 40, timeLabel: "40 min, mostly hands-off", effort: "medium", img: "assets/broccoli-mac-cheese.jpg",
  ingredients: ["8 oz elbow macaroni (about 2 cups, uncooked)", "2 cups milk, 1 cup water", "2 cups small broccoli florets", "2 cups shredded sharp cheddar, 1/2 cup shredded mozzarella", "1 tsp mustard powder, 1/2 tsp garlic powder, 1 tsp salt, black pepper", "2 tbsp butter, 1/3 cup panko breadcrumbs (optional but good)", "Austin add-on: 4 oz cooked sausage, diced"],
  steps: ["Heat oven to 375°F. In a 9x13 baking dish, whisk the milk, water, mustard powder, garlic powder, salt, and pepper.", "Stir in the uncooked macaroni and broccoli. Dot with butter. Cover tightly with foil.", "Bake 25 minutes. Remove the foil and stir well — the pasta will have absorbed most of the liquid.", "Stir in 1 1/2 cups of the cheddar and all the mozzarella until melty. Top with the remaining cheddar and the panko.", "Bake uncovered 12–15 minutes until bubbly and golden. Rest 5 minutes. (Stir his diced sausage into his portion at the table.)"] },
{ id: 26, name: "Impossible Nuggets with Roasted Broccoli and Parmesan", cuisine: "American", cuisineLabel: "American", timeMin: 25, timeLabel: "25 min", effort: "easy", img: "assets/impossible-nuggets.jpg",
  ingredients: ["16–20 Impossible nuggets (about 2 servings)", "4 cups broccoli florets", "3 tbsp olive oil, 2 cloves garlic (minced)", "1/3 cup grated parmesan, plus more to finish", "Salt, pepper, 1 lemon wedge", "Dipping sauces: ketchup, BBQ sauce, sriracha mayo (1/4 cup mayo + 1 tbsp sriracha)"],
  steps: ["Heat oven to 425°F. Toss the broccoli with olive oil, garlic, salt, and pepper on a sheet pan.", "Arrange the nuggets on the same pan (or a second one). Bake 12–15 minutes, flipping the nuggets once, until crispy and the broccoli is charred at the edges.", "Shower the broccoli with parmesan and a squeeze of lemon right out of the oven.", "Serve with the dipping sauces."] },
];

var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var SPECIALS = {
  leftovers: { name: "Leftovers", img: "assets/leftovers.jpg" },
  "eating-out": { name: "Eating Out", img: "assets/eating-out.jpg" }
};
var EFFORT_ORDER = { easy: 0, medium: 1, involved: 2 };

/* ---------------- state ---------------- */

/* Weeks are keyed by their Monday (ISO date, YYYY-MM-DD). Each week is its
   own record — past weeks are kept, never overwritten. Either partner can
   load and save any week's record (no viewer role); the sync adapter owns
   where those records live. */

function mondayOf(d) {
  var date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var diff = (date.getDay() + 6) % 7; // days since Monday
  date.setDate(date.getDate() - diff);
  return date;
}
function toISODate(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function thisWeekStart() { return toISODate(mondayOf(new Date())); }
function addDaysISO(iso, n) {
  var p = iso.split("-");
  var d = new Date(+p[0], +p[1] - 1, +p[2]);
  d.setDate(d.getDate() + n);
  return toISODate(d);
}
function weekLabel(iso) {
  var p = iso.split("-");
  var d = new Date(+p[0], +p[1] - 1, +p[2]);
  return "Week of " + d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}
/* Calendar date for a day of the viewed week: idx 0 = Monday .. 6 = Sunday.
   Weeks always run Monday through Sunday, keyed by the Monday start date. */
function dateForDayIndex(idx) {
  var p = currentWeekStart.split("-");
  var d = new Date(+p[0], +p[1] - 1, +p[2]);
  d.setDate(d.getDate() + idx);
  return d;
}
function shortDate(d) {
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

var currentWeekStart = thisWeekStart();
var weekState = { assignments: {}, checked: [] };

function defaultState() {
  var a = {};
  DAYS.forEach(function (d) { a[d] = null; });
  return { assignments: a, checked: [] };
}

function saveWeek() {
  WeekSync.saveWeek(currentWeekStart, weekState);
  renderWeekNav(); // keep the past-weeks picker in step with newly saved weeks
}

async function loadWeek(weekStart) {
  weekStart = weekStart || currentWeekStart;
  currentWeekStart = weekStart;
  var saved = await WeekSync.loadWeek(weekStart);
  if (saved && saved.assignments) {
    weekState = saved;
    if (!Array.isArray(weekState.checked)) weekState.checked = [];
    DAYS.forEach(function (d) { if (!(d in weekState.assignments)) weekState.assignments[d] = null; });
  } else {
    weekState = defaultState();
  }
}

async function switchWeek(weekStart) {
  await loadWeek(weekStart);
  renderWeekNav();
  renderPlanner();
  renderGrocery();
}

async function renderWeekNav() {
  $("weekLabel").textContent = weekLabel(currentWeekStart)
    + (currentWeekStart === thisWeekStart() ? " (this week)" : "");
  var weeks = await WeekSync.listWeeks();
  if (weeks.indexOf(currentWeekStart) === -1) weeks.push(currentWeekStart);
  weeks.sort().reverse();
  var sel = $("pastWeeksSelect");
  sel.innerHTML = weeks.map(function (w) {
    return '<option value="' + w + '"' + (w === currentWeekStart ? " selected" : "") + ">"
      + weekLabel(w) + (w === thisWeekStart() ? " (this week)" : "") + "</option>";
  }).join("");
  /* Keep the date picker in step with the week being viewed. */
  var jump = $("weekJumpDate");
  if (jump) jump.value = currentWeekStart;
}

/* ---------------- helpers ---------------- */

function $(id) { return document.getElementById(id); }
function recipeById(id) { return RECIPES.filter(function (r) { return r.id === id; })[0]; }
function assignmentLabel(a) {
  if (!a) return null;
  if (a.kind === "recipe") { var r = recipeById(a.id); return r ? r.name : null; }
  return SPECIALS[a.special] ? SPECIALS[a.special].name : null;
}
function assignmentImg(a) {
  if (a.kind === "recipe") { var r = recipeById(a.id); return r ? r.img : ""; }
  return SPECIALS[a.special] ? SPECIALS[a.special].img : "";
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
var toastTimer = null;
function toast(msg) {
  var t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
}

/* ---------------- recipes view ---------------- */

var CUISINE_ORDER = ["Japanese", "Chinese", "Thai", "Korean", "Indian", "Mexican", "Italian", "American"];

function filteredRecipes() {
  var q = $("search").value.trim().toLowerCase();
  var cuisine = $("cuisineFilter").value;
  var time = $("timeFilter").value;
  var sort = $("sortSelect").value;
  var list = RECIPES.filter(function (r) {
    if (cuisine && r.cuisine !== cuisine) return false;
    if (time === "25" && r.timeMin > 25) return false;
    if (time === "30" && (r.timeMin < 30 || r.timeMin > 35)) return false;
    if (time === "40" && (r.timeMin < 40 || r.timeMin > 45)) return false;
    if (time === "50" && r.timeMin < 50) return false;
    if (q) {
      var hay = (r.name + " " + r.cuisineLabel + " " + r.ingredients.join(" ")).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  });
  if (sort === "az") list.sort(function (a, b) { return a.name.localeCompare(b.name); });
  else if (sort === "time") list.sort(function (a, b) { return a.timeMin - b.timeMin || a.name.localeCompare(b.name); });
  else if (sort === "effort") list.sort(function (a, b) { return EFFORT_ORDER[a.effort] - EFFORT_ORDER[b.effort] || a.timeMin - b.timeMin; });
  else list.sort(function (a, b) { return CUISINE_ORDER.indexOf(a.cuisine) - CUISINE_ORDER.indexOf(b.cuisine) || a.name.localeCompare(b.name); });
  return list;
}

function renderRecipes() {
  var list = filteredRecipes();
  var grid = $("recipeGrid");
  $("noResults").style.display = list.length ? "none" : "block";
  grid.innerHTML = list.map(function (r) {
    return '<div class="card" data-id="' + r.id + '">'
      + '<img src="' + r.img + '" alt="' + esc(r.name) + '" loading="lazy" onerror="this.style.display=\'none\'">'
      + '<div class="card-body"><h3>' + esc(r.name) + '</h3>'
      + '<div class="meta">' + esc(r.cuisineLabel) + ' · ' + esc(r.timeLabel) + '</div>'
      + '<span class="badge ' + r.effort + '">' + (r.effort === "easy" ? "Easy" : r.effort === "medium" ? "Medium" : "Involved") + '</span>'
      + '</div></div>';
  }).join("");
  grid.querySelectorAll(".card").forEach(function (el) {
    el.addEventListener("click", function () { openRecipe(parseInt(el.getAttribute("data-id"), 10)); });
  });
}

/* ---------------- recipe modal / add to week ---------------- */

var currentRecipeId = null;

function openRecipe(id) {
  var r = recipeById(id);
  if (!r) return;
  currentRecipeId = id;
  $("modalImg").src = r.img;
  $("modalImg").alt = r.name;
  $("modalName").textContent = r.name;
  $("modalMeta").textContent = r.cuisineLabel + " · " + r.timeLabel;
  $("modalIngredients").innerHTML = r.ingredients.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");
  $("modalSteps").innerHTML = r.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
  $("dayPicker").style.display = "none";
  $("dayPicker").innerHTML = "";
  $("recipeModal").classList.add("open");
}

function closeRecipe() { $("recipeModal").classList.remove("open"); }

function showDayPicker() {
  var picker = $("dayPicker");
  picker.style.display = "grid";
  picker.innerHTML = DAYS.map(function (day, idx) {
    var a = weekState.assignments[day];
    var label = a ? assignmentLabel(a) : "Open";
    return '<button data-day="' + day + '"' + (a ? " disabled" : "") + '>' + shortDate(dateForDayIndex(idx))
      + '<small>' + (a ? esc(label) + " — clear it in the planner first" : "Open") + '</small></button>';
  }).join("");
  picker.querySelectorAll("button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var day = btn.getAttribute("data-day");
      var r = recipeById(currentRecipeId);
      weekState.assignments[day] = { kind: "recipe", id: currentRecipeId };
      saveWeek();
      renderPlanner();
      renderGrocery();
      closeRecipe();
      toast(r.name + " added to " + day);
    });
  });
}

/* ---------------- planner: add / change from the planner tab ---------------- */

var mealPickerDay = null;

function showMealPicker(day) {
  mealPickerDay = day;
  $("mealPickerTitle").textContent = "Pick dinner for " + day;
  var rows = RECIPES.map(function (r) {
    return '<button data-recipe="' + r.id + '"><img src="' + r.img + '" alt="" onerror="this.style.display=\'none\'">'
      + '<span>' + esc(r.name) + '<br><small>' + esc(r.cuisineLabel) + ' · ' + esc(r.timeLabel) + '</small></span></button>';
  }).join("");
  rows += '<button data-special="leftovers"><img src="' + SPECIALS.leftovers.img + '" alt="" onerror="this.style.display=\'none\'">'
    + '<span>Leftovers<br><small>Night off cooking</small></span></button>';
  rows += '<button data-special="eating-out"><img src="' + SPECIALS["eating-out"].img + '" alt="" onerror="this.style.display=\'none\'">'
    + '<span>Eating Out<br><small>Night out</small></span></button>';
  $("mealPickerList").innerHTML = rows;
  $("mealPickerList").querySelectorAll("button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var day = mealPickerDay;
      var assignment, label;
      if (btn.hasAttribute("data-recipe")) {
        var r = recipeById(parseInt(btn.getAttribute("data-recipe"), 10));
        assignment = { kind: "recipe", id: r.id };
        label = r.name;
      } else {
        var special = btn.getAttribute("data-special");
        assignment = { kind: "special", special: special };
        label = SPECIALS[special].name;
      }
      weekState.assignments[day] = assignment;
      saveWeek();
      renderPlanner();
      renderGrocery();
      closeMealPicker();
      toast(label + " set for " + day);
    });
  });
  $("mealPickerModal").classList.add("open");
}

function closeMealPicker() {
  $("mealPickerModal").classList.remove("open");
  mealPickerDay = null;
}

/* ---------------- planner ---------------- */

function renderPlanner() {
  var grid = $("plannerGrid");
  var anyPlanned = DAYS.some(function (d) { return !!weekState.assignments[d]; });
  $("plannerHint").style.display = anyPlanned ? "none" : "block";
  grid.innerHTML = DAYS.map(function (day, idx) {
    var a = weekState.assignments[day];
    var dateStr = shortDate(dateForDayIndex(idx));
    if (!a) {
      return '<div class="day-card empty"><div class="day-body"><h3>' + dateStr + '</h3>'
        + '<div class="empty-note">Nothing planned yet</div>'
        + '<div style="margin-top:10px"><button class="btn" data-add="' + day + '">Add dinner</button></div></div></div>';
    }
    var label = assignmentLabel(a);
    var time = "";
    if (a.kind === "recipe") { var r = recipeById(a.id); time = r ? r.timeLabel : ""; }
    return '<div class="day-card"><img src="' + assignmentImg(a) + '" alt="' + esc(label) + '" onerror="this.style.display=\'none\'">'
      + '<div class="day-body"><h3>' + dateStr + '</h3>'
      + '<div class="dish">' + esc(label) + '</div>'
      + (time ? '<div class="meta">' + esc(time) + '</div>' : "")
      + '<div style="margin-top:10px"><button class="btn secondary" data-change="' + day + '">Change</button> '
      + '<button class="btn danger" data-clear="' + day + '">Clear</button></div>'
      + '</div></div>';
  }).join("");
  grid.querySelectorAll("[data-clear]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var day = btn.getAttribute("data-clear");
      weekState.assignments[day] = null;
      saveWeek();
      renderPlanner();
      renderGrocery();
    });
  });
  grid.querySelectorAll("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showMealPicker(btn.getAttribute("data-add"));
    });
  });
  grid.querySelectorAll("[data-change]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showMealPicker(btn.getAttribute("data-change"));
    });
  });
  renderCalendar();
}

function randomizeWeek() {
  var pool = RECIPES.slice();
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
  }
  var days = DAYS.slice();
  for (var k = days.length - 1; k > 0; k--) {
    var m = Math.floor(Math.random() * (k + 1));
    var tmp = days[k]; days[k] = days[m]; days[m] = tmp;
  }
  var chosen = pool.slice(0, 5);
  weekState.assignments = {};
  days.forEach(function (day, idx) {
    if (idx < 5) weekState.assignments[day] = { kind: "recipe", id: chosen[idx].id };
    else if (idx === 5) weekState.assignments[day] = { kind: "special", special: "leftovers" };
    else weekState.assignments[day] = { kind: "special", special: "eating-out" };
  });
  saveWeek();
  renderPlanner();
  renderGrocery();
  toast("Week randomized: 5 dinners, leftovers, and a night out");
}

/* ---------------- grocery ---------------- */

var UNITS = ["cup", "cups", "tbsp", "tsp", "oz", "lb", "lbs", "clove", "cloves", "can", "cans", "block", "blocks", "bunch", "bunches", "slice", "slices", "stalk", "stalks", "head", "bag", "box", "pack", "piece", "pieces"];

function parseAmount(str) {
  var m = str.match(/^(\d+)\s+(\d+)\/(\d+)/);
  if (m) return parseInt(m[1], 10) + parseInt(m[2], 10) / parseInt(m[3], 10);
  m = str.match(/^(\d+)\/(\d+)/);
  if (m) return parseInt(m[1], 10) / parseInt(m[2], 10);
  m = str.match(/^(\d+(?:\.\d+)?)/);
  if (m) return parseFloat(m[1]);
  return null;
}

function formatAmount(n) {
  var fracs = [[0.25, "1/4"], [1 / 3, "1/3"], [0.5, "1/2"], [2 / 3, "2/3"], [0.75, "3/4"]];
  var whole = Math.floor(n + 1e-6);
  var rem = n - whole;
  for (var i = 0; i < fracs.length; i++) {
    if (Math.abs(rem - fracs[i][0]) < 0.06) {
      return (whole ? whole + " " : "") + fracs[i][1];
    }
  }
  if (Math.abs(rem) < 0.06) return String(whole);
  return (Math.round(n * 10) / 10).toString();
}

/* Split a recipe ingredient line into shoppable pieces, e.g.
   "3 tbsp butter, 2 cloves garlic (sliced), 1 lemon" -> 3 pieces. */
function splitLine(line) {
  var parts = line.split(/,\s*(?=\d)/);
  var out = [];
  parts.forEach(function (p) {
    p.split(/\s*\+\s*/).forEach(function (q) {
      q = q.trim();
      if (q) out.push(q);
    });
  });
  return out;
}

function parsePiece(piece) {
  var amount = parseAmount(piece);
  var rest = piece.replace(/^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)\s*/, "");
  var unit = "";
  var first = rest.split(/\s+/)[0] || "";
  if (UNITS.indexOf(first.toLowerCase()) !== -1) {
    unit = first.toLowerCase();
    rest = rest.slice(first.length).trim();
  }
  var item = rest.replace(/\([^)]*\)/g, "").replace(/,.*$/, "").trim().toLowerCase().replace(/\s+/g, " ");
  if (!item) item = piece.toLowerCase();
  return { amount: amount, unit: unit, item: item, raw: piece };
}

function combinedGrocery() {
  var groups = {};
  var order = [];
  plannedRecipes().forEach(function (r) {
    r.ingredients.forEach(function (line) {
      splitLine(line).forEach(function (piece) {
        var p = parsePiece(piece);
        if (!groups[p.item]) { groups[p.item] = { item: p.item, amounts: [] }; order.push(p.item); }
        var g = groups[p.item];
        var merged = false;
        for (var i = 0; i < g.amounts.length; i++) {
          var a = g.amounts[i];
          if (a.unit === p.unit && a.value !== null && p.amount !== null) {
            a.value += p.amount; merged = true; break;
          }
        }
        if (!merged) g.amounts.push({ unit: p.unit, value: p.amount, raw: p.raw });
      });
    });
  });
  return order.map(function (key) {
    var g = groups[key];
    var text = g.amounts.map(function (a) {
      if (a.value !== null) return (formatAmount(a.value) + (a.unit ? " " + a.unit : "")).trim();
      return a.raw;
    }).join(" + ");
    return { key: key, label: text + " " + key };
  });
}

function plannedRecipes() {
  var out = [];
  DAYS.forEach(function (day) {
    var a = weekState.assignments[day];
    if (a && a.kind === "recipe") { var r = recipeById(a.id); if (r) out.push(r); }
  });
  return out;
}

function renderGrocery() {
  var combined = combinedGrocery();
  var recipes = plannedRecipes();
  $("groceryEmpty").style.display = recipes.length ? "none" : "block";
  var box = $("groceryCombined");
  box.innerHTML = combined.map(function (g) {
    var checked = weekState.checked.indexOf(g.key) !== -1;
    return '<div class="grocery-item' + (checked ? " checked" : "") + '">'
      + '<label>' + esc(g.label) + '</label>'
      + '<input type="checkbox" data-key="' + esc(g.key) + '"' + (checked ? " checked" : "") + '></div>';
  }).join("");
  box.querySelectorAll("input[type=checkbox]").forEach(function (cb) {
    cb.addEventListener("change", function () {
      var key = cb.getAttribute("data-key");
      var idx = weekState.checked.indexOf(key);
      if (cb.checked && idx === -1) weekState.checked.push(key);
      if (!cb.checked && idx !== -1) weekState.checked.splice(idx, 1);
      saveWeek();
      cb.closest(".grocery-item").classList.toggle("checked", cb.checked);
    });
  });
  var bd = $("groceryBreakdown");
  if (!recipes.length) { bd.innerHTML = ""; return; }
  bd.innerHTML = "<h2>What each recipe needs</h2>" + recipes.map(function (r) {
    return "<h3>" + esc(r.name) + "</h3><ul>"
      + r.ingredients.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
  }).join("");
}

/* Exports: ONLY unchecked shopping items — no meal names, no breakdown. */
function exportText() {
  var combined = combinedGrocery();
  var lines = combined
    .filter(function (g) { return weekState.checked.indexOf(g.key) === -1; })
    .map(function (g) { return g.label; });
  return lines.join("\n");
}

function copyTextToClipboard(text, okMsg) {
  function done() { toast(okMsg); }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, okMsg); });
  } else fallbackCopy(text, okMsg);
}
function fallbackCopy(text, okMsg) {
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(ta);
  toast(okMsg);
}
function shareText(text, okMsg) {
  if (navigator.share) {
    navigator.share({ text: text }).catch(function () {});
  } else {
    copyTextToClipboard(text, okMsg);
  }
}

/* ---------------- copy week image ---------------- */

function wrapText(ctx, text, maxWidth) {
  var words = text.split(" ");
  var lines = [];
  var line = "";
  words.forEach(function (w) {
    var test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
    else line = test;
  });
  if (line) lines.push(line);
  return lines;
}

function drawWeekCanvas(withPhotos, photos) {
  var W = 1680, H = 560;
  var canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 0, W, H);
  var colW = W / 7;
  DAYS.forEach(function (day, i) {
    var x = i * colW;
    var a = weekState.assignments[day];
    var label = a ? assignmentLabel(a) : "Nothing planned";
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(x + 8, 8, colW - 16, H - 16);
    if (withPhotos && photos && photos[i]) {
      try {
        var img = photos[i];
        var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
        var scale = Math.max((colW - 16) / iw, 200 / ih);
        var dw = iw * scale, dh = ih * scale;
        ctx.save();
        ctx.beginPath();
        ctx.rect(x + 8, 8, colW - 16, 200);
        ctx.clip();
        ctx.drawImage(img, x + 8 - (dw - (colW - 16)) / 2, 8 - (dh - 200) / 2, dw, dh);
        ctx.restore();
      } catch (e) { /* photo draw failed — text still renders */ }
    }
    var textY = withPhotos ? 240 : 60;
    ctx.fillStyle = "#b8b0a1";
    ctx.font = "600 22px -apple-system, Helvetica, Arial, sans-serif";
    ctx.fillText(shortDate(dateForDayIndex(i)).toUpperCase(), x + 24, withPhotos ? 232 : 52);
    ctx.fillStyle = "#f2ede4";
    ctx.font = "700 30px -apple-system, Helvetica, Arial, sans-serif";
    wrapText(ctx, label, colW - 48).slice(0, 4).forEach(function (ln, li) {
      ctx.fillText(ln, x + 24, textY + 40 + li * 38);
    });
    if (a && a.kind === "special") {
      ctx.fillStyle = "#e8b04b";
      ctx.font = "500 20px -apple-system, Helvetica, Arial, sans-serif";
      ctx.fillText(a.special === "leftovers" ? "Night off" : "Out on the town", x + 24, H - 40);
    }
  });
  return canvas;
}

function loadImage(src) {
  return new Promise(function (resolve) {
    var img = new Image();
    img.onload = function () { resolve(img); };
    img.onerror = function () { resolve(null); };
    img.src = src;
  });
}

function copyWeekImage() {
  var photoSrcs = DAYS.map(function (day) {
    var a = weekState.assignments[day];
    return a ? assignmentImg(a) : null;
  });
  Promise.all(photoSrcs.map(function (s) { return s ? loadImage(s) : Promise.resolve(null); })).then(function (photos) {
    var canvas;
    try {
      canvas = drawWeekCanvas(true, photos);
      canvas.toBlob(function (blob) {
        if (!blob) { downloadWeekImage(); return; }
        deliverWeekBlob(blob, canvas);
      }, "image/png");
    } catch (e) {
      downloadWeekImage();
    }
  });
}

function deliverWeekBlob(blob, canvas) {
  if (navigator.clipboard && window.ClipboardItem) {
    navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]).then(function () {
      toast("Week image copied — paste it into a text or note");
    }, function () { downloadWeekImage(canvas); });
  } else {
    downloadWeekImage(canvas);
  }
}

function downloadWeekImage(canvas) {
  try {
    var c = canvas || drawWeekCanvas(false, null);
    var a = document.createElement("a");
    a.download = "week-meals.png";
    a.href = c.toDataURL("image/png");
    a.click();
    toast("Week image saved — clipboard images aren't supported here");
  } catch (e) {
    toast("Couldn't make the week image on this browser");
  }
}

/* ---------------- calendar: subscribe feed + .ics download ---------------- */

/* One event per planned dinner in the viewed week: evening 6–7pm floating
   time (shows at 6pm in whatever timezone the calendar is viewed in).
   Leftovers and eating-out nights get events too. */
function buildWeekEvents() {
  var events = [];
  DAYS.forEach(function (day, idx) {
    var a = weekState.assignments[day];
    if (!a) return;
    var d = dateForDayIndex(idx);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var dd = String(d.getDate()).padStart(2, "0");
    events.push({
      date: y + "-" + m + "-" + dd,
      dayLabel: shortDate(d),
      title: assignmentLabel(a)
    });
  });
  return events;
}

function escICS(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function icsForWeek() {
  var stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
  var lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//What's cookin', good lookin'?//Meal Planner//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];
  buildWeekEvents().forEach(function (ev, i) {
    var day = ev.date.replace(/-/g, "");
    lines.push(
      "BEGIN:VEVENT",
      "UID:meal-" + currentWeekStart + "-" + i + "@whats-cookin",
      "DTSTAMP:" + stamp,
      "DTSTART:" + day + "T180000",
      "DTEND:" + day + "T190000",
      "SUMMARY:" + escICS(ev.title),
      "END:VEVENT"
    );
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}

function downloadIcs() {
  var events = buildWeekEvents();
  if (!events.length) { toast("Nothing planned this week yet — add dinners first"); return; }
  var blob = new Blob([icsForWeek()], { type: "text/calendar;charset=utf-8" });
  var a = document.createElement("a");
  a.download = "meals-week-of-" + currentWeekStart + ".ics";
  a.href = URL.createObjectURL(blob);
  a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  toast("Week calendar downloaded — open it to add these dinners");
}

function renderCalendar() {
  var feedUrl = WeekSync.getCalendarFeedUrl();
  $("feedConnected").style.display = feedUrl ? "block" : "none";
  $("feedNotConnected").style.display = feedUrl ? "none" : "block";
  if (feedUrl) $("feedUrlInput").value = feedUrl;
  $("calendarWeekLabel").textContent = weekLabel(currentWeekStart);
  var events = buildWeekEvents();
  var preview = $("calendarEventPreview");
  if (!events.length) {
    preview.innerHTML = '<p class="empty-state">No dinners planned this week yet.</p>';
  } else {
    preview.innerHTML = "<ul>" + events.map(function (ev) {
      return "<li>" + esc(ev.dayLabel) + " — " + esc(ev.title) + "</li>";
    }).join("") + "</ul>";
  }
}

/* ---------------- nav + wiring ---------------- */

function showView(name) {
  document.querySelectorAll("nav button").forEach(function (b) {
    b.classList.toggle("active", b.getAttribute("data-view") === name);
  });
  document.querySelectorAll(".view").forEach(function (v) { v.classList.remove("active"); });
  $("view-" + name).classList.add("active");
}

document.querySelectorAll("nav button").forEach(function (b) {
  b.addEventListener("click", function () { showView(b.getAttribute("data-view")); });
});
$("search").addEventListener("input", renderRecipes);
$("cuisineFilter").addEventListener("change", renderRecipes);
$("timeFilter").addEventListener("change", renderRecipes);
$("sortSelect").addEventListener("change", renderRecipes);
$("addToWeekBtn").addEventListener("click", showDayPicker);
$("closeModalBtn").addEventListener("click", closeRecipe);
$("closeMealPickerBtn").addEventListener("click", closeMealPicker);
$("mealPickerModal").addEventListener("click", function (e) { if (e.target === $("mealPickerModal")) closeMealPicker(); });
$("recipeModal").addEventListener("click", function (e) { if (e.target === $("recipeModal")) closeRecipe(); });
$("randomizeBtn").addEventListener("click", randomizeWeek);
$("prevWeekBtn").addEventListener("click", function () { switchWeek(addDaysISO(currentWeekStart, -7)); });
$("nextWeekBtn").addEventListener("click", function () { switchWeek(addDaysISO(currentWeekStart, 7)); });
$("pastWeeksSelect").addEventListener("change", function () { switchWeek($("pastWeeksSelect").value); });
$("weekJumpDate").addEventListener("change", function () {
  var v = $("weekJumpDate").value;
  if (!v) return;
  var p = v.split("-");
  var picked = new Date(+p[0], +p[1] - 1, +p[2]); // local date, no UTC shift
  switchWeek(toISODate(mondayOf(picked)));
});
$("clearWeekBtn").addEventListener("click", function () {
  weekState = defaultState();
  saveWeek(); renderPlanner(); renderGrocery();
  toast("Week cleared");
});
$("copyWeekImageBtn").addEventListener("click", copyWeekImage);
$("copyListBtn").addEventListener("click", function () {
  copyTextToClipboard(exportText(), "List copied — paste it into Notes");
});
$("textListBtn").addEventListener("click", function () {
  shareText(exportText(), "List copied — paste it into a text");
});
$("shareNotesBtn").addEventListener("click", function () {
  shareText(exportText(), "List copied — paste it into Notes");
});
$("copyFeedUrlBtn").addEventListener("click", function () {
  copyTextToClipboard(WeekSync.getCalendarFeedUrl() || "", "Feed link copied");
});
$("downloadIcsBtn").addEventListener("click", downloadIcs);

/* ---------------- boot ---------------- */

(async function () {
  await loadWeek();
  renderRecipes();
  await renderWeekNav();
  renderPlanner();
  renderGrocery();
})();
