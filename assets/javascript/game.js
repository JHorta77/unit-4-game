var fenix = {
    id: "fenix",
    name: "Marcus Fenix",
    image: "./assets/images/marcus fenix.jpg",
    basehp: 195,
    hp: 195,
    ap: 15,
    baseap: 15,
    cap: 25
}
var raam = {
    id: "raam",
    name: "RAAM",
    image: "./assets/images/Locust_RAAM.jpg",
    basehp: 250,
    hp: 250,
    ap: 15,
    baseap: 15,
    cap: 20
}
var cole = {
    id: "cole",
    name: "Cole Train",
    image: "./assets/images/cole train.jpg",
    basehp: 175,
    hp: 175,
    ap: 12,
    baseap: 12,
    cap: 25
}
var carmine = {
    id: "carmine",
    name: "Anthony Carmine",
    image: "./assets/images/anthony-carmine.jpg",
    basehp: 135,
    hp: 135,
    ap: 8,
    baseap: 8,
    cap: 15
}

var charArray = [fenix, raam, cole, carmine];
var enemyArray = [fenix, raam, cole, carmine];
var playerChar;
var charSelected = false;
var battleStart = false;
var gameOver = false;
var enemyChar;

function init() {
    $("#pick").html("Pick a Character:");
    $("div.pickCharacter").empty();
    $("div.yourCharacter").empty();
    $("div.enemies").empty();
    $("div.defender").empty();
    for (var k = 0; k < charArray.length; k++) {
        charArray[k].hp = charArray[k].basehp;
        charArray[k].ap = charArray[k].baseap;
    }
    for (var i = 0; i < charArray.length; i++) {
        $("div.pickCharacter").append("<div class='character " + charArray[i].id + "'>")
    }
    for (var j = 0; j < charArray.length; j++) {
        $("." + charArray[j].id).append("<p class='name'>" + charArray[j].name + "</p>")
        $("." + charArray[j].id).append("<img src='" + charArray[j].image + "'>")
        $("." + charArray[j].id).append("<p class='HP'>" + charArray[j].hp + "</p>")
    }

    charSelected = false;
    battleStart = false;
    updateHP();
    game();


}


function updateHP() {
    for (var i = 0; i < charArray.length; i++) {
        $("." + charArray[i].id + " > .HP").html(charArray[i].hp);
    }
}

function attack() {
    $("#attack").on("click", function () {
        if (gameOver === false && battleStart === true) {
            enemyChar.hp -= playerChar.ap;
            playerChar.hp -= enemyChar.cap;
            updateHP();
            $(".attackMessage").html("You attacked " + enemyChar.name + " for " + playerChar.ap + " damage.")
            $(".defendMessage").html(enemyChar.name + " attacked you back for " + enemyChar.cap + " damage.")
            playerChar.ap += playerChar.baseap;

            if (enemyChar.hp <= 0) {
                if (enemyArray.length === 0 && playerChar.hp > 0) {
                    battleStart = false;
                    $(".attackMessage").empty();
                    $(".defendMessage").empty();
                    $(".winLoseMessage").html("You are Victorius.");
                    $("#restart").removeClass("hide");
                } else {
                    battleStart = false;
                    $("div.defender > ." + enemyChar.id).addClass("hide");
                    $(".attackMessage").empty();
                    $(".defendMessage").empty();
                    $(".winLoseMessage").html("You have defeated " + enemyChar.name + ". You can choose to fight another enemy");
                }
            }
            if (playerChar.hp <= 0) {
                battleStart = false;
                gameOver = true;
                $(".attackMessage").empty();
                $(".defendMessage").empty();
                $(".winLoseMessage").html("You lost. Game over.")
                $("#restart").removeClass("hide");
            }
        }

    });
}


function restart() {
    $("#restart").on("click", function () {
        gameOver = false;
        enemyArray = [fenix, raam, cole, carmine];
        playerChar = "";
        enemyChar = "";
        updateHP();
        init();
        $(".winLoseMessage").empty();
        $("#restart").addClass("hide");
    });
}



function game() {
    $(".character").on("click", function () {
        $("#pick").empty();
        if (charSelected === false) {
            charSelected = true;
            for (var i = 0; i < charArray.length; i++) {
                if ($(this).attr("class").includes(charArray[i].id)) {
                    playerChar = charArray[i];
                }
            }
            enemyArray.splice(enemyArray.indexOf(playerChar), 1);
            $("div.yourCharacter").append($("." + playerChar.id));
            for (var i = 0; i < charArray.length; i++) {
                if (playerChar != charArray[i]) {
                    $("div.enemies").append($("." + charArray[i].id));
                }
            }
            return;
        }

        if (battleStart === false) {
            for (var i = 0; i < charArray.length; i++) {
                if ($(this).attr("class").includes(charArray[i].id)) {
                    enemyChar = charArray[i];
                }
            }
            enemyArray.splice(enemyArray.indexOf(enemyChar), 1);
            $("div.defender").append($("." + enemyChar.id));
            battleStart = true;
            $(".winLoseMessage").empty();
        }
    });

}

$(document).ready(function () {
    attack();
    restart();
    init();

});



