class Game {
  constructor() {
    this.cards = document.querySelectorAll(".carte"); // recuperer tous les elements de classe carte et le stocker dans l'objet cards
    this.score = 0;
    this.scoretotal = document.getElementById("note");
    this.totalScore = 0
    this.toflip = false; // les cartes ne sont pas retourner
    this.start = false;
    this.Card1 = null;
    this.Card2 = null;
    this.time = document.getElementById("heure");
    this.message = document.getElementById("message");
    this.startTime = 60; // Durée de la partie en secondes
    this.tempRestant = this.startTime;
    this.timeInterval = null;
    this.init(); // methode pour initialiser le jeu
  }
  // methode pour initialiser le jeu en fesant un clic sur la carte
  init() {
    this.cards.forEach((card) =>
      card.addEventListener("click", () => this.flipCard(card))
    );
    this.startTimer();
    this.shuffleCards();
  }

  // methode pour retourner la carte apres le clic
  flipCard(card) {
    if (this.tempRestant <= 0) {
      return;
    }
    card.classList.add("flip");

    if (!this.toflip) {
      this.toflip = true;
      this.Card1 = card;
    } else {
      this.toflip = false;
      this.Card2 = card;

      if (this.toverify()) {
       
        this.dilateCards();
        this.updateScore();
      } else {
        this.unflipCards();
      }
    }
  }
  //methode pour verifier si les deux cartes sont identiques
  toverify() {
    return this.Card1.dataset.name === this.Card2.dataset.name;
  }
  //methode pour suppprimer les deux cartes identiques aores 1 seconde
  dilateCards() {
    setTimeout(() => {
      this.Card1.style.visibility = "hidden";
      this.Card2.style.visibility = "hidden";

      if (document.querySelectorAll('.card[style*="visibility: visible"]').length === 0) {
        this.stopTime()
      }
    }, 1000);
  }
  //methode pour retourner les cartes si elles ne sont pas identiques apres 1seconde
  unflipCards() {
    setTimeout(() => {
      this.Card1.classList.remove("flip");
      this.Card2.classList.remove("flip");
    }, 1000);
  }
  //methode pour donner le score
  updateScore() {
    setTimeout(() => {
      this.score += 10;
      this.scoretotal.textContent = `Score: ${this.score}`;
    }, 1000);
  }

  // methode pour gerer le temps de jeu
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.tempRestant--;
      this.updateTime();
      if (this.tempRestant <= 0) {
        this.stopTime();
        this.message.textContent = "Partie terminée. Temps écoulé!";
      }
    }, 1000); // Mettre à jour le temps toutes les secondes
  }

  stopTime() {
    clearInterval(this.timerInterval);
  }

  shuffleCards() {
    this.cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 8);
        card.style.order = randomPos;
    }); 
}
updateTime() {
  const minutes = Math.floor(this.tempRestant / 60);
  const seconds = this.tempRestant % 60;
  this.time.textContent = ` ${minutes}:${seconds}`;
} 
}

const game = new Game();
