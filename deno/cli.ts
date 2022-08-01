class Type {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  show(): String {
    return this.name;
  }
}

console.log(new Type("String"));
