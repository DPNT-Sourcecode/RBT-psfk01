import SumSolution from "./solutions/SUM/sum_solution.js";
import HelloSolution from "./solutions/HLO/hello_solution.js";
import FizzBuzzSolution from "./solutions/FIZ/fizz_buzz_solution.js";
import CheckoutSolution from "./solutions/CHK/checkout_solution.js";
import RabbitHoleSolution from "./solutions/RBT/rabbit_hole_solution.js";
import HouseOfCardsSolution from "./solutions/HOC/house_of_cards_solution.js";
import AmazingSolution from "./solutions/AMZ/amazing_solution.js";
import UltimateSolution from "./solutions/ULT/ultimate_solution.js";
import DemoRound1Solution from "./solutions/DMO/demo_round1_solution.js";
import DemoRound2Solution from "./solutions/DMO/demo_round2_solution.js";
import DemoRound3Solution from "./solutions/DMO/demo_round3_solution.js";
import DemoRound4n5Solution from "./solutions/DMO/demo_round4n5_solution.js";
import InventoryItem from "./solutions/DMO/inventory_item.js";

class EntryPointMapping {
  constructor() {
    this.sumSolution = new SumSolution();
    this.helloSolution = new HelloSolution();
    this.fizzBuzzSolution = new FizzBuzzSolution();
    this.checkoutSolution = new CheckoutSolution();
    this.rabbitHoleSolution = new RabbitHoleSolution();
    this.houseOfCardsSolution = new HouseOfCardsSolution();
    this.amazingSolution = new AmazingSolution();
    this.ultimateSolution = new UltimateSolution();
    this.demoRound1Solution = new DemoRound1Solution();
    this.demoRound2Solution = new DemoRound2Solution();
    this.demoRound3Solution = new DemoRound3Solution();
    this.demoRound4n5Solution = new DemoRound4n5Solution();
  }

  sum(...args) {
    return this.sumSolution.compute(...args);
  }

  hello(...args) {
    return this.helloSolution.hello(...args);
  }

  fizz_buzz(...args) {
    return this.fizzBuzzSolution.fizzBuzz(...args);
  }

  checkout(...args) {
    return this.checkoutSolution.checkout(...args);
  }

  rabbit_hole(...args) {
    return this.rabbitHoleSolution.rabbit_hole(...args);
  }

  render_house(...args) {
    return this.houseOfCardsSolution.render_house(...args);
  }

  amazing_maze(...args) {
    return this.amazingSolution.amazing_maze(...args);
  }

  ultimate_maze(...args) {
    return this.ultimateSolution.ultimate_maze(...args);
  }

  increment(...args) {
    return this.demoRound1Solution.increment(...args);
  }

  to_uppercase(...args) {
    return this.demoRound1Solution.to_uppercase(...args);
  }

  letter_to_santa() {
    return this.demoRound1Solution.letter_to_santa();
  }

  count_lines(...args) {
    return this.demoRound1Solution.count_lines(...args);
  }

  array_sum(...args) {
    return this.demoRound2Solution.array_sum(...args);
  }

  int_range(...args) {
    return this.demoRound2Solution.int_range(...args);
  }

  filter_pass(...args) {
    return this.demoRound2Solution.filter_pass(...args);
  }

  inventory_add(inventoryItem, number) {
    const item = new InventoryItem(inventoryItem);
    return this.demoRound3Solution.inventory_add(item, number);
  }

  inventory_size() {
    return this.demoRound3Solution.inventory_size();
  }

  inventory_get(...args) {
    return this.demoRound3Solution.inventory_get(...args);
  }

  waves(...args) {
    return this.demoRound4n5Solution.waves(...args);
  }
}

export default EntryPointMapping;
