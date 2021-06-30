import AssessmentSchedule from "../components/AssessmentSchedule";
import React from "react";
import { MyContext } from "../components/context";
import Loading from "../components/Loading";
import { navigate } from "gatsby";
import { Button, useColorMode } from "@chakra-ui/react";
import { useSpring, animated } from "react-spring";
import favicon from "../images/favicon.ico";
import Helmet from "react-helmet";

export default function Home() {
  const { setScheduleData, setCourses, setTitle, setStartDate } =
    React.useContext(MyContext);

  React.useEffect(() => {
    if (localStorage.getItem("scheduleData") != null) {
      setScheduleData(JSON.parse(localStorage.getItem("scheduleData")));
      setCourses(JSON.parse(localStorage.getItem("courses")));
      setTitle(JSON.parse(localStorage.getItem("title")));
      setStartDate(new Date(JSON.parse(localStorage.getItem("startDate"))));
      setLoading(false);
    } else {
      navigate("/wizard");
    }
  }, []);
  const [loading, setLoading] = React.useState(true);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 500,
  });
  return (
    <main>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>Termline</title>
        <meta name="description" content="An intuitive assessment scheduler" />
      </Helmet>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <animated.div style={props}>
          <AssessmentSchedule />
        </animated.div>
      )}
    </main>
  );
}
