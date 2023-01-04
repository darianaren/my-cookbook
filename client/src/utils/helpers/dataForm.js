import dairyFreeDark from "../../assets/diets/dark-dairy-free.png";
import dairyFreeLight from "../../assets/diets/light-dairy-free.png";
import fodmapDark from "../../assets/diets/dark-fodmap.png";
import fodmapLight from "../../assets/diets/light-fodmap.png";
import glutenFreeDark from "../../assets/diets/dark-gluten-free.png";
import glutenFreeLight from "../../assets/diets/light-gluten-free.png";
import ketoDark from "../../assets/diets/dark-keto.png";
import ketoLight from "../../assets/diets/light-keto.png";
import paleoDark from "../../assets/diets/dark-paleo.png";
import paleoLight from "../../assets/diets/light-paleo.png";
import pescatarianDark from "../../assets/diets/dark-pescatarian.png";
import pescatarianLight from "../../assets/diets/light-pescatarian.png";
import primalDark from "../../assets/diets/dark-primal.png";
import primalLight from "../../assets/diets/light-primal.png";
import veganDark from "../../assets/diets/dark-vegan.png";
import veganLight from "../../assets/diets/light-vegan.png";
import vegetarianDark from "../../assets/diets/dark-vegetarian.png";
import vegetarianLight from "../../assets/diets/light-vegetarian.png";
import wholeDark from "../../assets/diets/dark-whole30.png";
import wholeLight from "../../assets/diets/light-whole30.png";

export const cuisinesInfo = ["African", "American", "Asian", "European"];

export const dishTypesInfo = [
  { name: "Morning meal", alias: "morning meal" },
  { name: "Breakfast", alias: "breakfast" },
  { name: "Brunch", alias: "brunch" },
  { name: "Lunch", alias: "lunch" },
  { name: "Main dish", alias: "main dish" },
  { name: "Side dish", alias: "side dish" },
  { name: "Snack", alias: "snack" },
  { name: "Dinner", alias: "dinner" },
  { name: "Beverage or drink", alias: "drink - beverage" },
];

export const occasionsInfo = [
  { name: "Fall", alias: "fall" },
  { name: "Winter", alias: "winter" },
  { name: "Summer", alias: "summer" },
  { name: "Spring", alias: "spring" },
  { name: "4th of july", alias: "4th of july" },
  { name: "Super bowl", alias: "super bowl" },
  { name: "Mother's day", alias: "mother's day" },
  { name: "Father's day", alias: "father's day" },
  { name: "Children's day", alias: "children's day" },
  { name: "Thanksgiving", alias: "thanksgiving" },
  { name: "Christmas", alias: "christmas" },
  { name: "Valentine's day", alias: "valentine's day" },
];

export const dietsName = {
  "gluten free": "Gluten free",
  "dairy free": "Dairy free",
  "lacto ovo vegetarian": "Vegetarian",
  vegan: "Vegan",
  pescatarian: "Pescatarian",
  paleolithic: "Paleolithic",
  primal: "Primal",
  ketogenic: "Ketogenic",
  "whole 30": "Whole 30",
  "fodmap friendly": "Low FODMAP",
};

export const dietsInfo = [
  {
    name: "Gluten free",
    alias: "gluten free",
    dark: glutenFreeDark,
    light: glutenFreeLight,
    summary:
      "The consumption of gluten is not allowed. Gluten is a protein found in wheat, barley, rye and any of its varieties and hybrids.",
    description:
      "The gluten-free diet consists of a dietary regime in which gluten, a protein present in wheat, oats, barley and rye and which can also be found in other products such as medicines, vitamins or supplements, is avoided. Generally, adaptation to this diet occurs for medical reasons, such as celiac disease, non-celiac gluten sensitivity, wheat allergy. A gluten-free diet can also be followed as a weight loss measure, although in this case it is not indicated because of the health consequences it may have.",
  },
  {
    name: "Dairy free",
    alias: "dairy free",
    dark: dairyFreeDark,
    light: dairyFreeLight,
    summary:
      "Foods containing lactose (milk, cheese, cream, ice cream, etc.) are not allowed.",
    description:
      "A dairy-free diet is based on eating foods that do not contain lactose. Products such as milk, cheeses, creams, ice cream, among others, should be avoided. These products can be replaced by: lactose-free milk, such as almond milk, soy milk, rice milk or others; non-dairy creams and some breads made without milk; lactose-free pasta, noodles, macaroni and many other options.",
  },
  {
    name: "Vegetarian",
    alias: "lacto ovo vegetarian",
    dark: vegetarianDark,
    light: vegetarianLight,
    summary:
      "No meat or fish consumption is allowed. Milk, eggs, honey and others are allowed.",
    description:
      "The vegetarian diet consists of not consuming meat or fish. Vegetarians can eat dairy products, eggs, honey and other derivatives that do not involve the slaughter of animals. However, there are several variations of the vegetarian diet. For example, some vegetarians choose to eat eggs, but not dairy products.",
  },
  {
    name: "Vegan",
    alias: "vegan",
    dark: veganDark,
    light: veganLight,
    summary:
      "The consumption of meat, fish and animal products, including dairy products, eggs, honey and other animal products is not allowed.",
    description:
      'Both vegetarians and vegans choose not to eat meat and fish. However, veganism is a stricter form of vegetarianism that prohibits the consumption or use of any products that come from animals, including dairy, eggs, honey, leather goods, wool and silk. This diet generally includes a wide variety of fruits, vegetables, nuts, seeds, grains and legumes, as well as "meat substitutes" derived from these types of foods.',
  },
  {
    name: "Pescatarian",
    alias: "pescatarian",
    dark: pescatarianDark,
    light: pescatarianLight,
    summary:
      "Meat consumption is not allowed, but fish and animal products are allowed.",
    description:
      "The pescetarian diet is very similar to the vegetarian diet, what differentiates them is that pescetarians are the group of people who do not eat meat but fish. This does not mean that they eat only fish. They can consume a wide variety of foods. Many people choose the pescetarian diet as a transition to vegetarianism or veganism. It is a very good option for people who want to reduce their meat consumption.",
  },
  {
    name: "Paleolithic",
    alias: "paleolithic",
    dark: paleoDark,
    light: paleoLight,
    summary:
      "The consumption of legumes (beans, lentils, etc.), grains, dairy products, refined sugar and processed foods is not allowed.",
    description:
      "A Paleolithic diet is an eating plan based on foods that humans may have consumed during the Paleolithic era. A modern Paleolithic diet includes fruits, vegetables, lean meats, fish, eggs, nuts and seeds. These are foods that in the past people could find by hunting and gathering. It does not include foods that became more common when small-scale agriculture began 10,000 years ago, such as grains, legumes, dairy products and others.",
  },
  {
    name: "Primal",
    alias: "primal",
    dark: primalDark,
    light: primalLight,
    summary:
      "The consumption of legumes (beans, lentils, etc.), grains, refined sugar and processed foods is not allowed.",
    description:
      "The primal diet and the paleolithic diet have many similarities but, even so, there are significant differences between the two. Unlike the Paleo diet, the primal diet recommends the consumption of raw milk with high fat content, you can also eat any vegetable and even a hot cup of coffee is not a disadvantage.",
  },
  {
    name: "Ketogenic",
    alias: "ketogenic",
    dark: ketoDark,
    light: ketoLight,
    summary:
      "Carbohydrate-rich foods are not allowed. Foods rich in fat and protein are acceptable.",
    description:
      "The name refers to the fact that it is a dietary model whose objective is the creation of ketone bodies. These ketone bodies are metabolic compounds generated in the body in response to a lack of energy reserves. In general terms, foods rich in fats and proteins are acceptable and foods rich in carbohydrates are not.",
  },
  {
    name: "Whole 30",
    alias: "whole 30",
    dark: wholeDark,
    light: wholeLight,
    summary:
      "Non-permitted ingredients include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy products, alcohol, grains, legumes (except green beans, peas and peas) and food additives, such as carrageenan, monosodium glutamate and sulfites.",
    description:
      'This diet was created by Melissa Hartwig and has helped many people say no to junk food and yes to real foods that our bodies thrive on. The general gist is to eat real foods for 30 days and avoid the harmful foods on the Whole30 "ban list." The goal is to eliminate the harmful and inflammatory foods found in the Standard American Diet while nourishing the body with healthy, real foods.',
  },
  {
    name: "FODMAP friendly",
    alias: "fodmap friendly",
    dark: fodmapDark,
    light: fodmapLight,
    summary:
      "The consumption of any fruits, vegetables, dairy products, legumes, cereals, nuts, honey, corn syrup or fructose, artificial sweeteners, barbecue sauce, ketchup and fiber supplements is not allowed.",
    description:
      "FODMAP is an acronym or abbreviation composed of the words Fermentable Oligosaccharides Disaccharides Monosaccharides and Polyols. When we talk about FODMAP diet it is really a therapeutic tool that we apply in certain cases and that consists of eliminating these components from the diet. This diet does not allow the consumption of any fruits, vegetables, dairy products, legumes, cereals, nuts, honey, corn syrup or fructose, artificial sweeteners, barbecue sauce, ketchup and fiber supplements.",
  },
];

export const orderInfo = [
  { name: "Alphabetical A-Z", alias: "az" },
  { name: "Alphabetical Z-A", alias: "za" },
  { name: "More healthy", alias: "high" },
  { name: "Less healthy", alias: "less" },
  { name: "Quick to prepare", alias: "quick" },
  { name: "Slow to prepare", alias: "slow" },
];

export const typeInfo = [
  { name: "All", alias: "all" },
  { name: "Created by users", alias: "db" },
  { name: "Pre-existing", alias: "api" },
];
