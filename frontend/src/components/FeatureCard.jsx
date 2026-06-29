import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  buttonText,
  gradient,
  glowColor,
  delay = 0,
}) {

  const navigate = useNavigate();

  const handleClick = () => {

    if(title.includes("Resume")){
      navigate("/resume-analyzer");
    }

    if(title.includes("Interview")){
      navigate("/ai-interview");
    }

  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl p-6 card-hover group cursor-pointer"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
      }}
      whileHover={{ borderColor: glowColor + "40" }}
    >

      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: gradient }}
      />


      <div className="relative">

        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
          style={{
            background:`linear-gradient(135deg, ${glowColor}30, ${glowColor}10)`,
            border:`1px solid ${glowColor}30`
          }}
        >
          <Icon style={{color:glowColor}}/>
        </motion.div>


        <h3 className="text-lg font-bold text-white mb-2">
          {title}
        </h3>


        <p className="text-sm mb-5 text-slate-400">
          {description}
        </p>



        <motion.button

          onClick={handleClick}

          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"

          style={{
            background:`linear-gradient(135deg, ${glowColor}80, ${glowColor}40)`,
            border:`1px solid ${glowColor}40`
          }}

          whileHover={{
            scale:1.03
          }}

        >

          {buttonText}

          <ArrowRight className="w-4 h-4"/>

        </motion.button>


      </div>


    </motion.div>
  );
}