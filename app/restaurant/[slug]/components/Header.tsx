export default function Header({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const renderTitle = () => {
    const nameArray = name.split("-");
    nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`;
    return nameArray.join(" ");
  };
  return (
    <div className="h-96 overflow-hidden">
      <div
        // bg-gradient-to-r from-[#0f1f47] to-[#5f6984]
        className="bg-center bg-gradient-to-r from-[#0f1f477f] to-[#5f698472] h-full flex justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(to right, #0f1f477f, #5f698472), url(${image})`,
        }}
      >
        <h1 className="text-4xl md:text-7xl text-white capitalize text-shadow text-center">
          {renderTitle()}
        </h1>
      </div>
    </div>
  );
}
