import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

const Container = styled.div`
  padding: 1em;
  height: 10em;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 3em;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Dday = styled.div`
  font-size: 1.8em;
  font-weight: 500;
`;

const Clock = () => {
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const getDate = () => {
    const startDay = Number(dayjs("2019-02-01:00:00:00+0900"));
    let now = Number(dayjs());
    let remained = startDay - now;

    const DAY = 1000 * 60 * 60 * 24;
    const HOUR = 1000 * 60 * 60;
    const MINUTE = 1000 * 60;
    const SECOND = 1000;

    const days = Math.abs(Math.floor(remained / DAY));
    const hours = Math.abs(Math.floor((remained % DAY) / HOUR)) - 1;
    const minutes = Math.abs(Math.floor((remained % HOUR) / MINUTE)) - 1;
    const seconds = Math.abs(Math.floor((remained % MINUTE) / SECOND)) - 1;

    const dayStr = `${days < 10 ? `0${days}` : days}`;
    const hourStr = `${hours < 10 ? `0${hours}` : hours}`;
    const minuteStr = `${minutes < 10 ? `0${minutes}` : minutes}`;
    const secondStr = `${seconds < 10 ? `0${seconds}` : seconds}`;

    setDay(dayStr);
    setHour(hourStr);
    setMin(minuteStr);
    setSec(secondStr);
  };

  useEffect(() => {
    const timeSet = setInterval(getDate, 1000);
    return () => {
      clearInterval(timeSet);
    };
  }, []);

  return (
    <Container>
      <Title>出会ってから</Title>
      <Dday>
        {day}日 {hour}時 {min}分 {sec}秒
      </Dday>
    </Container>
  );
};

export default Clock;
