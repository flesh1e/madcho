// Усі кубики зберігаємо у змінній dice
const dice = document.querySelectorAll(".dice");

// selectedDice - масив для зберігання вибраних кубиків
let selectedDice = [];

// чи можна вибрати куб:
for (let i = 0; i < dice.length; i++) {
  dice[i].addEventListener("click", function () {
    // Перевіряємо, що вибрано менше 2 кубиків і цей кубик ще не вибраний
    if (selectedDice.length < 2 && !selectedDice.includes(dice[i])) {
      // Додаємо кубик до масиву обраних
      selectedDice.push(dice[i]);
      // Додаємо клас для підсвічування вибраного кубика
      dice[i].classList.add("selected");
    }
    // Якщо вибрано два кубики, то перевіряємо їхню відповідність
    if (selectedDice.length === 2) {
      const die1 = selectedDice[0];
      const die2 = selectedDice[1];
      if (
        die1.innerHTML === die2.innerHTML &&
        checkFreeSides(die1) &&
        checkFreeSides(die2)
      ) {
        // Додаємо класи для підсвічування заматчених кубиків
        die1.classList.add("matched");
        die2.classList.add("matched");
        // затримка
        setTimeout(function () {
          // анімація:
          die1.style.animation = "fadeOut 1s";
          die2.style.animation = "fadeOut 1s";
          // видаляємо куби після анімації
          setTimeout(function () {
            die1.style.display = "none";
            die2.style.display = "none";
          }, 1000);
        }, 1000);
      } else {
        // забираємо підсвітку якщо куби без пари
        for (let j = 0; j < selectedDice.length; j++) {
          selectedDice[j].classList.remove("selected");
        }
      }
      selectedDice = [];
    }
  });
}
function checkFreeSides(die) {
  const siblings = die.parentNode.children;
  for (let i = 0; i < siblings.length; i++) {
    if (
      siblings[i] !== die &&
      siblings[i].innerHTML === die.innerHTML &&
      !siblings[i].classList.contains("matched")
    ) {
      return true;
    }
  }
  return false;
}
