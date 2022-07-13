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
      className={
        "flex justify-center flex-col mx-5 md:mx-0 items-center min-w-[250px] rounded-md px-3 py-6 cursor-pointer"
      }
      style={{
        backgroundColor: driver.team.color,
        color: getContrastingColor(driver.team.color),
      }}
      key={driver.id}
      onClick={() => handleVote(driver.id)}
    >
      <h2 className="text-xl">{driver.name}</h2>
      <div className="h-32 w-32 relative">
        <Image
          layout="fill"
          objectFit="cover"
          alt={`${driver.name} profile image`}
          src={`/images/${driver.shortName}.png`}
          priority
        />
      </div>
      <button className="mt-4" onClick={() => handleVote(driver.id)}>
        Vote
      </button>
    </div>
  );
};

export default DriverVote;
