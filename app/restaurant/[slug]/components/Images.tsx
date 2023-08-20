export default function Images({ images }: { images: string[] }) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {images.length} photo{images.length > 1 ? "s" : ""}
      </h1>
      <div className="flex flex-wrap">
        {images.map((image, id) => (
          <img
            key={id}
            className="w-full md:w-56 md:h-44 md:mr-1 md:mb-1 mb-2 rounded-md"
            src={image}
            alt="restaurant images"
          />
        ))}
      </div>
    </div>
  );
}
