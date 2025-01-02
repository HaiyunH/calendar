// script.js
document.addEventListener('DOMContentLoaded', function () {
    let currentDate = new Date();
    const calendarBody = document.getElementById('calendar-body');
    const monthYearDisplay = document.getElementById('month-year');

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

    // Handle vertical scroll to change months
    let scrollTimeout;
    calendarBody.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            if (calendarBody.scrollTop > 50) {
                currentDate.setMonth(currentDate.getMonth() + 1); // Scroll down, next month
            } else if (calendarBody.scrollTop < -50) {
                currentDate.setMonth(currentDate.getMonth() - 1); // Scroll up, previous month
            }
            generateCalendar(currentDate);
        }, 150);
    });

    // Initial call to generate the current month
    generateCalendar(currentDate);
});
