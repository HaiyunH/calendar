// script.js
let notesData = JSON.parse(localStorage.getItem('calendarNotes')) || {};

document.addEventListener('DOMContentLoaded', function () {
    let currentDate = new Date();
    const calendarBody = document.getElementById('calendar-body');
    const monthYearDisplay = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const modal = document.getElementById('note-modal');
    const noteInput = document.getElementById('note-input');
    const saveNoteBtn = document.getElementById('save-note');
    const cancelNoteBtn = document.getElementById('cancel-note');
    
    // Store notes in memory (you might want to use localStorage or a backend database)
    let selectedDate = null;

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
            
            // Add date number in its own div
            const dateNumber = document.createElement('div');
            dateNumber.classList.add('day-number');
            dateNumber.textContent = day;
            
            // Add notes list container
            const notesList = document.createElement('ul');
            notesList.classList.add('notes-list');
            
            // Add any existing notes
            const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
            if (notesData[dateKey]) {
                notesData[dateKey].forEach((note, index) => {
                    const li = document.createElement('li');
                    li.textContent = note;
                    li.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent opening the add note modal
                        openEditModal(dateKey, index, note);
                    });
                    notesList.appendChild(li);
                });
            }
            
            dayBlock.appendChild(dateNumber);
            dayBlock.appendChild(notesList);
            calendarBody.appendChild(dayBlock);
            
            // Add click handler for adding notes
            dayBlock.addEventListener('click', () => openNoteInput(dateKey));
        }
        
        // Adjust row heights
        adjustRowHeights();
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

    function openNoteInput(dateKey) {
        selectedDate = dateKey;
        modal.style.display = 'block';
        noteInput.focus();
    }

    function saveNote() {
        if (selectedDate && noteInput.value.trim()) {
            if (!notesData[selectedDate]) {
                notesData[selectedDate] = [];
            }
            notesData[selectedDate].push(noteInput.value.trim());
            
            // Save to localStorage
            localStorage.setItem('calendarNotes', JSON.stringify(notesData));
            
            // Refresh the calendar to show the new note
            generateCalendar(currentDate);
            
            // Clear and close the input
            noteInput.value = '';
            modal.style.display = 'none';
        }
    }

    function adjustRowHeights() {
        const days = Array.from(calendarBody.getElementsByClassName('day'));
        const rows = [];
        
        // Group days into rows
        for (let i = 0; i < days.length; i += 7) {
            rows.push(days.slice(i, i + 7));
        }
        
        // Adjust heights for each row
        rows.forEach(row => {
            const maxHeight = Math.max(...row.map(day => day.scrollHeight));
            row.forEach(day => day.style.height = `${maxHeight}px`);
        });
    }

    // Add event listeners for the modal
    saveNoteBtn.addEventListener('click', saveNote);
    cancelNoteBtn.addEventListener('click', () => {
        noteInput.value = '';
        modal.style.display = 'none';
    });

    // Close modal if clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle enter key in note input
    noteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveNote();
        }
    });

    // Add new modal elements
    const editModal = document.getElementById('edit-modal');
    const editInput = document.getElementById('edit-input');
    const updateNoteBtn = document.getElementById('update-note');
    const deleteNoteBtn = document.getElementById('delete-note');
    const cancelEditBtn = document.getElementById('cancel-edit');
    
    // Add variables to track the note being edited
    let selectedNoteIndex = null;
    
    function openEditModal(dateKey, index, note) {
        selectedDate = dateKey;
        selectedNoteIndex = index;
        editInput.value = note;
        editModal.style.display = 'block';
        editInput.focus();
    }

    function updateNote() {
        if (selectedDate && selectedNoteIndex !== null && editInput.value.trim()) {
            notesData[selectedDate][selectedNoteIndex] = editInput.value.trim();
            
            // Save to localStorage
            localStorage.setItem('calendarNotes', JSON.stringify(notesData));
            
            // Refresh the calendar
            generateCalendar(currentDate);
            
            // Clear and close the modal
            closeEditModal();
        }
    }

    function deleteNote() {
        if (selectedDate && selectedNoteIndex !== null) {
            notesData[selectedDate].splice(selectedNoteIndex, 1);
            
            // Remove the date key if no notes remain
            if (notesData[selectedDate].length === 0) {
                delete notesData[selectedDate];
            }
            
            // Save to localStorage
            localStorage.setItem('calendarNotes', JSON.stringify(notesData));
            
            // Refresh the calendar
            generateCalendar(currentDate);
            
            // Close the modal
            closeEditModal();
        }
    }

    function closeEditModal() {
        editModal.style.display = 'none';
        editInput.value = '';
        selectedNoteIndex = null;
    }

    // Add event listeners for edit modal
    updateNoteBtn.addEventListener('click', updateNote);
    deleteNoteBtn.addEventListener('click', deleteNote);
    cancelEditBtn.addEventListener('click', closeEditModal);

    // Handle enter key in edit input
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateNote();
        }
    });

    // Close edit modal if clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
});
