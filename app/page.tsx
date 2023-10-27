"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "./style.css";
import JeremyAvatar from "../public/image-jeremy.png";
import Ecllipse from "../public/icon-ellipsis.svg";
import WorkImg from "../public/icon-work.svg";
import PlayImg from "../public/icon-play.svg";
import StudyImg from "../public/icon-study.svg";
import ExerciseImg from "../public/icon-exercise.svg";
import SocialImg from "../public/icon-social.svg";
import SelfCareImg from "../public/icon-self-care.svg";

export default function Home() {
  const [detail, setDetail] = useState([]);
  // const [activeTimeFrame, setActiveTimeFrame] = useState<ActiveStateType>([]);

  const [activeTrack, setActiveTrack] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  const [state, setState] = useState<
  "day" | "week" | "month"
>("day");

  type TimeframeType = {
    previous: number;
    current: number;
  };

  type DataType = {
    title: string;
    id: string;
    icon: string;
    iconStyle: string;
    timeframes: {
      daily: TimeframeType;
      weekly: TimeframeType;
      monthly: TimeframeType;
    };
  };

  // type Timeframe = {
  //   title: string;
  //   id: string;
  //   current: number;
  //   previous: number;
  // };

  // type ActiveStateType = Timeframe[];

  // const dailyTimeFrame: ActiveStateType = [];
  // const weeklyTimeFrame: ActiveStateType = [];
  // const monthlyTimeFrame: ActiveStateType = [];

  function renderLogoImages(id: string) {
    switch (id) {
      case "work":
        return <Image src={WorkImg} className="logo" alt="logo" />;
      case "play":
        return <Image src={PlayImg} className="logo" alt="logo" />;
      case "study":
        return <Image src={StudyImg} className="logo" alt="logo" />;
      case "exercise":
        return <Image src={ExerciseImg} className="logo" alt="logo" />;
      case "social":
        return <Image src={SocialImg} className="logo" alt="logo" />;
      case "self-care":
        return <Image src={SelfCareImg} className="logo" alt="logo" />;
      default:
        return null;
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await fetch("/data.json").then((res) => res.json());
      setDetail(response);
      // detail.map(
      //   (item: DataType) => (
      //     dailyTimeFrame.push({
      //       title: item.title,
      //       id: item.id,
      //       current: item.timeframes.daily.current,
      //       previous: item.timeframes.daily.previous,
      //     }),
      //     weeklyTimeFrame.push({
      //       title: item.title,
      //       id: item.id,
      //       current: item.timeframes.weekly.current,
      //       previous: item.timeframes.weekly.previous,
      //     }),
      //     monthlyTimeFrame.push({
      //       title: item.title,
      //       id: item.id,
      //       current: item.timeframes.monthly.current,
      //       previous: item.timeframes.monthly.previous,
      //     })
      //   )
      // );
      // console.log({ dailyTimeFrame, weeklyTimeFrame, monthlyTimeFrame });
      // console.log({ detail });
    }
    getData().catch(console.error);
    // getData();
  }, []); //activeTimeFrame hta dia dependecy array s tb bhi kam krraa?

  return (
    <div className="container">
      <div className="profile-cont">
        <div className="profile">
          <Image
            src={JeremyAvatar}
            className="avatar"
            alt=""
            priority={false}
          />
          <div className="profile-detail">
            <p>Report for</p>
            <h2>Jeremy Robson</h2>
          </div>
        </div>
        <div className="track">
          <button
            onClick={() => {
              setActiveTimeFrame(dailyTimeFrame);
              setActiveTrack("daily");
              setState("day");
            }}
            className={`activity-tracker-option track-daily ${
              activeTrack === "daily" ? "track-active" : ""
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => {
              setActiveTimeFrame(weeklyTimeFrame);
              setActiveTrack("weekly");
              setState("week");
            }}
            className={`activity-tracker-option track-weekly ${
              activeTrack === "weekly" ? "track-active" : ""
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => {
              setActiveTimeFrame(monthlyTimeFrame);
              setActiveTrack("monthly");
              setState("month");
            }}
            className={`activity-tracker-option track-monthly ${
              activeTrack === "monthly" ? "track-active" : ""
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="activities">
        {detail.map((stat: DataType, index) => (   
          <div className={stat.iconStyle} key={index}>
            {renderLogoImages(stat.id)}
            <div className="card">
              <div className="sub-title">
                <p>{stat.title}</p>
                <Image src={Ecllipse} alt="" className="eclipse" />
              </div>
              <div className="hr-detail">
                <h2>
                  <span id="work-current">
                    {stat.timeframes[activeTrack].current}
                  </span>{" "}
                  hrs
                </h2>
                <p>
                  Last {state} -{" "}
                  <span id="work-previous">
                    {stat.timeframes.previous} 
                  </span>{" "}
                  hrs
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
