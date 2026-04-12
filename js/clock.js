function getGreeting() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const totalMinutes = hour * 60 + minute;

  const sunriseMinutes = 5 * 60 + 30;
  const sunsetMinutes = 18 * 60;

  if (totalMinutes >= 5 * 60 && totalMinutes < 11 * 60) return 'Good Morning';
  if (totalMinutes >= 11 * 60 && totalMinutes < 15 * 60) return 'Good Afternoon';
  if (totalMinutes >= 15 * 60 && totalMinutes < sunsetMinutes) return 'Good Evening';
  return 'Good Night';
}

function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}`;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayName = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  document.getElementById('date').textContent = `${dayName}, ${date} ${month} ${year}`;
}

updateClock();
setInterval(updateClock, 1000);
