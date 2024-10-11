/* ------------------------------------------------------------------------------
 *
 *  # Custom JS code
 *
 *  Place here all your custom js. Make sure it's loaded after app.js
 *
 * ---------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function() {
  // Установим дату, до которой будет идти обратный отсчет
  const countdownDate = new Date("Jan 1, 2025 00:00:00").getTime();
  // Функция для обновления таймера
  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = countdownDate - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    // Обновляем значения на странице
    document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, "0");
    // Останавливаем таймер, если дата достигнута
    if (timeLeft < 0) {
      clearInterval(countdownFunction);
      document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  }
  // Начинаем обновление таймера сразу
  updateCountdown();
  // Запускаем интервал для обновления каждую секунду
  const countdownFunction = setInterval(updateCountdown, 1000);
});
