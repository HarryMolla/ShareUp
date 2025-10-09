import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const MaxProfitCounter = ({ base, max }) => {
  const { ref, inView } = useInView({ triggerOnce: true }); 
  const profit = Number(max) - Number(base);

  return (
    <div ref={ref} className="text-3xl font-bold text-green-500">
      ETB {inView ? <CountUp end={profit} duration={2} /> : 0}
    </div>
  );
};

export default MaxProfitCounter;
