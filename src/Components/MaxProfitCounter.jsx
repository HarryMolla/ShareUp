import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const MaxProfitCounter = () => {
     const { ref, inView } = useInView({ triggerOnce: true }); // only trigger once
  return (
     <div ref={ref} className="text-4xl font-bold text-green-500">
      ETB {inView ?  <CountUp end={1000} duration={2} /> : 0} 
    </div>
  );
}

export default MaxProfitCounter