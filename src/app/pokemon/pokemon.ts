export class Pokemon {
    id?: number;
    hp: number;
    cp: number;
    name: string;
    picture: string;
    types: Array<string>;
    created: Date;
    update?: number;

  constructor (
    id?: number,
    name: string = "Enter name",
    hp: number = 100,
    cp: number = 10,
    picture: string = 'http://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png',
    type: string[] = ['Normal'],
    created: Date = new Date(),
    update?:  0,
  ) {

    this.id = id;
    this.hp = hp;
    this.cp = cp;
    this.name = name;
    this.picture = picture;
    this.types = type;
    this.created = created;
    this.update = update;
  }
}


  