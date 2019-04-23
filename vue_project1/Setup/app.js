new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true,
                this.monsterHealth = 100,
                this.playerHealth = 100
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text: "Player hits monster for " + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();



        },
        specialAttack: function () {

            this.monsterHealth -= this.calculateDamage(10, 20);
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();


        },
        monsterAttack: function () {
            this.playerHealth -= this.calculateDamage(5, 12);
            this.checkWin();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttack();

        },
        giveUp: function () {
            this.gameIsRunning=false;

        },


        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);;
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('you won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return false;
            }

        }
    }
})