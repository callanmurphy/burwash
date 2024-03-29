import Head from "next/head";
import React, { Component } from "react";
import week1 from "../data/burwash2022/week1.json";
import week2 from "../data/burwash2022/week2.json";
import week3 from "../data/burwash2022/week3.json";
import week4 from "../data/burwash2021/week4.json";
import ned1 from "../data/ned2022/week1.json";
import ned2 from "../data/ned2022/week2.json";
import ned3 from "../data/ned2022/week3.json";
import ned4 from "../data/ned2021/week4.json";
import styleBurwash from "../styles/burwash.module.css";
import styleNed from "../styles/ned.module.css";

const weeks = [
  [week1, ned1],
  [week2, ned2],
  [week3, ned3],
  [week4, ned4],
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      menu: {
        name: "burwash",
        index: 0,
        style: styleBurwash,
        colour: "#A30031",
      },
      alert: { enabled: false, message: "hello" },
    };
  }

  formatDay = (num) => {
    return String(num);
  };

  changeDate = (direction) => {
    if (direction == "backward") {
      this.state.date.setDate(this.state.date.getDate() - 1);
    } else if (direction == "forward") {
      this.state.date.setDate(this.state.date.getDate() + 1);
    } else {
      this.setState({ date: new Date() });
    }
    // this.setState({date: this.state.date});
    this.setState({ week: this.getWeek() });
  };

  getWeek = () => {
    // source: https://www.javatpoint.com/calculate-current-week-number-in-javascript
    var oneJan = new Date(this.state.date.getFullYear(), 0, 1);
    var numberOfDays = Math.floor(
      (this.state.date - oneJan) / (24 * 60 * 60 * 1000)
    );
    var result = Math.ceil((numberOfDays - 1) / 7);
    var remainder = (result - -1) % 3;
    // alert(numberOfDays.toString() + result.toString() + remainder.toString())
    return remainder + 1;
  };

  render() {
    const today = this.state.date;
    const menu = this.state.menu;
    const alert = this.state.alert;

    return (
      <div className="container">
        <script src="jquery-csv.js"></script>
        <Head>
          <title>Burwash Menu</title>
          <meta
            name="description"
            content="Burwash Dining Hall Menu – Victoria University, Toronto ON. 
          See what's on for dinner by clicking through the daily schedule."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content={this.state.menu.colour} />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="apple-touch-startup-image" href="/splash.png" />
          <link rel="icon" href="/favicon.ico" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-1KKXSS6LDE"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1KKXSS6LDE', { page_path: window.location.pathname });
            `,
            }}
          />
        </Head>

        <main>
          {alert.enabled && (
            <div className="alert-bar">
              <div className="inline">
                <h2>{alert.message}</h2>
              </div>
            </div>
          )}
          <div
            className={
              alert.enabled
                ? menu.style["nav-bar"] + " margin-above"
                : menu.style["nav-bar"]
            }
          >
            <a href=".">
              <img
                src={
                  menu.name == "burwash"
                    ? "/crest-outlined.png"
                    : "/crest-outlined-green.png"
                }
                alt="Vic Crest"
                className="logo-top"
              />
            </a>
          </div>
          <div className={alert.enabled ? "margin-above" : ""}>
            <h1 className="title column-big">
              {menu.name == "burwash" ? "Burwash" : "Ned's"} Menu
            </h1>
            {/* { <img src="/2022.svg" alt="NEW" className={menu.name == 'ned' ? 'new-year-ned' : 'new-year' } />} */}
            <h2 className="title2">Week {this.getWeek()}</h2>
            {/* <div className="row-container">
              <label class="switch">
                <input
                  type="checkbox"
                  onClick={() =>
                    this.setState({
                      menu:
                        menu.name == "burwash"
                          ? {
                              name: "ned",
                              index: 1,
                              style: styleNed,
                              colour: "#58ad60",
                            }
                          : {
                              name: "burwash",
                              index: 0,
                              style: styleBurwash,
                              colour: "#A30031",
                            },
                    })
                  }
                />
                <span class="slider round"></span>
              </label>
            </div> */}
            {/* { menu.name == 'burwash' && <img src="/new.svg" alt="NEW" className={'new-ribbon'} />} */}
            <div className="row-container">
              <button
                onClick={() => this.changeDate("backward")}
                className={menu.style["arrow"]}
              >
                <img
                  src="/arrow.svg"
                  alt="Left Arrow"
                  className={"left-arrow"}
                />
              </button>
              <h2
                className={
                  today.getDate() == new Date().getDate() &&
                  today.getMonth() == new Date().getMonth()
                    ? menu.style["subtitle"]
                    : menu.style["subtitle"] + " other-day"
                }
              >
                {today
                  .toDateString()
                  .replace(today.getFullYear() - 1, "")
                  .replace(today.getFullYear(), "")
                  .replace(today.getFullYear() + 1, "")}
              </h2>
              <button
                onClick={() => this.changeDate("forward")}
                className={menu.style["arrow"]}
              >
                <img
                  src="/arrow.svg"
                  alt="Right Arrow"
                  className={"right-arrow"}
                />
              </button>
            </div>
            {/* <div className='row-container'>
              <button onClick={() => this.changeDate()} className={this.state.date.getDate() != new Date().getDate() ? 'arrow not-today' : 'arrow today'}>
                <img src="/undo.svg" alt="Undo" className="undo" />
              </button>
            </div> */}
            {(today.getMonth() == 11 && today.getDate() > 21) ||
            (today.getMonth() == 0 && today.getDate() < 9) ? (
              <div className="center">
                <b>Closed for Winter Break</b>
              </div>
            ) : today.getMonth() > 3 && today.getMonth() < 8 ? (
              <div className="center">
                <b>Closed for summer :D</b>
              </div>
            ) : (
              <div>
                {today.getDate() == 15 && today.getMonth() == 3 && (
                  <div className="center space-below">
                    <b>Good Friday – Weekend Hours</b>
                  </div>
                )}
                <table className={"mainTable " + menu.style["mainTable"]}>
                  {weeks[this.getWeek() - 1][menu.index].map((col, index) =>
                    !(
                      menu.name == "ned" &&
                      (days[today.getDay()] == "Sunday" ||
                        days[today.getDay()] == "Saturday" ||
                        (today.getDate() == 15 && today.getMonth() == 3))
                    ) &&
                    ((col[this.formatDay(today.getDay())] != "" &&
                      col["title"]) != "" ||
                      col["title"] == "DINNER") ? (
                      col["title"] == "DAYS" ||
                      col["title"] == "DINNER" ||
                      col["title"] == "LUNCH" ? (
                        <tr>
                          <th
                            className={
                              index == 0 ? "heading left-top-table" : "heading"
                            }
                          >
                            {col["title"] == "DINNER"
                              ? "Dinner"
                              : index == 0
                              ? "All Day"
                              : "Lunch"}
                          </th>
                          <th
                            className={
                              index == 0 ? "heading right-top-table" : "heading"
                            }
                          >
                            {days[today.getDay()]}
                          </th>
                        </tr>
                      ) : col["title"] == "FOOD BAR" ? (
                        <tr>
                          <td className="heading new">{col["title"]}</td>
                          <td className="table-newline new">
                            {col[this.formatDay(today.getDay())]}
                          </td>
                        </tr>
                      ) : menu.name == "ned" && col["title"] != "SOUPS" ? (
                        <></>
                      ) : (
                        <tr>
                          <td className="heading">{col["title"]}</td>
                          <td className="table-newline">
                            {col[this.formatDay(today.getDay())]}
                          </td>
                        </tr>
                      )
                    ) : null
                  )}
                  {menu.name == "ned" &&
                    !(
                      days[today.getDay()] == "Sunday" ||
                      days[today.getDay()] == "Saturday" ||
                      (today.getDate() == 15 && today.getMonth() == 3)
                    ) && (
                      <>
                        <tr>
                          <td className="heading">FOOD BAR</td>
                          <td className="table-newline">Pasta Bar</td>
                        </tr>
                        <tr>
                          <td className="heading">EVERYDAY</td>
                          <td className="table-newline">
                            Sandwiches / Salads / Snacks / Desserts / Beverages
                          </td>
                        </tr>
                      </>
                    )}
                </table>
                {menu.name == "burwash" ? (
                  <div id="schedule" className={"space-above"}>
                    <h3 className={menu.style["schedule-title"] + " center"}>
                      {menu.name == "burwash" ? "Burwash" : "Ned's"} Schedule
                    </h3>
                    {today.getDay() == 0 ||
                    today.getDay() == 6 ||
                    (today.getDate() == 15 && today.getMonth() == 3) ? (
                      <div className="title2">
                        <b>Saturday, Sunday & Holidays</b>
                        <p>Brunch 10:00 a.m. - 2:30 p.m.</p>
                        <p>Dinner 4:00-7:30 p.m.</p>
                      </div>
                    ) : (
                      <div className="title2">
                        <b>Monday – Friday</b>
                        <p>Breakfast 7:30 a.m. - 10:30 a.m.</p>
                        <p>(Light Breakfast from 10:30 a.m. - 11:00 a.m.)</p>
                        <p>Lunch 11:00 a.m. - 3:30 p.m.</p>
                        <p>Dinner 4:00-7:30 p.m.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    id="schedule"
                    className={
                      today.getDay() == 0 || today.getDay() == 6
                        ? ""
                        : "space-above"
                    }
                  >
                    <h3 className={menu.style["schedule-title"] + " center"}>
                      {menu.name == "burwash" ? "Burwash" : "Ned's"} Schedule
                    </h3>
                    {today.getDay() == 0 ||
                    today.getDay() == 6 ||
                    (today.getDate() == 15 && today.getMonth() == 3) ? (
                      <div className="title2">
                        <b>Saturday, Sunday & Holidays</b>
                        <p>Closed</p>
                      </div>
                    ) : today.getDay() == 5 ? (
                      <div className="title2">
                        <b>Friday</b>
                        <p>11:00 a.m. - 3:30 p.m.</p>
                      </div>
                    ) : (
                      <div className="title2">
                        <b>Monday – Thursday</b>
                        <p>11:00 a.m. - 7:00 p.m.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        <footer>
          <a
            href="https://vicu.utoronto.ca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={menu.name == "burwash" ? "/crest.png" : "/crest-green.png"}
              alt="Vic Crest"
              className="logo"
            />{" "}
            Abeunt Studia in Mores
          </a>
        </footer>

        <style jsx global>{``}</style>
      </div>
    );
  }
}

export default Home;
