import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const MaxProfitCounter = () => {
     const { ref, inView } = useInView({ triggerOnce: true }); // only trigger once
  return (
     <div ref={ref} className="text-4xl font-bold text-green-500">
      {inView ? <CountUp end={1000} duration={2} /> : 0} ETB
    </div>
  );
}

export default MaxProfitCounter