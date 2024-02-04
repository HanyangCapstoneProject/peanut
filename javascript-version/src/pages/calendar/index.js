// pages/calendar.js

import { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // 이벤트 데이터. 예시를 위해 간단하게 배열로 표현하였습니다.
  const events = [
    { date: '2024-02-01', title: 'Meeting' },
    { date: '2024-02-10', title: 'Birthday Party' },
    { date: '2024-02-15', title: 'Conference' },
  ];

  // 월별 달력을 그리는 함수
  const renderCalendar = () => {
    const dt = new Date();
    const year = dt.getFullYear();
    const month = dt.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const days = [];

    for (let i = 1; i <= daysInMonth + firstDayIndex; i++) {
      const day = i - firstDayIndex;
      const currentDate = new Date(year, month, day);
      const formattedDate = currentDate.toISOString().split('T')[0];

      const event = events.find(event => event.date === formattedDate);

      days.push(
        <div
          key={i}
          style={{
            padding: '10px',
            margin: '5px',
            borderRadius: '5px',
            backgroundColor: selectedDate === day ? '#007bff' : 'transparent',
            color: selectedDate === day ? '#fff' : '#000',
            fontWeight: selectedDate === day ? 'bold' : 'normal',
            cursor: day > 0 ? 'pointer' : 'default',
            boxShadow: selectedDate === day ? '0 0 5px rgba(0, 123, 255, 0.5)' : 'none',
          }}
          onClick={() => setSelectedDate(day)}
        >
          {day > 0 ? day : ''}
          {event && <span style={{ marginLeft: '5px' }}>{event.title}</span>}
        </div>
      );
    }

    return days;
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>February 2024</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {renderCalendar()}
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        Selected Date: {selectedDate ? `${selectedDate} Feb 2024` : 'None'}
      </div>
    </div>
  );
};

export default Calendar;
