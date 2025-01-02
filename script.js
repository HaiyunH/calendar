// script.js
document.addEventListener('DOMContentLoaded', function () {
    let currentDate = new Date();
    const calendarBody = document.getElementById('calendar-body');
    const monthYearDisplay = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    // Function to generate the calendar for the given month and year
    function generateCalendar(date) {
        const currentMonth = date.getMonth(); // 0-based (0 = January)
        const currentYear = date.getFullYear();

        // Get the first day of the month (0 = Sunday, 6 = Saturday)
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        // Get the number of days in the current month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Clear the calendar body before adding new days
        calendarBody.innerHTML = '';

        // Update the month and year display
        monthYearDisplay.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

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

    // Function to get the month name from the month index
    function getMonthName(monthIndex) {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[monthIndex];
    }

    // Function to go to the previous month
    function goToPrevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    }

    // Function to go to the next month
    function goToNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    }

    // Event listeners for the navigation buttons
    prevMonthButton.addEventListener('click', goToPrevMonth);
    nextMonthButton.addEventListener('click', goToNextMonth);

    // Initial call to generate the current month
    generateCalendar(currentDate);
});
