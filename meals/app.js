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
  steps: ["Heat oven to 450°F. Pierce each potato 6 to 8 times all over with a fork so steam can escape.", "Rub each potato thoroughly with oil, then roll and coat generously in coarse salt. (Tip: for an even crispier crust, briefly dip them in a saltwater solution before oiling.)", "Place the potatoes directly on the center oven rack, or on a wire rack set inside a rimmed baking sheet, so hot air circulates evenly. Bake 45 to 60 minutes, depending on size.", "They are ready when a fork slides easily into the center with no resistance, or an instant-read thermometer reads 205°F to 212°F.", "For an extra-crispy skin, brush with a little extra oil or butter during the last 5 to 10 minutes of baking.", "While they bake: crumble the tofu into a hot oiled skillet. Season with the spices and fry, breaking it up, 8–10 minutes until browned and crisp at the edges.", "In the last 2 minutes, stir in the corn to warm through, then the spinach to wilt.", "Remove the potatoes and immediately cut an \"X\" or a deep slit across the top. Squeeze the ends gently to pop it open and fluff the inside with a fork. Load with the tofu mixture, cotija, cilantro, sour cream, and a squeeze of lime."] },
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
  ingredients: ["2 steaks (ribeye or NY strip, about 10 oz each), room temperature", "2 russets, cut in fries, soaked 20 min in cold water and patted dry", "Aioli: 1/3 cup mayo, 1 clove garlic (grated), squeeze of lemon, salt", "Hers: 2 Impossible burger patties as her \"steak\"", "1 cup steamed broccoli, as a side"],
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
  leftovers: { name: "Leftovers", img: "assets/leftovers.jpg?v=2" },
  "eating-out": { name: "Eating Out", img: "assets/eating-out.jpg?v=2" }
};

/* Tiny blurred previews (24px, one per photo) shown behind each image
   while the full photo loads — a soft preview instead of an empty box.
   Generated from assets/ with PIL; ~28KB total. */
var BLUR = {
  "bibimbap.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAANABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC5f3qapAbuL5e6k9Risc2F29s94bgYYcqPSsmy1SX7MsIUBcYqvLql1AHgRzsNZSTexpHTUfPctFhwOemRRWeJnaPk5oqouyFLV3P/2Q==",
  "broccoli-frittata.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAeABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtQPSsjVr6WB/LCnB6EUNf87EfPueKYZ2nk8t05H8VY1pwa5XKxVOLTvYghv08sG4ZEPpnmiq95osd05PmAN70VwrCqWvMdPtI9ht5EI52V1bn+IdKItQ8shGGVUdabc621vIUliEgqB9YtJBua0OfY1vUwilszFVXe4t1qLSMhh6tRVCbW4V4hs1DDoWopxw6irMbm76H/9k=",
  "broccoli-mac-cheese.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAkABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCODXrm7Yx2kJdiclj0FNYXc10d08e8DJGK07bTRp7gwMAr8YNVWube3vHjkwJCeCK4nXk37ptGmrXkOi1a/tCcW4mhXuODRTZHkWB0Uhgx/GiiOJdtRyoW2H3GoQTukWT97gg1FfaNHNdK8bndjdz3qGwSznMbsRHKhycmthbm3eVnMgLjhQKwm+R+6XFcy94yZr2OCPaAQ68YoqDXEVm81NoYdeaK0hBNXIqTkpaFDVI1glKx5ArLFzKjkq5BoorpgrsqWxWkuZZJMM5IoooqnpsTFH//2Q==",
  "butter-paneer.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAkABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDl9NO2MmQ5Jq/LIhQbRzWdp8MlxL5afxHit6XQpUhY+auQOlKVWMXZs0jByWhHaWkc8cbJlmB+YdqKt6TqNpYWLR3BCyg/nRWfNJ7DsluZfht4FuGEpwMcVuTPCzPh3x/CK5gXFvFaoIlAmzy1Ti9uZI/lCgetZVqMpu6NaVWMVZkWsQeZcBV6gUVXnmZRknL560V0QjyxSMJPmdyl/CD3qaGZ1wAeKKKskbcMS1FFFAH/2Q==",
  "carbonara.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAQABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDqZLlktSbgqhP8IrPt9RurhykY2xqcCqF9PJfSIkreU69vWrVlZTIhcPt/rWNXn2iXBx6myN6/67lW4yO1FJbyM8PlnDv3orWCfLqQ7X0P/9k=",
  "eating-out.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAQABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwChZ2D3L7j93FXE0ZGmwu1gKp6Z4miRBBOqoT/EBW5LMssQ8now+8K4JQd/eZ1Jroijc6fbvJslHPtRUSQNE7M8pfPTNFYtTWkXoaJxe6P/2Q==",
  "egg-fried-rice.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAYABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDTt5Vln8xio2HA9qsTRkTtIucMOtYkMyeY7MCGJ6YrXXUodyQlWO0fNivKet0zqU7PYkSJ9m44A9TRU08yhUVR949T2orLl0ByjcrJp/2e4cSEY6qSOtFrbRbzIO55NFFdOJpxjLQVGbaI9YBljEKAj3FFFFZp2JnBN3P/2Q==",
  "impossible-nuggets.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAQABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCssGnwSnhmC8mr8cltqePJnKCL+E96wHklEbodrduKbpqmORlPXrUSduhaT7nZHUbeMCM5JAorAM0jllSPkL96iqU3Yj2cT//Z",
  "leftovers.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gODIK/9sAQwAOCgsNCwkODQwNEA8OERYkFxYUFBYsICEaJDQuNzYzLjIyOkFTRjo9Tj4yMkhiSU5WWF1eXThFZm1lWmxTW11Z/9sAQwEPEBAWExYqFxcqWTsyO1lZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZ/8AAEQgADgAYAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A7to5REwzyaopa3KtkuFGPWtESMeOKjni83kkj6UnbdjTfQrW6yhzvbcaKdCGil2k5BoppCP/2Q==",
  "loaded-baked-potatoes.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAkABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDq9Z1OWzzhOPWoNH1l72XYVBHrSa7DKziQHdEOorEVyJQtrGyOT1AxWd3cuysdtIw3YoqijlI42c7jtwaKvmS3M+Vs4u28RzqyCdgynqK0bjUkRluE5UdFXvXJRwvM4GwirotLtU4VilcvLdWR0aLc6JdbE0yqMqh+9misS1srkuPkIHvRT5GyHJHWDTbVJNyx84pdPgQPIMZBPQ0UVrFWIbuWLmJIwNqgZNFFFaMg/9k=",
  "mapo-tofu.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAYABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCpM0cxVmyRjgDrU1nZLeMFNp8nqxrS0+KB5XnKDy0Hy0ye7ZrjEAAAHQVjWrcjuaQhzKyMTVNFghb93+6Y/lRV/U48WLAsZJiMjHailDEtoJUEjD0/WGtx5MxYxHjitIahEZEeJlCKOeeTRRQ6cZ/EVzOOxW1DVYz9w5PotFFFNQjHRIV29Wf/2Q==",
  "miso-ramen.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAeABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDY0q8e+gd0wgX161RnuZSJVhk2k8FveprKz22Dl5vJMg5qMJp9tH5RdpHzndXBKc2731OqMIpWaOSv7XVzvlZ3kRf4qK7cTmaHyorcuuO9FdCmmtTF07PQW+w1vsA246EVzO26EjbIy+Dwa6VsOADnBqQRorrGqjnua86rU5Wrbs67OxjW19PbsCxw2Ogoq1fLHZzM7JvbsO1FdcaFSSvc4JVJJ7n/2Q==",
  "miso-udon.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAgABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCKDWLm2G25nz7L1qabxGJrQxSRO6ngtVTT7BbeEzXnMjfwmtG3u7PcIvIXmsp1W01bQcYpNa6mbdzQ3McYsW8uXHIbvRVm80tLlWmtsRyp0CnrRWNGMFH3Waz395HRy28Ei7+CCKwl0iS3uzOrKVHODVeLULi153CWMj5eaifxIoYsYWLfWplCcZNIIqMkmadgkguXkO1ePXiisBtXknlaSUeXF3A70VUYxS1KlzN3R//Z",
  "pad-thai.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAkABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDsklje5kaNznoQaknLSQkJ94UTmKJyQqg9zWe2srEPmXC561i5KOkmaRi3qjAvIJpbwRvEVwfvAUV1EU8F2okRgc/nRU+yvsy3U7og1VWA3ltqg8msAKtwjgKSB0Pauru4hcRFG6HqKppYwRLtGcelE6bbugjOysynpEKRK7gYwKK0BHxtVdqfzoq4xaViZO7uWcmg0UVoQMY4FFFFAH//2Q==",
  "paneer-tikka-masala.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAYABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDsrq4W3QsTWT/b6eaB5ZC+tS6+p8hMDjPNc6QA3PQVx160oSsjso0YzjdnZQzJMoZT1orJ0iTKhfSiuiEuaKZzzjyyaNmeJZoyjjINZMmhxM2dzY9KKKcoRlugjOUdmXbWzS3XC0UUUxH/2Q==",
  "pasta-impossible-beef.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAeABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDo7i9YwhZZhg9h1NUB4jjtyEMR29KzJcSMxLElflAqSOzZ23OihAOtcUq0ua0djsjRXLeRcntbHVojdRLtc9cdaKzIb02d7CkDKYwcNRVxcJK8kTJzi7RZelt0tryQv90/MtR6veN9mXyQCmMkjvW61uj26FwG+tVhpMFwvVlUHoKmdGaleOwQrRa945fTbE6jMjr8qK2TRXX2NnDBPIqLgKPzorenC0dTKpO70P/Z",
  "pasta-red-sauce.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAARABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCeAz2ypcAhthwwrZttViZT5icVz02oW2opHJbt5bk/PHmrtsgMZA6j1rhfNCV0egoxnHU3PLt7uMvD1oqpZ3ENrklsuf4RRWyqJr3tzCVNp+6tDzi0/wCP4fWuzt/9T+FFFHQrqV7D/j8eiiiuae50R2P/2Q==",
  "pesto-pasta.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAQABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC1K0q3B8yTORVuFUnIhU5DDkGodUljJQxqpNQ2tyIWLDAl7CuOz5rrYvXYp6lpCwuRC5OeqgUVdknYNvJ3Z6mip5mTJJs//9k=",
  "picadillo-tacos.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAYABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCtPLK7GOI7Qv3jRb2m51kJIA6k1ObcRXAYtwRn61BqN99nyUxg8CuCpUcnZHVCKiiW6WMjMbZorHtZXlvC5OIsZNFdNJyUdTCpFX0L82oAR+TKMMPutWYI3aQGZgYc5PNFFDpxvcIzdhLy+idDbWagBurUUUVqlZEH/9k=",
  "polenta-sausage.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAQABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDptSujbWxZfvHgViJqEkJDygsSfWtjU7Y3VttX7w5FYsFpLDJvnKhV5+asa3PzabFUnHldzUS/YSoHB2OMjPaiqHnG+vVKD5E4orpjeyuccnq7H//Z",
  "quesadillas.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAeABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwAg0y3HzwqBjsKks71LSZ0uohGwPyn1qpDaTNYiVbgI4OduaXy55AGu0EoY8Edq4qlRvQ6YQtqdPaXSXURWQKytRXNw3Is5N0T4hX7waisk6i0TuaNQZHY2LahEH8wp2IBp8NpNayAecXCnoaq6RcSQSFN2VcVv6bEJmYT/ALxc5HqK2cHzWRmpe7qUb1rea2ZTAd57iiuiW1hXog59aK2jRstzF1D/2Q==",
  "salmon-asparagus.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAANABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBJdWihuT5RyueK1bLUVnIfn864JJfPmywwfY1u20phtHC9x61xzpvodFPlXxHVxzxXzNHkEjvRXDx63PbBkhVVP97qaKUITirIbalqf//Z",
  "salmon-bowls.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAgABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBuk67fWSmAoJ3PQCtOHWNZlclookX+6axbN1sVEoXdI3f0om1KeWTzFU5FZTqu14mroSSuzo4dWaaQwyKIpz0B6NRXNTSz3UWdpWROQ3pRTpzco3Zz2TKVteC7jVFAUj1NTS7Rl3bH0NYd/bSWVyVRip9qLZp5hgvnFZSw75tGd/1m8OVo6OynNxL5NuC3mDBz2oqfw9EYWL459aK6adFRVjz27H//2Q==",
  "sheet-pan-gnocchi.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAYABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDOjS1ikw4Pmdsdq1L17SSNY0DKyD5jVJZI5oyTCVkzwxpVMxkC43K3BYc8V513ex2W6oMpar5kreYr8DHUUVBeyNCRGI923oc0U1G+onJrQ19VtEtLgyncY2GAB0zWQZNzEQSeXsHI9aKK6KsVzXMqb9wmtbTzlUMpdz2J60UUVvGCSMZSbZ//2Q==",
  "shepherds-pie.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAkABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDqRfQM4UuAW6c1KcFsd65eOyS1bdJJJLIPugCtaweZpDNcfIuMKtYRk0veZvJdi+7LF97vRTZ9s6DYQaK1XkZlW6RkuXlbARO3tWbf63CqExo2a6eeFZVOQKwdT0ZrgYVQAPSuepQ53dmkZ2RhWmr3hnLhCUJ4UUVqW2kXcK7VKxj+91NFawjyqyE2mdZTJDgE0UVqZHG32s3iSSKrqAGwOKKKKzND/9k=",
  "smash-burgers.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAYABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwB0OjWksYYfKB696ytVsXRWW0XeB1x2ra1vSb03DfZJMRnoo7VBpWn3MKubiTBrj9p7OV5PQ35eaOm5xLSMHKyLhh2NFdhe6XbX5KLH+8z98UVvCrCSujN05I7cxiWTIPSszV0tbVN1xOI1Pb1ooqpUoza5kTGbjsctP4ltLEn7HEXb+89FFFdPsoQ0SIc3LVn/2Q==",
  "steak-frites.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAQABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDUt9Wa20Pzn+eQNjFMXVVnAdAVY9QTWddxmylMF4v7hzww7UwaTdZD2p86HqGFYVIuSsjeDindnXWF8HUL6Cis/TLWcMNwKn3orOnOaVrDnGN9Gf/Z",
  "thai-basil-tofu.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAeABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC3eeL41kaOyhM5HUjpTbbxfhgt5bGJWONw5xWJaWqRw4hUbiMknpU8pCW7K+JDnJG3pXK67vob+yVrncLqUTwK0TBgw4xRXBWUs4WWIbkGNyiirUW9SNh0BK2ysSoX0z1qESu7SO7BUz2q7fWCxSiSE4U8hT0FQpbtKcSMCvoBisvZO5r7UTTg7XDzMxZfurmir0UYEiIvAFFdKVlYwbu7n//Z"
};
function blurFor(src) { var f = String(src).split('/').pop().split('?')[0]; return BLUR[f] || ''; }
/* Inline style that paints the blurred preview behind a photo while it
   loads; empty when there is no preview for the image. */
function blurStyle(src) { var b = blurFor(src); return b ? ' style="background-image:url(' + b + ');background-size:cover"' : ''; }
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
  return "Week of: " + d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
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
  return { assignments: a, checked: [], extras: [] };
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
    if (!Array.isArray(weekState.extras)) weekState.extras = [];
    DAYS.forEach(function (d) { if (!(d in weekState.assignments)) weekState.assignments[d] = null; });
  } else {
    weekState = defaultState();
  }
}

async function switchWeek(weekStart) {
  /* Show the page shape while the week loads — but only if the load is
     slow enough to notice (250ms), so a fast switch never flashes grey
     blocks over the week you were just looking at. */
  var slow = setTimeout(renderSkeletons, 250);
  await loadWeek(weekStart);
  clearTimeout(slow);
  renderWeekNav();
  renderPlanner();
  renderGrocery();
}

/* Skeleton placeholders: the planner grid and grocery list keep their
   shape while a week loads, instead of going blank (or flashing a stale
   dinner, as an early version did). */
function renderSkeletons() {
  var grid = $("plannerGrid");
  if (grid) {
    grid.innerHTML = DAYS.map(function () {
      return '<div class="day-card skeleton"><div class="sk-img"></div>'
        + '<div class="day-body"><div class="sk-line"></div>'
        + '<div class="sk-line short"></div>'
        + '<div class="sk-line btn"></div></div></div>';
    }).join("");
  }
  var gc = $("groceryCombined");
  if (gc) {
    gc.innerHTML = '<div class="sk-line"></div><div class="sk-line"></div>'
      + '<div class="sk-line short"></div><div class="sk-line"></div>'
      + '<div class="sk-line short"></div>';
  }
}

/* One-step undo for the destructive week actions (Randomize, Clear week).
   The snapshot survives a reload, so an accidental tap can still be undone
   after closing and reopening the page. */
var UNDO_KEY = "whats-cookin-undo-v1";
var undoSnapshot = null;
try { undoSnapshot = JSON.parse(localStorage.getItem(UNDO_KEY) || "null"); } catch (e) { undoSnapshot = null; }
function takeUndoSnapshot() {
  undoSnapshot = { week: currentWeekStart, state: JSON.parse(JSON.stringify(weekState)) };
  try { localStorage.setItem(UNDO_KEY, JSON.stringify(undoSnapshot)); } catch (e) {}
  renderUndo();
}
function clearUndoSnapshot() {
  undoSnapshot = null;
  try { localStorage.removeItem(UNDO_KEY); } catch (e) {}
  renderUndo();
}
function renderUndo() {
  var b = $("undoBtn");
  if (b) b.style.display = undoSnapshot ? "" : "none";
  var g = $("groceryUndoBtn");
  if (g) g.style.display = undoSnapshot ? "" : "none";
}
async function undoWeek() {
  if (!undoSnapshot) return;
  var snap = undoSnapshot;
  clearUndoSnapshot();
  if (snap.week !== currentWeekStart) await switchWeek(snap.week);
  weekState = JSON.parse(JSON.stringify(snap.state));
  saveWeek();
  refreshPopularityAndRerender();
  renderPlanner(); renderGrocery();
  toast("Undone — week restored");
}

/* Jump to any week by picking a calendar date (a real date, not a week
   number — the old week picker showed a confusing "Week 47, 2026"). */
function jumpToDate(value) {
  if (!value) return;
  var p = value.split("-");
  var picked = new Date(+p[0], +p[1] - 1, +p[2]); // local date, no UTC shift
  switchWeek(toISODate(mondayOf(picked)));
}

async function renderWeekNav() {
  /* "Week of: [Monday date]" on the planner and grocery tabs, kept in step
     with the week being viewed. The line is also the way back: when viewing
     any other week it reads "· back to this week" and tapping it jumps to
     the current week. (The old week picker showed an ISO week number like
     "Week 47, 2026" — meaningless to read — so it is gone; Previous/Next
     move one week at a time.) */
  var isCurrent = currentWeekStart === thisWeekStart();
  var text = weekLabel(currentWeekStart)
    + (isCurrent ? " (this week)" : " · back to this week");
  [ $("plannerWeekLabel"), $("groceryWeekLabel") ].forEach(function (el) {
    if (!el) return;
    el.textContent = text;
    el.classList.toggle("away", !isCurrent);
    el.disabled = isCurrent;
  });
  /* Keep the "Jump to a date" pickers showing the viewed week's Monday. */
  var pj = $("plannerJumpDate");
  if (pj) pj.value = currentWeekStart;
  var gj = $("groceryJumpDate");
  if (gj) gj.value = currentWeekStart;
}

/* Jump back to the current week from either tab's "Week of:" line. */
function goToCurrentWeek() {
  if (currentWeekStart !== thisWeekStart()) switchWeek(thisWeekStart());
}

/* ---------------- helpers ---------------- */

function $(id) { return document.getElementById(id); }
function recipeById(id) { return RECIPES.filter(function (r) { return String(r.id) === String(id); })[0]; }
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
/* If a card photo fails to load, swap in a same-size emoji tile instead of
   hiding the image and leaving a void (seen on the Eating Out card). */
function imgFallback(img) {
  img.onerror = null;
  var d = document.createElement("div");
  d.className = "img-fallback";
  d.textContent = img.alt === "Eating Out" ? "🍽️" : img.alt === "Leftovers" ? "🥡" : "🍲";
  img.replaceWith(d);
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

/* ---------------- popularity ---------------- */
/* How often each recipe has been planned, counted across every saved week
   (both partners' picks). The Recipes tab can sort by it: most-picked first,
   ties broken A–Z. Counts refresh whenever the Recipes tab is opened, when
   Popularity is picked as the sort, and after any change to a week's meals. */
var popularityCounts = {};
function tallyWeekState(st, counts) {
  if (!st || !st.assignments) return;
  Object.keys(st.assignments).forEach(function (day) {
    var a = st.assignments[day];
    if (a && a.kind === "recipe" && a.id !== undefined && a.id !== null) {
      var k = String(a.id);
      counts[k] = (counts[k] || 0) + 1;
    }
  });
}
async function refreshPopularity() {
  var counts = {};
  var rows = [];
  try { rows = await WeekSync.loadAllWeekStates(); } catch (e) { rows = []; }
  rows.forEach(function (row) {
    if (row.week === currentWeekStart) return; // freshest copy is in memory
    tallyWeekState(row.state, counts);
  });
  tallyWeekState(weekState, counts);
  popularityCounts = counts;
}
function popularityOf(recipe) { return popularityCounts[String(recipe.id)] || 0; }
function refreshPopularityAndRerender() {
  refreshPopularity().then(function () {
    if ($("sortSelect").value === "popularity") renderRecipes();
  });
}

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
      if (r.name.toLowerCase().indexOf(q) !== -1) return true;
      if (q.length >= 3) {
        var hay = (r.cuisineLabel + " " + r.ingredients.join(" ")).toLowerCase();
        if (hay.indexOf(q) !== -1) return true;
      }
      return false;
    }
    return true;
  });
  if (sort === "az") list.sort(function (a, b) { return a.name.localeCompare(b.name); });
  else if (sort === "time") list.sort(function (a, b) { return a.timeMin - b.timeMin || a.name.localeCompare(b.name); });
  else if (sort === "effort") list.sort(function (a, b) { return EFFORT_ORDER[a.effort] - EFFORT_ORDER[b.effort] || a.timeMin - b.timeMin; });
  else if (sort === "popularity") list.sort(function (a, b) { return popularityOf(b) - popularityOf(a) || a.name.localeCompare(b.name); });
  else list.sort(function (a, b) { return CUISINE_ORDER.indexOf(a.cuisine) - CUISINE_ORDER.indexOf(b.cuisine) || a.name.localeCompare(b.name); });
  return list;
}

function renderRecipes() {
  var list = filteredRecipes();
  var sort = $("sortSelect").value;
  var grid = $("recipeGrid");
  $("noResults").style.display = list.length ? "none" : "block";
  grid.innerHTML = list.map(function (r) {
    var picked = sort === "popularity" ? " · Picked " + popularityOf(r) + (popularityOf(r) === 1 ? " time" : " times") : "";
    return '<div class="card" data-id="' + r.id + '">'
      + '<img src="' + r.img + '"' + blurStyle(r.img) + ' alt="' + esc(r.name) + '" loading="lazy" onerror="imgFallback(this)">'
      + '<div class="card-body"><h3>' + esc(r.name) + '</h3>'
      + '<div class="meta">' + esc(r.cuisineLabel) + ' · ' + esc(r.timeLabel) + picked + '</div>'
      + '<span class="badge ' + r.effort + '">' + (r.effort === "easy" ? "Easy" : r.effort === "medium" ? "Medium" : "Involved") + '</span>'
      + '</div></div>';
  }).join("");
  grid.querySelectorAll(".card").forEach(function (el) {
    el.addEventListener("click", function () { openRecipeFrom(el.getAttribute("data-id"), el.querySelector("img")); });
  });
}

/* ---------------- recipe modal / add to week ---------------- */

var currentRecipeId = null;

function openRecipe(id) {
  var r = recipeById(id);
  if (!r) return;
  currentRecipeId = id;
  $("modalImg").src = r.img;
  var blur = blurFor(r.img);
  $("modalImg").style.backgroundImage = blur ? "url(" + blur + ")" : "";
  $("modalImg").alt = r.name;
  $("modalName").textContent = r.name;
  $("modalMeta").textContent = r.cuisineLabel + " · " + r.timeLabel;
  $("modalIngredients").innerHTML = r.ingredients.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");
  $("modalSteps").innerHTML = r.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
  $("dayPicker").style.display = "none";
  $("dayPicker").innerHTML = "";
  $("recipeModal").classList.add("open");
}

/* Open the recipe modal with the tapped card's photo growing into it
   (View Transitions API). Falls back to a plain open where the API or
   reduced-motion preference says no. */
function openRecipeFrom(id, sourceImg) {
  var modalImg = $("modalImg");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce) { openRecipe(id); return; }
  if (sourceImg) sourceImg.style.viewTransitionName = "recipe-photo";
  modalImg.style.viewTransitionName = "recipe-photo";
  var t = document.startViewTransition(function () { openRecipe(id); });
  t.finished.then(clearPhotoTransition, clearPhotoTransition);
  function clearPhotoTransition() {
    if (sourceImg) sourceImg.style.viewTransitionName = "";
    modalImg.style.viewTransitionName = "";
  }
}

function closeRecipe() {
  $("modalImg").style.viewTransitionName = "";
  var m = $("recipeModal").querySelector(".modal");
  if (m) { m.style.transform = ""; m.style.transition = ""; }
  $("recipeModal").classList.remove("open");
}

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
      refreshPopularityAndRerender();
      renderPlanner();
      renderGrocery();
      closeRecipe();
      toast(r.name + " added to " + day);
    });
  });
  // The picker sits at the bottom of the modal, below the fold on long
  // recipes — scroll it into view so the days can be picked right away.
  picker.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------------- planner: add / change from the planner tab ---------------- */

var mealPickerDay = null;

function showMealPicker(day) {
  mealPickerDay = day;
  $("mealPickerTitle").textContent = "Pick dinner for " + day;
  var search = $("mealPickerSearch");
  search.value = "";
  var renderList = function () {
    var q = search.value.trim().toLowerCase();
    /* Default order is popularity (most-planned first, ties A–Z) — the
       same order as the Recipes tab's Popularity sort. */
    var sorted = RECIPES.slice().sort(function (a, b) { return popularityOf(b) - popularityOf(a) || a.name.localeCompare(b.name); });
    var list = sorted.filter(function (r) {
      if (!q) return true;
      if (r.name.toLowerCase().indexOf(q) !== -1) return true;
      return q.length >= 3 && r.ingredients.join(" ").toLowerCase().indexOf(q) !== -1;
    });
    /* Name matches always rank first, so the dish you're typing stays on
       top even when a 3+ letter query also matches an ingredient (e.g.
       "sal" matching salt in other recipes). Within each group the
       order stays popularity, not A–Z. */
    if (q) {
      list.sort(function (a, b) {
        var am = a.name.toLowerCase().indexOf(q) !== -1;
        var bm = b.name.toLowerCase().indexOf(q) !== -1;
        if (am !== bm) return am ? -1 : 1;
        return popularityOf(b) - popularityOf(a) || a.name.localeCompare(b.name);
      });
    }
    /* Eating Out and Leftovers sit at the top, ahead of the recipes. */
    var rows = '<button data-special="eating-out"><img src="' + SPECIALS["eating-out"].img + '" alt="" onerror="this.style.display=\'none\'">'
      + '<span>Eating Out<br><small>Night out</small></span></button>';
    rows += '<button data-special="leftovers"><img src="' + SPECIALS.leftovers.img + '" alt="" onerror="this.style.display=\'none\'">'
      + '<span>Leftovers<br><small>Night off cooking</small></span></button>';
    rows += list.map(function (r) {
      var picked = popularityOf(r);
      var count = picked ? " · Picked " + picked + (picked === 1 ? " time" : " times") : "";
      return '<button data-recipe="' + r.id + '"><img src="' + r.img + '" alt="" onerror="this.style.display=\'none\'">'
        + '<span>' + esc(r.name) + '<br><small>' + esc(r.cuisineLabel) + ' · ' + esc(r.timeLabel) + count + '</small></span></button>';
    }).join("");
    $("mealPickerList").innerHTML = rows;
    $("mealPickerList").querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var day = mealPickerDay;
        var assignment, label;
        if (btn.hasAttribute("data-recipe")) {
          var r = recipeById(btn.getAttribute("data-recipe"));
          assignment = { kind: "recipe", id: r.id };
          label = r.name;
        } else {
          var special = btn.getAttribute("data-special");
          assignment = { kind: "special", special: special };
          label = SPECIALS[special].name;
        }
        weekState.assignments[day] = assignment;
        saveWeek();
        refreshPopularityAndRerender();
        renderPlanner();
        renderGrocery();
        closeMealPicker();
        toast(label + " set for " + day);
      });
    });
  };
  search.oninput = renderList;
  renderList();
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
    return '<div class="day-card' + (a.kind === "recipe" ? '" data-recipe-card="' + a.id + '" style="cursor:pointer" title="Click to view recipe"' : '"') + '><img src="' + assignmentImg(a) + '"' + blurStyle(assignmentImg(a)) + ' alt="' + esc(label) + '" onerror="imgFallback(this)">'
      + '<div class="day-body"><h3>' + dateStr + '</h3>'
      + '<div class="dish">' + esc(label) + '</div>'
      + (time ? '<div class="meta">' + esc(time) + '</div>' : "")
      + '<div style="margin-top:10px">' + (a.kind === "recipe" ? '<button class="btn" data-view-recipe="' + a.id + '">View recipe</button> ' : "")
        + '<button class="btn secondary" data-change="' + day + '">Change</button> '
      + '<button class="btn danger" data-clear="' + day + '">Clear</button></div>'
      + '</div></div>';
  }).join("");
  grid.querySelectorAll("[data-change],[data-clear]").forEach(function (btn) {
    btn.addEventListener("click", function (e) { e.stopPropagation(); });
  });
  grid.querySelectorAll("[data-clear]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var day = btn.getAttribute("data-clear");
      weekState.assignments[day] = null;
      saveWeek();
      refreshPopularityAndRerender();
      renderPlanner();
      renderGrocery();
    });
  });
  grid.querySelectorAll("[data-view-recipe]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var card = btn.closest(".day-card");
      openRecipeFrom(btn.getAttribute("data-view-recipe"), card ? card.querySelector("img") : null);
    });
  });
  grid.querySelectorAll("[data-recipe-card]").forEach(function (el) {
    el.addEventListener("click", function () { openRecipeFrom(el.getAttribute("data-recipe-card"), el.querySelector("img")); });
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
  takeUndoSnapshot();
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
  refreshPopularityAndRerender();
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
  var fracs = [[0.25, "1/4"], [1 / 3, "1/3"], [0.5, "1/2"], [2 / 3, "2/3"], [0.75, "3/4"], [5 / 6, "5/6"]];
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
/* A comma-separated segment is a standalone item when it is short, has
   no amount of its own, and isn't a prep phrase ("minced", "to finish",
   "butter or oil", "cut in fries"). */
var PREP_WORDS = ["minced", "diced", "sliced", "chopped", "grated", "shredded", "crumbled", "beaten", "halved", "cubed", "pressed", "soaked", "divided", "thinly", "finely", "loosely", "smashed", "quartered", "peeled", "cut", "small", "large", "trimmed", "torn"];
var NONFOOD_WORDS = ["half-moons", "half-moon", "wedges", "cubes", "dice", "pieces", "strips", "rings", "slices", "chunks", "florets", "in", "the", "a", "an", "of", "to", "for", "and", "or", "more", "room", "temperature", "plus", "serve", "taste"];
function looksLikeItem(seg) {
  var s = seg.trim().toLowerCase();
  if (!s) return false;
  var words = s.split(/\s+/);
  if (words.length > 4) return false;
  if (/\d/.test(s)) return false;
  if (/[()]/.test(s)) return false;
  if (/\bor\b/.test(s)) return false;
  if (/^(to|for|as|with|and|plus)\b/.test(s)) return false;
  if (/\b(to finish|to serve|to taste|room temperature|for serving|for the table|plus more|for frying|for dipping)\b/.test(s)) return false;
  if (PREP_WORDS.indexOf(words[0]) !== -1) return false;
  if (PREP_WORDS.indexOf(s) !== -1) return false;
  if (words.every(function (w) { return PREP_WORDS.indexOf(w) !== -1 || NONFOOD_WORDS.indexOf(w.replace(/[^a-z-]/g, "")) !== -1; })) return false;
  return true;
}

/* First comma at paren depth 0 — commas inside "(...)" belong to the
   parenthetical ("2 Italian pork sausages (hers: 2 Impossible sausages,
   or skip)"), not to the item list. */
function firstCommaOutsideParens(s) {
  var depth = 0;
  for (var i = 0; i < s.length; i++) {
    if (s[i] === "(") depth++;
    else if (s[i] === ")") depth--;
    else if (s[i] === "," && depth === 0) return i;
  }
  return -1;
}

function splitLine(line) {
  var parts = line.split(/,\s*(?=\d)/);
  var out = [];
  parts.forEach(function (p) {
    p.split(/\s*\+\s*/).forEach(function (q) {
      q = q.trim();
      if (!q) return;
      if (parseAmount(q) === null) {
        /* An amount-less line that just lists items ("Cilantro, sour cream,
           lime wedges") splits into one piece per item — but only when every
           segment looks like an item, so prep notes and serving suggestions
           stay whole. */
        if (q.indexOf(",") !== -1) {
          var segs = q.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
          if (segs.length > 1 && segs.every(looksLikeItem)) {
            segs.forEach(function (s) { out.push(s); });
            return;
          }
        }
        out.push(q);
        return;
      }
      /* A line with an amount keeps its first comma-segment as the item;
         later segments that look like items are rescued instead of dropped
         ("1 tsp sugar, salt" -> sugar + salt; "1 tsp salt, black pepper"
         -> salt + pepper), while prep notes ("minced", "room temperature")
         still fall away. The split is at the first comma outside any
         parentheses, so "(hers: 2 Impossible sausages, or skip)" stays
         part of the main item. */
      var firstComma = firstCommaOutsideParens(q);
      if (firstComma === -1) { out.push(q); return; }
      out.push(q.slice(0, firstComma).trim());
      q.slice(firstComma + 1).split(/[,;]/).forEach(function (t) {
        t = t.trim();
        if (!t) return;
        if (parseAmount(t) !== null || looksLikeItem(t)) out.push(t);
      });
    });
  });
  return out;
}

/* Units are stored singular ("cup", "clove") so "1 clove" and "2 cloves"
   of the same item add up instead of listing twice. Abbreviations that
   never take an "s" (tbsp, tsp, oz) are left alone when pluralizing. */
var UNIT_SINGULAR = { cups: "cup", lbs: "lb", cloves: "clove", cans: "can", blocks: "block", bunches: "bunch", slices: "slice", stalks: "stalk", heads: "head", pieces: "piece" };
var PLURAL_UNITS = { cup: "cups", clove: "cloves", can: "cans", block: "blocks", bunch: "bunches", slice: "slices", stalk: "stalks", head: "heads", piece: "pieces", lb: "lbs" };
function pluralUnit(unit, value) {
  if (value > 1 && PLURAL_UNITS[unit]) return PLURAL_UNITS[unit];
  return unit;
}

/* Words that describe the same purchase in different recipes — strip them
   (plus "florets" and a "side:" prefix) so one item groups into one line
   instead of splitting into "broccoli florets" / "small broccoli florets" /
   "side: steamed broccoli". "crushed" is deliberately NOT stripped: crushed
   vs diced vs whole tomatoes are different cans. */
var NORM_ADJ = ["small", "large", "medium", "baby", "fresh", "dried", "ground", "grated", "finely", "shredded", "chopped", "diced", "minced", "sliced", "steamed", "roasted", "day-old", "cooked", "jasmine", "russet", "heavy", "sharp", "crumbled", "black", "charred"];
function normKey(item) {
  var s = item.replace(/^side:\s*/, "");
  var words = s.split(" ");
  while (words.length > 1 && NORM_ADJ.indexOf(words[0]) !== -1) words.shift();
  s = words.join(" ").replace(/\bflorets\b/g, "").replace(/\s+/g, " ").trim();
  if (s === "russet" || s === "russets") s = "potato";
  if (/(^|\s)potatoes$/.test(s)) s = s.replace(/potatoes$/, "potato");
  return s || item;
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
  if (UNIT_SINGULAR[unit]) unit = UNIT_SINGULAR[unit];
  var item = rest.replace(/\([^)]*\)/g, "").replace(/[()]/g, "").replace(/,.*$/, "").trim().toLowerCase().replace(/\s+/g, " ");
  if (!item) item = piece.toLowerCase();
  item = item.replace(/^(pinch|squeeze) of\s+/, "");
  return { amount: amount, unit: unit, item: normKey(item), display: item, raw: piece.replace(/[()]/g, "") };
}

function combinedGrocery() {
  var groups = {};
  var order = [];
  plannedRecipes().forEach(function (r) {
    r.ingredients.forEach(function (line) {
      splitLine(line).forEach(function (piece) {
        var p = parsePiece(piece);
        if (!groups[p.item]) { groups[p.item] = { item: p.item, display: p.display, displays: [p.display], amounts: [] }; order.push(p.item); }
        var g = groups[p.item];
        if (g.displays.indexOf(p.display) === -1) g.displays.push(p.display);
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
    /* Amounts first with the item name ("5 cups broccoli florets"), then
       any amount-less notes ("+ Salt, pepper") — the name
       belongs with its amounts, not tacked on after a note. Identical
       notes show once. */
    var amountParts = g.amounts.filter(function (a) { return a.value !== null; })
      .map(function (a) { return formatAmount(a.value) + (a.unit ? " " + pluralUnit(a.unit, a.value) : ""); });
    /* Prefer a plain name for the label ("rice") over a stateful one
       ("day-old cooked rice") when the same item was written both ways. */
    var display = g.displays.filter(function (d) { return NORM_ADJ.indexOf(d.split(" ")[0]) === -1; })[0] || g.displays[0];
    var rawParts = [];
    g.amounts.forEach(function (a) {
      if (a.value !== null) return;
      if (rawParts.some(function (r) { return r.toLowerCase() === a.raw.toLowerCase(); })) return;
      rawParts.push(a.raw);
    });
    /* Drop notes that only restate the item ("black pepper" in the pepper
       group, "Salt" next to "1 tsp salt") — but never drop the last note,
       or a bare item would lose its label entirely. */
    var informative = rawParts.filter(function (r) {
      return normKey(r.toLowerCase().replace(/,.*$/, "").trim()) !== key;
    });
    if (amountParts.length || informative.length) rawParts = informative;
    else if (rawParts.length) rawParts = [rawParts[0]];
    var text = amountParts.join(" + ");
    if (amountParts.length) text += " " + display;
    if (rawParts.length) text += (text ? " + " : "") + rawParts.join(" + ");
    return { key: key, label: text };
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

/* ---------------- grocery: store sections ---------------- */

/* Store sections in the order you'd walk them, and a keyword classifier
   that guesses where a shoppable item lives. Best-effort: free-text
   ingredients are ambiguous (canned vs fresh corn, etc.), and anything
   the classifier misses lands in Other. */
var STORE_SECTIONS = ["Produce", "Meat & Seafood", "Dairy & Eggs", "Bakery & Bread", "Pantry", "Frozen", "Other"];

function sectionForItem(item) {
  var s = String(item).toLowerCase();
  if (/\bfrozen\b/.test(s)) return "Frozen";
  if (/\b(crushed tomatoes|tomato paste|diced tomatoes|sun-dried tomatoes)\b/.test(s)) return "Pantry";
  if (/\b(salmon|fish|shrimp|prawn|chicken|beef|pork|steaks?|sausages?|bacon|meat|impossible)\b/.test(s)) return "Meat & Seafood";
  if (/\b(milk|cheese|butter|cream|yogurt|yoghurt|eggs?|paneer|cotija|parmesan|mozzarella|cheddar|feta)\b/.test(s)) return "Dairy & Eggs";
  if (/\b(bread|naan|tortillas?|buns?|rolls?|baguette|pita)\b/.test(s)) return "Bakery & Bread";
  if (/\b(spinach|broccoli|kale|avocado|cucumber|tomato|onion|garlic|ginger|lemon|lime|carrot|potato|asparagus|zucchini|green beans|corn|mushroom|basil|cilantro|parsley|lettuce|greens|tofu|apple|banana|mango|herb)\b/.test(s)) return "Produce";
  if (/\b(rice|pasta|noodle|macaroni|udon|ramen|gnocchi|couscous|polenta|flour|oil|sauce|soy|miso|vinegar|spice|cumin|paprika|chili|peppercorns?|curry|paste|sugar|salt|honey|peanuts?|cashews?|almonds?|sesame|stock|broth|tamarind|gochujang|doubanjiang|oregano)\b/.test(s)) return "Pantry";
  return "Other";
}

/* One grouped view of the week's shopping: recipe items (combined) plus
   the user's own added items, bucketed by store section. */
function groupedGroceryItems() {
  var groups = {};
  STORE_SECTIONS.forEach(function (s) { groups[s] = []; });
  combinedGrocery().forEach(function (g) {
    groups[sectionForItem(g.key)].push({ label: g.label, key: g.key, extra: false, name: null });
  });
  var extras = Array.isArray(weekState.extras) ? weekState.extras : [];
  extras.forEach(function (ex) {
    var sec = (ex.section && STORE_SECTIONS.indexOf(ex.section) !== -1) ? ex.section : sectionForItem(ex.name);
    groups[sec].push({ label: ex.name, key: "extra:" + ex.name.toLowerCase(), extra: true, name: ex.name });
  });
  return STORE_SECTIONS.map(function (sec) {
    return { section: sec, items: groups[sec] };
  }).filter(function (g) { return g.items.length; });
}

function renderGrocery() {
  var recipes = plannedRecipes();
  var extras = Array.isArray(weekState.extras) ? weekState.extras : [];
  $("groceryEmpty").style.display = (recipes.length || extras.length) ? "none" : "block";
  var groups = groupedGroceryItems();
  var box = $("groceryCombined");
  box.innerHTML = groups.map(function (g) {
    var items = g.items.map(function (it) {
      var checked = weekState.checked.indexOf(it.key) !== -1;
      return '<div class="grocery-item' + (checked ? " checked" : "") + '">'
        + '<label>' + esc(it.label) + '</label>'
        + (it.extra ? '<button class="btn danger small" data-remove-extra="' + esc(it.name) + '">×</button>' : "")
        + '<input type="checkbox" data-key="' + esc(it.key) + '"' + (checked ? " checked" : "") + '></div>';
    }).join("");
    return '<h3 class="grocery-section">' + esc(g.section) + '</h3>' + items;
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
  box.querySelectorAll("[data-remove-extra]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-remove-extra");
      weekState.extras = (weekState.extras || []).filter(function (ex) { return ex.name !== name; });
      var kidx = weekState.checked.indexOf("extra:" + name.toLowerCase());
      if (kidx !== -1) weekState.checked.splice(kidx, 1);
      saveWeek();
      renderGrocery();
    });
  });
  var bd = $("groceryBreakdown");
  if (!recipes.length) { bd.innerHTML = ""; return; }
  bd.innerHTML = "<h2>What each recipe needs</h2>" + recipes.map(function (r) {
    return "<h3>" + esc(r.name) + "</h3><ul>"
      + r.ingredients.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
  }).join("");
}

/* Exports: ONLY unchecked shopping items, grouped by store section —
   no meal names, no per-recipe breakdown. */
function exportText() {
  var lines = [];
  groupedGroceryItems().forEach(function (g) {
    var items = g.items.filter(function (it) { return weekState.checked.indexOf(it.key) === -1; });
    if (!items.length) return;
    lines.push(g.section);
    items.forEach(function (it) { lines.push(it.label); });
  });
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
  /* Opening the Recipes tab on Popularity sort re-counts first, so the
     order reflects the latest planning from either partner. */
  if (name === "recipes" && $("sortSelect").value === "popularity") refreshPopularity().then(renderRecipes);
}

document.querySelectorAll("nav button").forEach(function (b) {
  b.addEventListener("click", function () { showView(b.getAttribute("data-view")); });
});
$("search").addEventListener("input", renderRecipes);
$("cuisineFilter").addEventListener("change", renderRecipes);
$("timeFilter").addEventListener("change", renderRecipes);
$("sortSelect").addEventListener("change", function () {
  /* Picking Popularity re-counts first so the order is current. */
  if ($("sortSelect").value === "popularity") refreshPopularity().then(renderRecipes);
  else renderRecipes();
});
$("addToWeekBtn").addEventListener("click", showDayPicker);
$("closeModalBtn").addEventListener("click", closeRecipe);
$("closeMealPickerBtn").addEventListener("click", closeMealPicker);
$("mealPickerModal").addEventListener("click", function (e) { if (e.target === $("mealPickerModal")) closeMealPicker(); });
$("recipeModal").addEventListener("click", function (e) { if (e.target === $("recipeModal")) closeRecipe(); });

/* Swipe to dismiss the recipe modal on phones: drag the sheet down by its
   handle (or from the top while scrolled to the top) and let go past a
   threshold to close, or it springs back. Desktop keeps the centered
   card and is untouched. */
(function () {
  var sheet = document.querySelector("#recipeModal .modal");
  var body = sheet.querySelector(".modal-body");
  var startY = 0, deltaY = 0, dragging = false, fromHandle = false;
  function isSheet() { return window.matchMedia("(max-width: 640px)").matches; }
  sheet.addEventListener("touchstart", function (e) {
    if (!isSheet() || e.touches.length !== 1) return;
    fromHandle = e.target.classList.contains("sheet-handle");
    if (!fromHandle && body.scrollTop > 0) return;
    startY = e.touches[0].clientY; deltaY = 0; dragging = true;
    sheet.style.transition = "none";
  }, { passive: true });
  sheet.addEventListener("touchmove", function (e) {
    if (!dragging) return;
    deltaY = e.touches[0].clientY - startY;
    if (deltaY <= 0) { deltaY = 0; return; }
    e.preventDefault();
    sheet.style.transform = "translateY(" + deltaY + "px)";
  }, { passive: false });
  sheet.addEventListener("touchend", function () {
    if (!dragging) return;
    dragging = false;
    sheet.style.transition = "transform 0.22s ease";
    if (deltaY > 120) {
      sheet.style.transform = "translateY(100%)";
      setTimeout(closeRecipe, 180);
    } else {
      sheet.style.transform = "";
    }
    deltaY = 0;
  });
})();
$("randomizeBtn").addEventListener("click", randomizeWeek);
$("prevWeekBtn").addEventListener("click", function () { switchWeek(addDaysISO(currentWeekStart, -7)); });
$("nextWeekBtn").addEventListener("click", function () { switchWeek(addDaysISO(currentWeekStart, 7)); });
$("groceryPrevWeekBtn").addEventListener("click", function () { switchWeek(addDaysISO(currentWeekStart, -7)); });
$("groceryNextWeekBtn").addEventListener("click", function () { switchWeek(addDaysISO(currentWeekStart, 7)); });
$("plannerWeekLabel").addEventListener("click", goToCurrentWeek);
$("groceryWeekLabel").addEventListener("click", goToCurrentWeek);
$("undoBtn").addEventListener("click", undoWeek);
$("plannerJumpDate").addEventListener("change", function () { jumpToDate(this.value); });
$("groceryJumpDate").addEventListener("change", function () { jumpToDate(this.value); });
$("clearWeekBtn").addEventListener("click", function () {
  takeUndoSnapshot();
  weekState = defaultState();
  saveWeek();
  refreshPopularityAndRerender();
  renderPlanner(); renderGrocery();
  toast("Week cleared");
});
/* Clear just this week's list: uncheck everything and remove items added
   by hand. The week's meals stay, so the recipe list rebuilds intact.
   Snapshotted first, so Clear list can be undone like Clear week. */
$("clearListBtn").addEventListener("click", function () {
  takeUndoSnapshot();
  weekState.checked = [];
  weekState.extras = [];
  saveWeek();
  renderGrocery();
  toast("List cleared — checks and added items reset");
});
$("groceryUndoBtn").addEventListener("click", undoWeek);
$("copyWeekImageBtn").addEventListener("click", copyWeekImage);
$("copyListBtn").addEventListener("click", function () {
  copyTextToClipboard(exportText(), "List copied — paste it into Notes");
});
function addExtraItem() {
  var input = $("extraItemInput");
  var name = input.value.trim();
  if (!name) return;
  if (!Array.isArray(weekState.extras)) weekState.extras = [];
  var exists = weekState.extras.some(function (ex) { return ex.name.toLowerCase() === name.toLowerCase(); });
  if (exists) { toast("Already on the list"); return; }
  var picked = $("extraSectionSelect").value;
  weekState.extras.push({ name: name, section: picked === "Auto" ? sectionForItem(name) : picked });
  input.value = "";
  saveWeek();
  renderGrocery();
  toast(name + " added to the list");
}
$("addExtraBtn").addEventListener("click", addExtraItem);
$("extraItemInput").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); addExtraItem(); } });
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
  renderSkeletons(); // the page starts empty — hold its shape while loading
  await loadWeek();
  try {
    var custom = await WeekSync.loadCustomRecipes();
    if (custom && custom.length) RECIPES = RECIPES.concat(custom);
  } catch (e) {}
  await refreshPopularity();
  renderRecipes();
  await renderWeekNav();
  renderUndo();
  renderPlanner();
  renderGrocery();
})();
