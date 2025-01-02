// script.js
document.addEventListener('DOMContentLoaded', function () {
    function generateCalendar() {
        const calendarBody = document.getElementById('calendar-body');
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0-based (0 = January)
        const currentYear = currentDate.getFullYear();

        // Get the first day of the month (0 = Sunday, 6 = Saturday)
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        // Get the number of days in the current month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Clear the calendar body before adding new days
        calendarBody.innerHTML = '';

        // Add empty blocks before the first day
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day');
            calendarBody.appendChild(emptyDay);
        }

        // Add the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayBlock = document.createElement('div');
            dayBlock.classList.add('day');
            dayBlock.textContent = day;
            calendarBody.appendChild(dayBlock);
        }
    }

    // Call the function to generate the calendar
    generateCalendar();
});
