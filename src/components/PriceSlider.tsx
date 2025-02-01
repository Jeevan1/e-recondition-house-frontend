import React, { useState, useEffect } from 'react';

interface PriceSliderProps {
  minName: string;
  maxName: string;
  minRange?: number;
  maxRange?: number;
  initialMin?: number;
  initialMax?: number;
  priceGap?: number;
  minChange?: (value: number) => void;
  maxChange?: (value: number) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  minName,
  maxName,
  minRange = 0,
  maxRange = 10000,
  initialMin = 2500,
  initialMax = 8500,
  priceGap = 500,
  minChange = () => {},
  maxChange = () => {},
}) => {
  const [minVal, setMinVal] = useState<number>(initialMin);
  const [maxVal, setMaxVal] = useState<number>(initialMax);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    setSliderTrack();
    minChange(minVal);
    maxChange(maxVal);
  }, [minVal, maxVal]);

  const setSliderTrack = (): void => {
    const range = document.querySelector<HTMLDivElement>('.slider-track');

    if (range) {
      const minPercent = ((minVal - minRange) / (maxRange - minRange)) * 100;
      const maxPercent = ((maxVal - minRange) / (maxRange - minRange)) * 100;

      range.style.left = `${minPercent}%`;
      range.style.right = `${100 - maxPercent}%`;
    }
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    if (value >= minRange && maxVal - value >= priceGap) {
      setMinVal(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    if (value <= maxRange && value - minVal >= priceGap) {
      setMaxVal(value);
    }
  };

  return (
    <div className="">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <label
            htmlFor={minName}
            className="mb-1 block text-sm font-bold text-gray-700"
          >
            Min:
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-sm font-semibold text-gray-500">
              रु
            </span>
            <input
              type="number"
              name={minName}
              value={minVal}
              onChange={handleMinChange}
              className="w-full rounded-md border-2 border-gray-300 py-2 pe-3 ps-8 text-sm font-semibold text-gray-600 focus:outline-primary"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor={maxName}
            className="mb-1 block text-sm font-bold text-gray-700"
          >
            Max:
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-sm font-semibold text-gray-500">
              रु
            </span>
            <input
              type="number"
              name={maxName}
              value={maxVal}
              onChange={handleMinChange}
              className="w-full rounded-md border-2 border-gray-300 py-2 pe-3 ps-8 text-sm font-semibold text-gray-600 focus:outline-primary"
            />
          </div>
        </div>
      </div>
      <div className="range-slider">
        <div className="slider-track"></div>
        <input
          type="range"
          min={minRange}
          max={maxRange}
          value={minVal}
          onChange={handleMinChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="min-val"
        />
        <input
          type="range"
          min={minRange}
          max={maxRange}
          value={maxVal}
          onChange={handleMaxChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="max-val"
        />
        {isDragging && <div className="min-tooltip">{minVal}</div>}
        {isDragging && <div className="max-tooltip">{maxVal}</div>}
      </div>
    </div>
  );
};

export default PriceSlider;
