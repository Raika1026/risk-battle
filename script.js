let playerHp = 100;
let enemyHp = 100;
let playerAttack = 20;
let specialAttack = 40;
let enemyAttack = 15;
let diceResult = 1;

let playerHpText = document.getElementById("playerHpText");
let enemyHpText = document.getElementById("enemyHpText");
let messageText = document.getElementById("messageText");
let battleLog = document.getElementById("battleLog");

playerHpText.textContent = `HP：${playerHp} / 100`;
enemyHpText.textContent = `HP：${enemyHp} / 100`;

let attackButton = document.getElementById("attackButton");
let specialAttackButton = document.getElementById("specialAttackButton");

battleLog.insertAdjacentHTML("beforeend", `<p>戦闘開始！</p>`);

attackButton.addEventListener("click", function() {
    playerAttackTurn();

    finishPlayerTurn();
});

specialAttackButton.addEventListener("click", function(){
    battleLog.insertAdjacentHTML("beforeend", `<p>特殊攻撃を選択した！</p>`);
    diceResult = Math.floor(Math.random() * 6) + 1;
    battleLog.insertAdjacentHTML("beforeend", `<p>サイコロの目は${diceResult}です。</p>`);
    if(diceResult >= 4){
        battleLog.insertAdjacentHTML("beforeend", `<p>特殊攻撃成功！敵に${specialAttack}のダメージを与えた！</p>`);
        enemyHp = Math.max(enemyHp-specialAttack, 0);
        enemyHpText.textContent = `HP：${enemyHp} / 100`;
        battleLog.insertAdjacentHTML("beforeend", `<p>敵の残りHP:${enemyHp}</p>`);
    }else{
        battleLog.insertAdjacentHTML("beforeend", `<p>特殊攻撃失敗！敵にダメージを与えられなかった。</p>`);
    }
    
    finishPlayerTurn();
})

//敵の攻撃関数
function enemyTurn(){
    enemyAttack = Math.floor(Math.random() * 16) + 10;
    playerHp = Math.max(playerHp-enemyAttack, 0);
    playerHpText.textContent = `HP：${playerHp} / 100`;
    battleLog.insertAdjacentHTML("beforeend", `<p>敵の攻撃！あなたは${enemyAttack}のダメージを受けました。</p>`);
    battleLog.insertAdjacentHTML("beforeend", `<p>あなたの残りHP:${playerHp}</p>`)
}

//プレイヤーの攻撃関数
function playerAttackTurn(){
    enemyHp = Math.max(enemyHp-playerAttack, 0);
    enemyHpText.textContent = `HP：${enemyHp} / 100`;
    battleLog.insertAdjacentHTML("beforeend", `<p>プレイヤーの攻撃！敵に${playerAttack}のダメージを与えた！</p>`);
    battleLog.insertAdjacentHTML("beforeend", `<p>敵の残りHP:${enemyHp}</p>`);
}

//勝敗判定関数
function checkBattleEnd(){
    if(enemyHp <= 0){
        battleLog.insertAdjacentHTML("beforeend", '<p>敵を倒しました！</p>');
    } else if(playerHp <= 0){
        battleLog.insertAdjacentHTML("beforeend", '<p>あなたは倒されました。</p>');
    }

    if(enemyHp <= 0 || playerHp <= 0){
        attackButton.disabled = true;
        specialAttackButton.disabled = true;
    }
}

//敵の攻撃と勝敗判定をまとめて行う関数
function finishPlayerTurn(){
    if(enemyHp > 0 && playerHp > 0){
        enemyTurn();
    }
    checkBattleEnd();
}