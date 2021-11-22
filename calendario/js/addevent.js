//import * as fullcalendar from "https://cdn.skypack.dev/fullcalendar@5.10.1";

$(document).ready(function() {
            $('#schedule-calendar').fullCalendar({
                editable: true,
                headerToolbar: {
                    left: 'prev today next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                },
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
                        start: '2021-11-05T13:00:00',
                        MediaElementAudioSourceNode: '2021-11-05T16:00:00',
                        color: '#c0c0c0',
                        constraint: 'businessHours'
                    },
                    {
                        title: 'Taller de lectura',
                        start: '2021-11-04T13:00:00',
                        end: '2021-11-04T14:30:00',
                        color: '#00ff83',
                        constraint: 'businessHours'
                    },
                    {
                        title: 'Parcial de lógica',
                        start: '2021-11-12T11:00:00',
                        end: '2021-11-12T14:30:00',
                        color: '#3300ff',
                        constraint: 'businessHours'
                    },
                    {
                        title: 'Exposición ingeniería software',
                        start: '2021-11-26T08:20:00',
                        end: '2021-11-26T08:40:00',
                        color: '#600e69',
                        constraint: 'businessHours'
                    },
                ],
                eventClick: function(event) {
                    var modal = $("#schedule-edit");
                    modal.modal();
                },
                dayClick: function(date, jsEvent, view) {
                    $('#schedule-add').modal('show');
                }
            });
        });