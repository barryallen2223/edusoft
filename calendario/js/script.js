document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: 'standard',
        headerToolbar: {
            left: 'prev today next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        initialDate: new Date(),
        customButtons: {
            addEventButton: {
                text: 'add event...',
                click: function() {
                    var dateStr = prompt('Enter a date in YYYY-MM-DD format');
                    var date = moment(dateStr);
                    if (date.isValid()) {
                        $('#calendar').fullCalendar('renderEvent', {
                        title: 'dynamic event',
                        start: date,
                        allDay: true
                        });
                        alert('Great. Now, update your database...');
                    } else {
                        alert('Invalid date.');
                    }
                }
            }
        },
        navLinks: true, // can click day/week names to navigate views
        businessHours: true, // display business hours
        editable: true,
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
                start: '2021-10-05T13:00:00',
                MediaElementAudioSourceNode: '2021-10-05T16:00:00',
                color: '#c0c0c0',
                constraint: 'businessHours'
            },
            {
                title: 'Taller de lectura',
                start: '2021-10-04T13:00:00',
                end: '2021-10-04T14:30:00',
                color: '#00ff83',
                constraint: 'businessHours'
            },
            {
                title: 'Parcial de lógica',
                start: '2021-10-12T11:00:00',
                end: '2021-10-12T14:30:00',
                color: '#3300ff',
                constraint: 'businessHours'
            },
            {
                title: 'Exposición ingeniería software',
                start: '2021-10-26T08:20:00',
                end: '2021-10-26T08:40:00',
                color: '#600e69',
                constraint: 'businessHours'
            },
        ]
    });
    calendar.render();
});