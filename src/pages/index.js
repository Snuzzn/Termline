import AssessmentSchedule from "../components/AssessmentSchedule";
import React from "react";
import { MyContext } from "../components/context";
import Loading from "../components/loading";
import { navigate } from "gatsby";
import { Button, useColorMode } from "@chakra-ui/react";
import { useSpring, animated } from "react-spring";

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
