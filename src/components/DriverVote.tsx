import Image from "next/image";
import { Driver, Team } from "@prisma/client";

type Props = {
  driver: Driver & { team: Team };
  handleVote: (id: string) => void;
};

const DriverVote: React.FC<Props> = ({ driver, handleVote }) => {
  return (
    <div
      className={`flex justify-center flex-col items-center min-w-[200px] rounded-md px-2 py-5`}
      style={{ backgroundColor: driver.team.color }}
      key={driver.id}
    >
      <h2 className="overflow-clip">{driver.name}</h2>
      <div className="h-32 w-32 relative">
        <Image
          layout="fill"
          objectFit="cover"
          src={`/images/${driver.shortName}.png`}
        />
      </div>
      <button className="mt-4" onClick={() => handleVote(driver.id)}>
        Vote
      </button>
    </div>
  );
};

export default DriverVote;
