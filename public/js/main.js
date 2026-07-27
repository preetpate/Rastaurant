/* Prime Restaurant — site interactions */
(function () {
  "use strict";

  /* ============================================================
     MENU DATA
  ============================================================ */
  const MENU = {
    italian: [
      { name:"Margherita Pizza", price:249, desc:"Classic tomato base, mozzarella, fresh basil & olive oil.", tag:"veg", img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80", extras:["Extra Cheese ₹49","Jalapeños ₹29","Olives ₹29"] },
      { name:"Farmhouse Pizza", price:349, desc:"Capsicum, onion, tomato, sweet corn, mushrooms on herbed base.", tag:"veg", img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", extras:["Extra Cheese ₹49","Extra Veggies ₹39"] },
      { name:"Veg Supreme Pizza", price:399, desc:"Loaded with 7 premium vegetables, cheese burst option.", tag:"veg", img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80", extras:["Cheese Burst ₹69","Extra Cheese ₹49"] },
      { name:"Pepperoni Pizza", price:449, desc:"Spicy pepperoni, mozzarella, rich tomato sauce, oregano.", tag:"nonveg", img:"https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80", extras:["Extra Pepperoni ₹79","Extra Cheese ₹49"] },
      { name:"Pasta Alfredo", price:299, desc:"Creamy white sauce pasta with garlic, parmesan & herbs.", tag:"veg", img:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80", extras:["Grilled Chicken ₹89","Mushrooms ₹39"] },
      { name:"Pasta Arrabbiata", price:279, desc:"Spicy tomato sauce, garlic, red chillies, penne.", tag:"veg", img:"https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=600&q=80", extras:["Grilled Chicken ₹89"] },
      { name:"Lasagna", price:399, desc:"Layered pasta, rich bolognese, béchamel sauce, melted cheese.", tag:"nonveg", img:"https://images.unsplash.com/photo-1619895092538-128341789043?w=600&q=80", extras:["Extra Cheese ₹49"] },
      { name:"Garlic Bread", price:149, desc:"Toasted bread with garlic butter and herbs. Perfect starter.", tag:"veg", img:"https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=600&q=80", extras:["Cheese Dip ₹39"] },
      { name:"Cheese Garlic Bread", price:199, desc:"Crispy garlic bread loaded with melted mozzarella.", tag:"veg", img:"https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=600&q=80", extras:["Extra Cheese ₹49"] },
      { name:"Mushroom Risotto", price:349, desc:"Arborio rice, wild mushrooms, parmesan, white wine, truffle oil.", tag:"veg", img:"https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80", extras:["Grilled Chicken ₹89"] }
    ],
    punjabi: [
      { name:"Butter Chicken", price:399, desc:"Tandoori chicken in rich tomato-cream gravy, fenugreek & naan.", tag:"nonveg", img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80", extras:["Extra Naan ₹50","Extra Gravy ₹49"] },
      { name:"Kadai Chicken", price:369, desc:"Chicken cooked in kadai with capsicum, tomato & whole spices.", tag:"nonveg", img:"https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600&q=80", extras:["Extra Naan ₹50","Raita ₹49"] },
      { name:"Chicken Tikka Masala", price:389, desc:"Grilled chicken tikka in spiced onion-tomato masala gravy.", tag:"nonveg", img:"https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80", extras:["Extra Naan ₹50","Extra Gravy ₹49"] },
      { name:"Paneer Butter Masala", price:289, desc:"Soft paneer in velvety tomato-butter gravy with cream.", tag:"veg", img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80", extras:["Extra Naan ₹50","Extra Paneer ₹69"] },
      { name:"Shahi Paneer", price:279, desc:"Paneer cubes in rich cashew-cream gravy, royal Mughlai style.", tag:"veg", img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80", extras:["Extra Naan ₹50","Extra Paneer ₹69"] },
      { name:"Dal Makhani", price:249, desc:"Black lentils slow-cooked overnight in butter, cream & spices.", tag:"veg", img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80", extras:["Extra Naan ₹50","Raita ₹49"] },
      { name:"Chole Bhature", price:199, desc:"Spiced chickpea curry with fluffy deep-fried bhature.", tag:"veg", img:"https://images.unsplash.com/photo-1626132647523-66c7f06e5e0f?w=600&q=80", extras:["Extra Bhatura ₹39","Pickle ₹19"] },
      { name:"Amritsari Kulcha", price:189, desc:"Stuffed tandoor bread with spiced potato filling & chole.", tag:"veg", img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", extras:["Extra Kulcha ₹59","Butter ₹19"] },
      { name:"Tandoori Roti", price:30, desc:"Whole wheat bread baked fresh in clay tandoor.", tag:"veg", img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80", extras:["With Butter ₹10"] },
      { name:"Butter Naan", price:50, desc:"Soft leavened bread cooked in tandoor, brushed with butter.", tag:"veg", img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", extras:["Garlic Naan +₹10","Extra Butter ₹10"] }
    ],
    gujarati: [
      { name:"Gujarati Thali", price:349, desc:"Complete thali: dal, sabzi, roti, rice, papad, pickle & sweet.", tag:"veg", img:"https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&q=80", extras:["Extra Roti ₹30","Extra Sweet ₹39"] },
      { name:"Sev Tameta", price:199, desc:"Tangy tomato curry topped with crunchy sev. Gujarati classic.", tag:"veg", img:"https://images.unsplash.com/photo-1626132647523-66c7f06e5e0f?w=600&q=80", extras:["Extra Roti ₹30"] },
      { name:"Ringan no Olo", price:219, desc:"Smoky roasted brinjal mash cooked with spices, onions & tomatoes.", tag:"veg", img:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80", extras:["Extra Roti ₹30"] },
      { name:"Undhiyu", price:299, desc:"Traditional mixed vegetable curry — festive Gujarati special.", tag:"veg", img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80", extras:["Extra Puri ₹29"] },
      { name:"Dhokla", price:129, desc:"Steamed fermented chickpea batter with mustard & curry leaf tadka.", tag:"veg", img:"https://images.unsplash.com/photo-1630409351217-bc4fa6422075?w=600&q=80", extras:["Extra Chutney ₹19"] },
      { name:"Khaman", price:119, desc:"Soft spongy chickpea snack with green chilli-ginger tempering.", tag:"veg", img:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80", extras:["Extra Chutney ₹19"] },
      { name:"Khandvi", price:149, desc:"Delicate gram flour rolls with coconut, sesame & mustard seeds.", tag:"veg", img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80", extras:[] },
      { name:"Thepla", price:99, desc:"Spiced fenugreek flatbread — best with pickle & yoghurt.", tag:"veg", img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80", extras:["Pickle ₹19","Yoghurt ₹29"] },
      { name:"Fafda Jalebi", price:179, desc:"Crispy chickpea fafda with hot spiral jalebi. Gujarati breakfast.", tag:"veg", img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80", extras:["Extra Jalebi ₹49"] },
      { name:"Kadhi Khichdi", price:199, desc:"Smooth yoghurt kadhi with moong dal khichdi & ghee drizzle.", tag:"veg", img:"https://images.unsplash.com/photo-1576577445504-6af96477db52?w=600&q=80", extras:["Extra Ghee ₹19","Papad ₹19"] }
    ],
    mexican: [
      { name:"Veg Tacos (2 pcs)", price:229, desc:"Crispy corn tortilla, spiced veggies, guacamole, sour cream.", tag:"veg", img:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80", extras:["Extra Taco ₹79","Extra Guacamole ₹39"] },
      { name:"Chicken Tacos (2 pcs)", price:279, desc:"Grilled chicken, pico de gallo, guacamole, jalapeños.", tag:"nonveg", img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80", extras:["Extra Taco ₹89","Extra Chicken ₹69"] },
      { name:"Burrito Bowl", price:329, desc:"Rice, seasoned beans, corn salsa, cheese, sour cream & salad.", tag:"veg", img:"https://images.unsplash.com/photo-1543340904-0df8e4e2e2a6?w=600&q=80", extras:["Add Chicken ₹89","Extra Cheese ₹39"] },
      { name:"Veg Burrito", price:299, desc:"Flour tortilla wrapped with rice, beans, peppers, cheese & salsa.", tag:"veg", img:"https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80", extras:["Extra Cheese ₹39","Sour Cream ₹29"] },
      { name:"Chicken Burrito", price:349, desc:"Grilled chicken, Mexican rice, black beans in a large flour tortilla.", tag:"nonveg", img:"https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600&q=80", extras:["Extra Chicken ₹69","Extra Cheese ₹39"] },
      { name:"Nachos with Cheese", price:249, desc:"Crispy tortilla chips, nacho cheese sauce, jalapeños & salsa.", tag:"veg", img:"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&q=80", extras:["Guacamole ₹49","Sour Cream ₹29"] },
      { name:"Quesadilla", price:299, desc:"Grilled flour tortilla with cheese, peppers & spiced filling.", tag:"veg", img:"https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=600&q=80", extras:["Add Chicken ₹89","Extra Cheese ₹39"] },
      { name:"Mexican Rice", price:229, desc:"Flavourful tomato-spiced rice with corn, beans & herbs.", tag:"veg", img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80", extras:[] },
      { name:"Enchiladas", price:349, desc:"Corn tortillas rolled with filling, topped with red chilli sauce & cheese.", tag:"nonveg", img:"https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=600&q=80", extras:["Extra Cheese ₹39"] },
      { name:"Churros", price:179, desc:"Crispy cinnamon-sugar fried dough with warm chocolate dip.", tag:"veg", img:"https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80", extras:["Extra Dip ₹29"] }
    ],
    beverages: [
      { name:"Mineral Water", price:30, desc:"Chilled packaged mineral water, 500ml.", tag:"veg", img:"https://images.unsplash.com/photo-1560023907-5f339617ea30?w=600&q=80", extras:[] },
      { name:"Coca Cola", price:60, desc:"Chilled Coca Cola, 300ml bottle.", tag:"veg", img:"https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=80", extras:[] },
      { name:"Pepsi", price:60, desc:"Chilled Pepsi, 300ml bottle.", tag:"veg", img:"https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80", extras:[] },
      { name:"Sprite", price:60, desc:"Chilled Sprite, 300ml bottle.", tag:"veg", img:"https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&q=80", extras:[] },
      { name:"Fresh Lime Soda", price:89, desc:"Freshly squeezed lime with soda — sweet, salted or masala.", tag:"veg", img:"https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&q=80", extras:["Sweet","Salted","Masala"] },
      { name:"Cold Coffee", price:149, desc:"Strong espresso blended with cold milk, ice & hint of vanilla.", tag:"veg", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80", extras:["Extra Shot ₹29","Whipped Cream ₹29"] },
      { name:"Mango Shake", price:169, desc:"Fresh Alphonso mango blended with chilled full-fat milk.", tag:"veg", img:"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80", extras:["Extra Scoop ₹39"] },
      { name:"Sweet Lassi", price:129, desc:"Chilled creamy yoghurt drink lightly sweetened with sugar.", tag:"veg", img:"https://images.unsplash.com/photo-1571197800987-72ee24cbbf3d?w=600&q=80", extras:["Rose Flavour ₹19"] },
      { name:"Masala Chaas", price:79, desc:"Salted buttermilk with roasted cumin, coriander & green chilli.", tag:"veg", img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80", extras:[] },
      { name:"Mojito", price:159, desc:"Fresh mint, lime, sugar, soda — zero proof and super refreshing.", tag:"veg", img:"https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80", extras:["Strawberry ₹19","Passion Fruit ₹19"] }
    ],
    desserts: [
      { name:"Gulab Jamun", price:99, desc:"Soft milk-solid dumplings soaked in rose-cardamom sugar syrup.", tag:"veg", img:"https://images.unsplash.com/photo-1666290596543-ceba72a4cbf1?w=600&q=80", extras:["With Ice Cream ₹49"] },
      { name:"Ice Cream", price:129, desc:"2 scoops — Vanilla, Chocolate or Strawberry.", tag:"veg", img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80", extras:["Extra Scoop ₹49","Hot Fudge ₹29"] },
      { name:"Brownie with Ice Cream", price:199, desc:"Warm fudge brownie with vanilla ice cream & chocolate sauce.", tag:"veg", img:"https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80", extras:["Extra Ice Cream ₹49","Caramel ₹29"] },
      { name:"Chocolate Lava Cake", price:179, desc:"Molten chocolate centre cake with vanilla ice cream.", tag:"veg", img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80", extras:["Extra Ice Cream ₹49"] },
      { name:"Tiramisu", price:299, desc:"Espresso-soaked savoiardi, mascarpone cream, cocoa dusting.", tag:"veg", img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80", extras:[] },
      { name:"Cheesecake", price:279, desc:"New York style baked cheesecake with berry compote.", tag:"veg", img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80", extras:["Berry Compote ₹29","Caramel ₹29"] },
      { name:"Rasmalai", price:149, desc:"Soft cottage cheese patties in chilled saffron-cardamom milk.", tag:"veg", img:"https://images.unsplash.com/photo-1571197800987-72ee24cbbf3d?w=600&q=80", extras:[] },
      { name:"Falooda", price:179, desc:"Rose milk, basil seeds, vermicelli, ice cream — Indian classic.", tag:"veg", img:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80", extras:["Extra Scoop ₹49"] }
    ]
  };
    punjabi: [
      { name:"Butter Chicken", price:399, desc:"Tandoori chicken in rich tomato-cream gravy, fenugreek & naan.", tag:"nonveg", img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80", extras:["Extra Naan ₹50","Extra Gravy ₹49"] },
      { name:"Kadai Chicken", price:369, desc:"Chicken cooked in kadai with capsicum, tomato & whole spices.", tag:"nonveg", img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80", extras:["Extra Naan ₹50","Raita ₹49"] },
      { name:"Chicken Tikka Masala", price:389, desc:"Grilled chicken tikka in spiced onion-tomato masala gravy.", tag:"nonveg", img:"https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80", extras:["Extra Naan ₹50","Extra Gravy ₹49"] },
      { name:"Paneer Butter Masala", price:289, desc:"Soft paneer in velvety tomato-butter gravy with cream.", tag:"veg", img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80", extras:["Extra Naan ₹50","Extra Paneer ₹69"] },
      { name:"Shahi Paneer", price:279, desc:"Paneer cubes in rich cashew-cream gravy, royal Mughlai style.", tag:"veg", img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80", extras:["Extra Naan ₹50","Extra Paneer ₹69"] },
      { name:"Dal Makhani", price:249, desc:"Black lentils slow-cooked overnight in butter, cream & spices.", tag:"veg", img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80", extras:["Extra Naan ₹50","Raita ₹49"] },
      { name:"Chole Bhature", price:199, desc:"Spiced chickpea curry with fluffy deep-fried bhature. Classic!", tag:"veg", img:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", extras:["Extra Bhatura ₹39","Pickle ₹19"] },
      { name:"Amritsari Kulcha", price:189, desc:"Stuffed tandoor bread with spiced potato filling & chole.", tag:"veg", img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80", extras:["Extra Kulcha ₹59","Butter ₹19"] },
      { name:"Tandoori Roti", price:30, desc:"Whole wheat bread baked fresh in clay tandoor.", tag:"veg", img:"https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80", extras:["With Butter ₹10"] },
      { name:"Butter Naan", price:50, desc:"Soft leavened bread cooked in tandoor, brushed with butter.", tag:"veg", img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", extras:["Garlic Naan ₹10 extra","Extra Butter ₹10"] }
    ],
    gujarati: [
      { name:"Gujarati Thali", price:349, desc:"Complete thali: dal, sabzi, roti, rice, papad, pickle & sweet.", tag:"veg", img:"https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80", extras:["Extra Roti ₹30","Extra Sweet ₹39"] },
      { name:"Sev Tameta", price:199, desc:"Tangy tomato curry topped with crunchy sev. Gujarati classic.", tag:"veg", img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80", extras:["Extra Roti ₹30"] },
      { name:"Ringan no Olo", price:219, desc:"Smoky roasted brinjal mash cooked with spices, onions & tomatoes.", tag:"veg", img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", extras:["Extra Roti ₹30"] },
      { name:"Undhiyu", price:299, desc:"Traditional mixed vegetable curry cooked upside down — festive special.", tag:"veg", img:"https://images.unsplash.com/photo-1627662168223-7df99068099a?auto=format&fit=crop&w=600&q=80", extras:["Extra Puri ₹29"] },
      { name:"Dhokla", price:129, desc:"Steamed fermented chickpea batter with mustard & curry leaf tadka.", tag:"veg", img:"https://images.unsplash.com/photo-1630409351217-bc4fa6422075?auto=format&fit=crop&w=600&q=80", extras:["Extra Chutney ₹19"] },
      { name:"Khaman", price:119, desc:"Soft spongy chickpea snack with green chilli-ginger tempering.", tag:"veg", img:"https://images.unsplash.com/photo-1630409346824-4f70c59d3737?auto=format&fit=crop&w=600&q=80", extras:["Extra Chutney ₹19"] },
      { name:"Khandvi", price:149, desc:"Delicate gram flour rolls with coconut, sesame & mustard seeds.", tag:"veg", img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80", extras:[] },
      { name:"Thepla", price:99, desc:"Spiced fenugreek flatbread — best with pickle & yoghurt.", tag:"veg", img:"https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80", extras:["Pickle ₹19","Yoghurt ₹29"] },
      { name:"Fafda Jalebi", price:179, desc:"Crispy chickpea fafda with hot spiral jalebi. Gujarati breakfast.", tag:"veg", img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80", extras:["Extra Jalebi ₹49"] },
      { name:"Kadhi Khichdi", price:199, desc:"Smooth yoghurt kadhi with moong dal khichdi & ghee drizzle.", tag:"veg", img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80", extras:["Extra Ghee ₹19","Papad ₹19"] }
    ],
    mexican: [
      { name:"Veg Tacos (2 pcs)", price:229, desc:"Crispy corn tortilla, spiced veggies, guacamole, sour cream.", tag:"veg", img:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80", extras:["Extra Taco ₹79","Extra Guacamole ₹39"] },
      { name:"Chicken Tacos (2 pcs)", price:279, desc:"Grilled chicken, pico de gallo, guacamole, jalapeños.", tag:"nonveg", img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80", extras:["Extra Taco ₹89","Extra Chicken ₹69"] },
      { name:"Burrito Bowl", price:329, desc:"Rice, seasoned beans, corn salsa, cheese, sour cream & salad.", tag:"veg", img:"https://images.unsplash.com/photo-1543340904-0df8e4e2e2a6?auto=format&fit=crop&w=600&q=80", extras:["Add Chicken ₹89","Extra Cheese ₹39"] },
      { name:"Veg Burrito", price:299, desc:"Flour tortilla wrapped with rice, beans, peppers, cheese & salsa.", tag:"veg", img:"https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80", extras:["Extra Cheese ₹39","Sour Cream ₹29"] },
      { name:"Chicken Burrito", price:349, desc:"Grilled chicken, Mexican rice, black beans in a large flour tortilla.", tag:"nonveg", img:"https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=600&q=80", extras:["Extra Chicken ₹69","Extra Cheese ₹39"] },
      { name:"Nachos with Cheese", price:249, desc:"Crispy tortilla chips, nacho cheese sauce, jalapeños & salsa.", tag:"veg", img:"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80", extras:["Guacamole ₹49","Sour Cream ₹29"] },
      { name:"Quesadilla", price:299, desc:"Grilled flour tortilla with cheese, peppers & spiced filling.", tag:"veg", img:"https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80", extras:["Add Chicken ₹89","Extra Cheese ₹39"] },
      { name:"Mexican Rice", price:229, desc:"Flavourful tomato-spiced rice with corn, beans & herbs.", tag:"veg", img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80", extras:[] },
      { name:"Enchiladas", price:349, desc:"Corn tortillas rolled with filling, topped with red chilli sauce & cheese.", tag:"nonveg", img:"https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=600&q=80", extras:["Extra Cheese ₹39"] },
      { name:"Churros", price:179, desc:"Crispy cinnamon-sugar fried dough with warm chocolate dip.", tag:"veg", img:"https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=600&q=80", extras:["Extra Dip ₹29"] }
    ],
    beverages: [
      { name:"Mineral Water", price:30, desc:"Chilled packaged mineral water, 500ml.", tag:"veg", img:"https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=600&q=80", extras:[] },
      { name:"Coca Cola", price:60, desc:"Chilled Coca Cola, 300ml bottle.", tag:"veg", img:"https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=600&q=80", extras:[] },
      { name:"Pepsi", price:60, desc:"Chilled Pepsi, 300ml bottle.", tag:"veg", img:"https://images.unsplash.com/photo-1553456558-aff63285bdd1?auto=format&fit=crop&w=600&q=80", extras:[] },
      { name:"Sprite", price:60, desc:"Chilled Sprite, 300ml bottle.", tag:"veg", img:"https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80", extras:[] },
      { name:"Fresh Lime Soda", price:89, desc:"Freshly squeezed lime with soda — sweet, salted or masala.", tag:"veg", img:"https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?auto=format&fit=crop&w=600&q=80", extras:["Sweet","Salted","Masala"] },
      { name:"Cold Coffee", price:149, desc:"Strong espresso blended with cold milk, ice & hint of vanilla.", tag:"veg", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80", extras:["Extra Shot ₹29","Whipped Cream ₹29"] },
      { name:"Mango Shake", price:169, desc:"Fresh Alphonso mango blended with chilled full-fat milk.", tag:"veg", img:"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=600&q=80", extras:["Extra Scoop ₹39"] },
      { name:"Sweet Lassi", price:129, desc:"Chilled creamy yoghurt drink lightly sweetened with sugar.", tag:"veg", img:"https://images.unsplash.com/photo-1571197800987-72ee24cbbf3d?auto=format&fit=crop&w=600&q=80", extras:["Rose Flavour ₹19"] },
      { name:"Masala Chaas", price:79, desc:"Salted buttermilk with roasted cumin, coriander & green chilli.", tag:"veg", img:"https://images.unsplash.com/photo-1626500155208-9e53e10e46e5?auto=format&fit=crop&w=600&q=80", extras:[] },
      { name:"Mojito", price:159, desc:"Fresh mint, lime, sugar, soda — zero proof and super refreshing.", tag:"veg", img:"https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80", extras:["Strawberry ₹19","Passion Fruit ₹19"] }
    ],
    desserts: [
      { name:"Gulab Jamun", price:99, desc:"Soft milk-solid dumplings soaked in rose-cardamom sugar syrup.", tag:"veg", img:"https://images.unsplash.com/photo-1605197584547-a51b2c5c4cbb?auto=format&fit=crop&w=600&q=80", extras:["With Ice Cream ₹49"] },
      { name:"Ice Cream", price:129, desc:"2 scoops — choose from Vanilla, Chocolate or Strawberry.", tag:"veg", img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80", extras:["Extra Scoop ₹49","Hot Fudge ₹29"] },
      { name:"Brownie with Ice Cream", price:199, desc:"Warm fudge brownie topped with vanilla ice cream & chocolate sauce.", tag:"veg", img:"https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=600&q=80", extras:["Extra Ice Cream ₹49","Caramel Sauce ₹29"] },
      { name:"Chocolate Lava Cake", price:179, desc:"Molten chocolate centre cake with vanilla ice cream on the side.", tag:"veg", img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80", extras:["Extra Ice Cream ₹49"] },
      { name:"Tiramisu", price:299, desc:"Espresso-soaked savoiardi, mascarpone cream, cocoa dusting.", tag:"veg", img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80", extras:[] },
      { name:"Cheesecake", price:279, desc:"New York style baked cheesecake with berry compote.", tag:"veg", img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80", extras:["Berry Compote ₹29","Caramel ₹29"] },
      { name:"Rasmalai", price:149, desc:"Soft cottage cheese patties in chilled saffron-cardamom milk.", tag:"veg", img:"https://images.unsplash.com/photo-1609349093661-a849a60da5ab?auto=format&fit=crop&w=600&q=80", extras:[] },
      { name:"Falooda", price:179, desc:"Rose milk, basil seeds, vermicelli, ice cream — Indian classic.", tag:"veg", img:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", extras:["Extra Scoop ₹49"] }
    ]
  };

  const REVIEWS = [
    { quote: "Butter Chicken aur Dal Makhani — life mein pehli baar itna authentic khana khaya. Dil khush ho gaya!", author: "Rahul Sharma · Google Review ★★★★★" },
    { quote: "Gujarati Thali is unmatched — just like ghar ka khana. Best restaurant in town!", author: "Priya Mehta · Zomato Review ★★★★★" },
    { quote: "Pizza aur Tacos dono lajawaab the. Family trip tha, sab ne enjoy kiya. Will come back!", author: "Vikram & Family · Regular Guests" },
    { quote: "QR se order kiya, 15 minute mein fresh hot food table pe — service is top class!", author: "Neha Patel · Swiggy Review ★★★★★" }
  ];

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  window.PRIME_MENU = MENU;

  /* ============================================================
     VEG/NON-VEG FILTER STATE
  ============================================================ */
  let vegFilter = "all"; // "all" | "veg" | "nonveg"
  let activeTab = "italian";

  /* ============================================================
     MENU RENDERING
  ============================================================ */
  function vegMark(tag) {
    if (tag === "veg")    return '<span class="veg-dot veg" title="Veg"></span>';
    if (tag === "nonveg") return '<span class="veg-dot nonveg" title="Non-Veg"></span>';
    return "";
  }

  function itemMarkup(item) {
    const extrasHtml = item.extras && item.extras.length
      ? '<p class="extras-label">Add Extras:</p>' +
        '<div class="extras-chips">' +
          item.extras.map(e =>
            '<label class="ex-chip"><input type="checkbox" data-item="' +
            item.name + '" data-extra="' + e + '"/>' + e + '</label>'
          ).join("") +
        '</div>'
      : "";

    return (
      '<article class="dish-card" data-tag="' + (item.tag || "veg") + '">' +
        '<div class="dish-img-wrap">' +
          '<img src="' + item.img + '" alt="' + item.name + '" loading="lazy"/>' +
          vegMark(item.tag) +
        '</div>' +
        '<div class="dish-info">' +
          '<h3 class="dish-name">' + item.name + '</h3>' +
          '<p class="dish-desc">' + item.desc + '</p>' +
          extrasHtml +
          '<div class="dish-foot">' +
            '<span class="dish-price">&#8377;' + item.price + '</span>' +
            '<button class="add-btn" data-name="' + item.name + '" data-price="' + item.price + '">+ Add</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderPanel(key) {
    const panel = $('[data-panel="' + key + '"]');
    if (!panel) return;
    const items = MENU[key] || [];
    const filtered = vegFilter === "all" ? items
      : items.filter(i => (vegFilter === "veg" ? i.tag === "veg" : i.tag === "nonveg"));
    panel.innerHTML = filtered.length
      ? filtered.map(itemMarkup).join("")
      : '<p class="menu-empty">No ' + vegFilter + ' items in this section.</p>';
  }

  function renderAllPanels() {
    Object.keys(MENU).forEach(renderPanel);
  }

  renderAllPanels();

  /* ============================================================
     TABS
  ============================================================ */
  $$(".cnav").forEach(function (tab) {
    tab.addEventListener("click", function () {
      activeTab = tab.dataset.tab;
      $$(".cnav").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      $$("[data-panel]").forEach(p => { p.hidden = p.dataset.panel !== activeTab; });
    });
  });

  /* ============================================================
     VEG / NON-VEG FILTER BUTTONS
  ============================================================ */
  $$(".filt").forEach(function(btn) {
    btn.addEventListener("click", function() {
      vegFilter = btn.dataset.filter;
      $$(".filt").forEach(b => b.classList.remove("all-active","veg-active","nv-active"));
      if (vegFilter === "veg")    btn.classList.add("veg-active");
      else if (vegFilter === "nonveg") btn.classList.add("nv-active");
      else btn.classList.add("all-active");
      renderAllPanels();
    });
  });

  /* ============================================================
     REVIEWS SLIDER
  ============================================================ */
  const track = $("#reviewTrack");
  const dotsWrap = $("#reviewDots");
  let current = 0;

  if (track && dotsWrap) {
    track.innerHTML = REVIEWS.map(function (r) {
      return (
        '<blockquote class="review-card">' +
          '<div class="review-stars">★★★★★</div>' +
          '<p class="review-quote">"' + r.quote + '"</p>' +
          '<footer class="review-author">' + r.author + '</footer>' +
        '</blockquote>'
      );
    }).join("");

    dotsWrap.innerHTML = REVIEWS.map(function (_, i) {
      return '<button class="dot' + (i === 0 ? " is-active" : "") +
        '" data-index="' + i + '" aria-label="Review ' + (i + 1) + '"></button>';
    }).join("");

    const go = function (index) {
      current = (index + REVIEWS.length) % REVIEWS.length;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      $$(".dot", dotsWrap).forEach(function (d, i) {
        d.classList.toggle("is-active", i === current);
      });
    };
    $("#reviewNext").addEventListener("click", function () { go(current + 1); });
    $("#reviewPrev").addEventListener("click", function () { go(current - 1); });
    dotsWrap.addEventListener("click", function (e) {
      const dot = e.target.closest(".dot");
      if (dot) go(Number(dot.dataset.index));
    });
    let revTimer = setInterval(function () { go(current + 1); }, 6000);
    const slider = $(".review-slider");
    slider.addEventListener("mouseenter", function () { clearInterval(revTimer); });
    slider.addEventListener("mouseleave", function () {
      revTimer = setInterval(function () { go(current + 1); }, 6000);
    });
  }

  /* ============================================================
     HEADER / NAV / SCROLL SPY
  ============================================================ */
  const header = $("#siteHeader");
  const nav = $("#nav");
  const navToggle = $("#navToggle");
  const toTop = $("#toTop");
  const sections = $$("main section[id]");
  const navLinks = $$(".nav-list a");

  navToggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  $$("a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const onScroll = function () {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    toTop.hidden = y < 600;
    let activeId = "";
    sections.forEach(function (s) {
      if (y >= s.offsetTop - 140) activeId = s.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + activeId);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ============================================================
     REVEAL + COUNTERS
  ============================================================ */
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
      const num = entry.target.querySelector(".stat-num");
      if (num) countUp(num);
    });
  }, { threshold: 0.05 });
  $$(".reveal").forEach(function (el) { revealObserver.observe(el); });
  // Also mark elements in viewport on load immediately
  setTimeout(function() {
    $$(".reveal").forEach(function(el) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add("visible");
    });
  }, 100);

  function countUp(el) {
    const target = Number(el.dataset.count || 0);
    const start = performance.now();
    const step = function (now) {
      const p = Math.min((now - start) / 1200, 1);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ============================================================
     RESERVATION FORM
  ============================================================ */
  const resForm = $("#reserveForm");
  const resSuccess = $("#formSuccess");
  const dateInput = $("#date");
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

  const setError = function (input, message) {
    const field = input.closest(".field");
    field.classList.toggle("invalid", Boolean(message));
    const slot = field.querySelector('[data-error-for="' + input.id + '"]');
    if (slot) slot.textContent = message || "";
  };

  if (resForm) {
    resForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let ok = true;
      const name = $("#name"), email = $("#email"), time = $("#time"), guests = $("#guests");
      if (name.value.trim().length < 2) { setError(name, "Apna naam likhein."); ok = false; } else setError(name, "");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setError(email, "Valid email chahiye."); ok = false; } else setError(email, "");
      if (!dateInput.value) { setError(dateInput, "Date chunein."); ok = false; } else setError(dateInput, "");
      if (!time.value) { setError(time, "Time chunein."); ok = false; } else setError(time, "");
      if (!guests.value) { setError(guests, "Guests chunein."); ok = false; } else setError(guests, "");
      if (!ok) return;
      resSuccess.textContent = "Shukriya, " + name.value.trim().split(" ")[0] + "! Aapki " + guests.value + " logon ke liye booking request mili. Jaldi confirm karenge.";
      resSuccess.hidden = false;
      resForm.reset();
    });
  }

  /* Newsletter */
  const newsForm = $("#newsForm");
  if (newsForm) {
    newsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const inp = $("#newsEmail"), out = $("#newsSuccess");
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inp.value.trim());
      out.textContent = ok ? "Shukriya! Aap hamare updates list mein aa gaye." : "Valid email address likhein.";
      out.hidden = false;
      if (ok) newsForm.reset();
    });
  }

  /* Footer year */
  const yr = $("#year");
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ── LIGHTBOX ── */
  document.addEventListener("click", function(e) {
    const img = e.target.closest(".dish-img-wrap img");
    if (!img) return;
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = '<button class="lightbox-close" aria-label="Close">✕</button>' +
      '<img src="' + img.src.replace("w=600","w=1200") + '" alt="' + img.alt + '"/>';
    document.body.appendChild(lb);
    document.body.classList.add("no-scroll");
    lb.addEventListener("click", function(ev) {
      if(ev.target === lb || ev.target.closest(".lightbox-close")) {
        lb.remove(); document.body.classList.remove("no-scroll");
      }
    });
    document.addEventListener("keydown", function esc(ev) {
      if(ev.key === "Escape") { lb.remove(); document.body.classList.remove("no-scroll"); document.removeEventListener("keydown", esc); }
    });
  });

})();
