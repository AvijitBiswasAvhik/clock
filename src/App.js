import React, { useState, useEffect, useRef } from "react";
import { Howl, Howler } from "howler";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  faDownLong,
  faUpLong,
  faPlay,
  faPause,
  faRotate,
} from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import Countdown from "react-countdown";
import bedardi from "./bedardi.mp3";

function App() {
  let [data, setData] = useState({
    session: { duration: 25, on: true },
    break: { duration: 5, on: false },
    on: false,
    auto: false,
    key: 0,
    count: "",
    runing: false,
    reset: false,
  });
  const countdownRef = useRef(null);
  const test = useRef(true);
  let gana = useRef(bedardi);

  let render = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <>
          {minutes}:{seconds}s
        </>
      );
    } else {
      return (
        <>
          {minutes}:{seconds}s
        </>
      );
    }
  };
  let handleComplete = () => {
    setData((pre) => {
      return {
        ...pre,
        session: { ...pre.session, on: !pre.session.on },
        key: pre.key + 1,
        auto: true,
      };
    });
    if (data.session.on) {
      let play = new Howl({
        src: [gana.current],
        volume: 1,
        sprite: {
          intro: [20000, 50000],
        },
        onend: () => {
          play.unload(); // Unload the sound after it finishes
        },
      });

      play.play("intro");
    }
  };

  useEffect(() => {
    setData((pre) => {
      let d = data.session.on
        ? data.session.duration * 60 * 1000
        : data.break.duration * 60 * 1000;
      const targetDate = Date.now() + d;
      return {
        ...pre,
        count: (
          <Countdown
            ref={countdownRef}
            date={targetDate}
            renderer={render}
            autoStart={data.auto}
            onComplete={handleComplete}
            key={data.key}
          />
        ),
      };
    });
  }, [data.key, data.session.duration, data.break.duration]);
  return (
    <div className="App d-flex align-items-center justify-content-center">
      <div className="clock">
        <div className="row">
          <div className="text-white col-12 d-flex fs-1 align-items-center justify-content-center">
            25 + 5 Clock
          </div>
        </div>
        <div className="row d-flex align-items-center justify-content-center flex-column flex-sm-row">
          <div className="text-white col-6 d-flex fs-4 align-items-center justify-content-center flex-column">
            <p>Break Length</p>
            <div className="breack-controll">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  countdownRef.current.stop();
                  setData((pre) => {
                    return {
                      ...pre,
                      break: {
                        ...pre.break,
                        duration:
                          pre.break.duration > 1
                            ? pre.break.duration - 1
                            : pre.break.duration,
                      },
                      runing: false,
                    };
                  });
                }}
                className="breack-controll-down button-increment"
              >
                <FontAwesomeIcon className="text-white" icon={faDownLong} />
              </button>
              {data && data.break && data.break.duration}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  countdownRef.current.stop();
                  setData((pre) => {
                    return {
                      ...pre,
                      break: {
                        ...pre.break,
                        duration:
                          pre.break.duration < 5
                            ? pre.break.duration + 1
                            : pre.break.duration,
                      },
                      runing: false,
                    };
                  });
                }}
                className="breack-controll-up button-increment"
              >
                {<FontAwesomeIcon className="text-white" icon={faUpLong} />}
              </button>
            </div>
          </div>
          <div className="text-white col-6 d-flex fs-4 align-items-center justify-content-center flex-column">
            <p className="h-100 text-center">Session Length</p>
            <div className="session-controll">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  countdownRef.current.stop();
                  setData((pre) => {
                    return {
                      ...pre,
                      session: {
                        ...pre.session,
                        duration:
                          pre.session.duration > 1
                            ? pre.session.duration - 1
                            : pre.session.duration,
                      },
                      runing: false,
                    };
                  });
                }}
                className="session-controll-down button-increment"
              >
                <FontAwesomeIcon className="text-white" icon={faDownLong} />
              </button>
              {data && data.session && data.session.duration}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  countdownRef.current.stop();
                  setData((pre) => {
                    return {
                      ...pre,
                      runing: false,
                    };
                  });
                  setData((pre) => {
                    return {
                      ...pre,
                      session: {
                        ...pre.session,
                        duration:
                          pre.session.duration < 25
                            ? pre.session.duration + 1
                            : pre.session.duration,
                      },
                    };
                  });
                }}
                className="session-controll-up button-increment"
              >
                <FontAwesomeIcon className="text-white" icon={faUpLong} />
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-4 d-flex align-items-center justify-content-center">
            <div className="timer">
              <div className="timer-wrapper">
                <div id="timer-label">
                  {data.session.on ? "Session" : "Breake"}
                </div>
                <div id="time-left">
                  {/* <Countdown
                    ref={countdownRef}
                    date={targetDate}
                    renderer={render}
                    autoStart={data.auto}
                    onComplete={handleComplete}
                    key={data.key}
                  /> */}
                  {data.count}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="timer-control">
              <button id="start_stop" className="controll">
                {!data.runing && (
                  <FontAwesomeIcon
                    id="start"
                    className="me-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      countdownRef.current.start();
                      setData((pre) => {
                        return {
                          ...pre,
                          runing: true,
                        };
                      });
                    }}
                    icon={faPlay}
                  />
                )}

                {data.runing && (
                  <FontAwesomeIcon
                    id="stop"
                    className="ms-1"
                    icon={faPause}
                    onClick={(e) => {
                      e.stopPropagation();
                      countdownRef.current.pause();
                      setData((pre) => {
                        return {
                          ...pre,
                          runing: false,
                        };
                      });
                    }}
                  />
                )}
              </button>
              <button id="reset" className="controll">
                <FontAwesomeIcon
                  id="reseter"
                  className={data.reset ? "reseter-start" : ""}
                  icon={faRotate}
                  onClick={(e) => {
                    e.stopPropagation();
                    countdownRef.current.stop();
                    setData((pre) => {
                      return {
                        ...pre,
                        runing: false,
                        session: { duration: 25, on: false },
                        break: { duration: 5, on: false },
                        auto: false,
                        reset: true,
                      };
                    });
                    setTimeout(() => {
                      setData((pre) => {
                        return {
                          ...pre,
                          reset: false,
                        };
                      });
                    }, 1000);
                  }}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="author text-center text-black-50">
              {" "}
              Designed and Coded by <br />
              <a
                href="https://github.com/AvijitBiswasAvhik/"
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none text-white"
              >
                Avijit Biswas
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
