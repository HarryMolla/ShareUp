import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const MaxProfitCounter = ({ base, max }) => {
  const { ref, inView } = useInView({ triggerOnce: true }); 
  const profit = Number(max) - Number(base);

  return (
    <div ref={ref}>
      {inView ? <CountUp end={profit} duration={2} /> : 0} ETB 
    </div>
  );
};

export default MaxProfitCounter;
