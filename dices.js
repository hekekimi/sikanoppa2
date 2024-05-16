//noppien heitto

export function rollDice(){
    return Math.floor(Math.random()*6)+1;
}


export function rollTwoDice(){
    const heitto1 = rollDice();
    const heitto2 = rollDice();
    return{heitto1,heitto2};
}
/*testinopat
export function rollTwoDice(){
    const heitto1 = 6;
    const heitto2 = 6;
    return{heitto1,heitto2};
}*/