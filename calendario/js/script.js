document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev today next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        initialDate: new Date(),
        navLinks: true, // can click day/week names to navigate views
        businessHours: true, // display business hours
        editable: false,
        selectable: false,
        dayMaxEvents: true,
        locale: 'es',
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Dia',
            list: 'Lista'
        },
        events: [
            {
                title: 'Parcial Matemáticas',
                start: '2021-10-03T13:00:00',
                start: '2021-10-03T16:00:00',
                color: '#c0c0c0',
                constraint: 'businessHours'
            },
            {
                title: 'Taller de lectura',
                start: '2021-10-04T13:00:00',
                start: '2021-10-04T14:30:00',
                color: '#c0c0c0',
                constraint: 'businessHours'
            },    
        ]
    });
    calendar.render();
});
