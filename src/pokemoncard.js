export default class PokemonCard {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.clicked = false;
    }

    beenClicked(){
        this.clicked = true;
    }
    
}