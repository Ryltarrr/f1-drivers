import Image from "next/image";
import { Driver, Team } from "@prisma/client";
import { getContrastingColor } from "src/utils/getConstrastingColor";

type Props = {
  driver: Driver & { team: Team };
  handleVote: (id: string) => void;
};

const DriverVote: React.FC<Props> = ({ driver, handleVote }) => {
  return (
    <div
      className="mx-5 md:mx-0 min-w-[250px] rounded-md px-3 py-6 cursor-pointer"
      style={{
        backgroundColor: driver.team.color,
        color: getContrastingColor(driver.team.color),
      }}
      onClick={() => handleVote(driver.id)}
    >
      <div className="flex justify-center items-center flex-col animate-fade-in">
        <h2 className="text-xl">{driver.name}</h2>
        <div className="h-32 w-32 relative">
          <Image
            layout="fill"
            objectFit="cover"
            src={`/images/${driver.shortName}.png`}
            priority
          />
        </div>
        <button className="mt-4" onClick={() => handleVote(driver.id)}>
          Vote
        </button>
      </div>
    </div>
  );
};

export default DriverVote;
