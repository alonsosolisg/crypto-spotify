"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { FaBackwardStep } from "react-icons/fa6";
import { FaForwardStep } from "react-icons/fa6";
import { LuShuffle } from "react-icons/lu";
import { SlLoop } from "react-icons/sl";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }

      setIsPlaying(!audio.paused);
    }
  };
  const minutesToSeconds = (minutes: number) => minutes * 60;

  useEffect(() => {
    const songDuration = audioRef.current?.duration || 0;
    setSongDuration(songDuration);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [songTime, setSongTime] = useState(0);
  const [barHovered, setBarHovered] = useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleTimeBarClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - boundingRect.left;
    const totalWidth = boundingRect.width;
    const clickPercentage = clickX / totalWidth;
    const newSongTime = clickPercentage * songDuration;
    setSongTime(newSongTime);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newSongTime;
    }
  };

  useEffect(() => {
    if (songDuration === 0) {
      setLoading(true);
      setSongDuration(audioRef.current?.duration || 0);
    } else {
      setLoading(false);
    }
  }, [songDuration]);

  useEffect(() => {
    let lastUpdateTime = Date.now();

    const updateSongTime = () => {
      if (isPlaying) {
        const currentTime = Date.now();
        const elapsedSeconds = (currentTime - lastUpdateTime) / 1000;
        setSongTime((prevSongTime) => prevSongTime + elapsedSeconds);

        if (songTime >= songDuration) {
          if (isLooped) {
            setSongTime(0);
            handlePlayPause();
          } else {
            setSongTime(0);
            setIsPlaying(false);
          }
        }

        lastUpdateTime = currentTime;
      }
    };

    const interval = setInterval(updateSongTime, 100);
    return () => clearInterval(interval);
  }, [songTime, isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className="w-full select-none text-customWhite-900 gap-20 fixed flex justify-evenly items-center p-4 h-fit bottom-0 bg-transparent">
      <audio ref={audioRef}>
        <source src="/audio/vivid-dream.mp3" type="audio/mp3" />
      </audio>
      <div className="h-fit w-[25%] flex gap-4 justify-start items-center">
        <Image
          src="https://i.scdn.co/image/ab67616d00001e02801d5d02ed29edd7c8971423"
          width={100}
          height={100}
          alt="Album Cover"
          className="rounded-md h-fit w-[15%]"
        />
        <div className="flex flex-col text-start">
          <div className="text-sm hover:underline hover:cursor-pointer">
            Vivid Dream
          </div>
          <div className="text-customGray-500 text-xs hover:underline hover:cursor-pointer hover:text-customWhite-900">
            Altered Manner
          </div>
        </div>
        <div className="flex justify-center items-center">
          <FaCircleCheck className="text-customGreen-200 w-5 h-5 ml-2 hover:cursor-pointer hover:scale-105" />
        </div>
      </div>
      {loading ? (
        <div className="w-[40%] flex flex-col justify-center items-center gap-1 h-full">
          LOADING...
        </div>
      ) : (
        <div className="w-[40%] flex flex-col justify-center items-center gap-1 h-full">
          <div className="w-full flex justify-center items-center gap-4">
            <LuShuffle
              onClick={() => setIsShuffled(!isShuffled)}
              className={` w-5 h-5 hover:scale-105 hover:cursor-pointer transition-all ${
                isShuffled
                  ? "text-customGreen-200"
                  : "text-customGray-500 hover:text-customWhite-900"
              }`}
            />
            <FaBackwardStep className="text-customGray-500 w-5 h-5 hover:scale-105 transition-all hover:text-customWhite-900" />
            {isPlaying ? (
              <MdOutlinePauseCircleFilled
                className="text-customWhite-900 w-10 h-10 hover:scale-105 transition-all selected:scale-105"
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  handlePlayPause();
                }}
              />
            ) : (
              <MdOutlinePlayCircleFilled
                className="text-customWhite-900 w-10 h-10 hover:scale-105 transition-all selected:scale-105"
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  handlePlayPause();
                }}
              />
            )}
            <FaForwardStep className="text-customGray-500 w-5 h-5 hover:scale-105 transition-all hover:text-customWhite-900" />
            <SlLoop
              onClick={() => setIsLooped(!isLooped)}
              className={`w-5 h-5 hover:scale-105 transition-all ${
                isLooped
                  ? "text-customGreen-200"
                  : "text-customGray-500 hover:text-customWhite-900"
              }`}
            />
          </div>
          <div className="w-full flex items-center gap-2">
            <p className="text-customGray-500 text-xs">
              {formatTime(songTime)}
            </p>
            <div
              onClick={handleTimeBarClick}
              onMouseEnter={() => setBarHovered(true)}
              onMouseLeave={() => setBarHovered(false)}
              className="relative w-full bg-customWhite-300 my-1 rounded-full h-1"
            >
              <div
                className={` h-1 rounded-full transition-all ${
                  barHovered ? "bg-customGreen-200" : "bg-customWhite-900"
                }`}
                style={{
                  width: `${(songTime / songDuration) * 100}%`,
                }}
              ></div>
              {barHovered && (
                <div
                  className="absolute w-3 h-3 rounded-full bg-customWhite-900"
                  style={{
                    left: `${(songTime / songDuration) * 100}%`,
                    marginLeft: "-8px",
                    marginTop: "-8px",
                  }}
                ></div>
              )}
            </div>
            <p className="text-customGray-500 text-xs">
              {formatTime(songDuration)}
            </p>
          </div>
        </div>
      )}
      <div className="w-[25%] flex justify-end">
        <AiOutlineExpandAlt className="text-customGray-500 w-6 h-6 hover:scale-105 hover:text-customWhite-900 hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default Player;
