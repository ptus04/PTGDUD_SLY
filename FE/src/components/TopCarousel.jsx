import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const getOrientation = () =>
  /^portrait/.test(screen.orientation.type) ? "portrait" : "landscape";

const TopCarousel = () => {
  const [items, setItems] = useState(null);
  const [active, setActive] = useState(0);
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();

  const handlePrev = () => {
    setActive((active) => (active - 1 + items.length) % items.length);
    setReset(!reset);
  };

  const handleNext = () => {
    setActive((active) => (active + 1) % items.length);
    setReset(!reset);
  };

  const handleChangeItem = (i) => {
    setActive(i);
    setReset(!reset);
  };

  const handleOrientationChanged = useCallback(async () => {
    const res = await fetch(`./api/${getOrientation()}.json`);
    const data = await res.json();
    setItems(data);
  }, []);

  useEffect(() => {
    screen.orientation.addEventListener("change", handleOrientationChanged);
    screen.orientation.dispatchEvent(new Event("change"));

    return () =>
      screen.orientation.removeEventListener(
        "change",
        handleOrientationChanged,
      );
  }, [handleOrientationChanged]);

  useEffect(() => {
    const interval = setInterval(
      () => setActive((active) => (active + 1) % items.length),
      5000,
    );

    return () => clearInterval(interval);
  }, [items, reset]);

  return (
    <div className="relative h-dvh">
      <div className="h-dvh">
        {items?.map((item, i) => (
          <a
            key={i}
            className={`absolute h-full w-full ${active === i ? "animate-(--animate-fade-in)" : "animate-(--animate-fade-out) invisible"}`}
            onClick={() => navigate(item.link)}
          >
            <img
              className="h-full w-full object-cover"
              src={`./img/carousel/${item.image}`}
              loading="lazy"
            />
            {item.title && (
              <div className="bg-linear-to-t absolute bottom-0 left-0 right-0 from-black to-75% pb-6 pl-4 pr-4 pt-9 text-white">
                <h3 className="font-bold text-2xl">{item.title}</h3>
                <p>{item.content}</p>
              </div>
            )}
          </a>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 flex gap-1">
        {items?.map((item, i) => (
          <a
            key={i}
            className={`h-1 w-8 cursor-pointer rounded-full ${active === i ? "bg-white" : "bg-gray-500"}`}
            title={item.title}
            onClick={() => handleChangeItem(i)}
          ></a>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 flex">
        <button
          onClick={handlePrev}
          className="cursor-pointer items-center rounded-bl-2xl rounded-tl-2xl bg-black/50 px-4 py-2"
        >
          <span className="fa fa-arrow-left text-white"></span>
        </button>
        <button
          onClick={handleNext}
          className="cursor-pointer items-center rounded-br-2xl rounded-tr-2xl bg-black/50 px-4 py-2"
        >
          <span className="fa fa-arrow-right text-white"></span>
        </button>
      </div>
    </div>
  );
};

export default TopCarousel;
