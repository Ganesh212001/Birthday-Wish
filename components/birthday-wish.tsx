"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { FaBirthdayCake, FaGift } from "react-icons/fa";
import { GiBalloons } from "react-icons/gi";
import { Input } from "@/components/ui/input";

// Dynamically import DynamicConfetti to avoid server-side rendering issues
const DynamicConfetti = dynamic(() => import("react-confetti"), { ssr: false });

// Define type for Confetti component props
type ConfettiProps = {
  width: number;
  height: number;
};

export default function BirthdayCelibrat() {
  const [celebrating, setCelebrating] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<ConfettiProps>({
    width: 0,
    height: 0,
  });
  const [candlesLit, setCandlesLit] = useState<number>(0);
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [userMessage, setUserMessage] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

  // Total number of candles and their colors
  const totalCandles: number = 5;
  const candleColors: string[] = [
    "#FF6347",
    "#1E90FF",
    "#32CD32",
    "#FF4500",
    "#FFC0CB",
  ];

  // Function to light a candle
  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit((prev) => prev + 1);
    }
  };

  // Total number of balloons and their colors
  const totalBalloons: number = 5;
  const balloonColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];

  // Function to pop a balloon when clicked
  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount((prev) => prev + 1);
    }
  };

  // Handle window resizing to adjust confetti size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize size on component mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play Music
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // Function to start celebration
  const celebrate = () => {
    setCelebrating(true);
    setShowConfetti(true);

    const interval = setInterval(() => {
      setCandlesLit((prev) => {
        if (prev < totalCandles) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 500);

    // Stop confetti after 30 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 30000); // 30 seconds

  };

  const celebratePlayMusic = () => {
    playMusic();
    celebrate();
  }

  // Dummy confetti colors
  const confettiColors = ["#ff0", "#f0f", "#0ff", "#f00", "#00f"];

  // Handle form submission to hide the form and show the card
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsFormVisible(false);
  };

  return (
    <>
      {isFormVisible ? (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-200 via-pink-300 to-blue-200">
          <Card className="p-4 bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle>Enter your Name and See Magic</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <Input
                    id="message"
                    type="number"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Enter your Age"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white hover:opacity-90 transition-all duration-300"
                >
                  Next
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-200 via-pink-300 to-blue-200">
          <motion.div
            initial={{ scale: 0.9 }} // Starting point of the animation
            animate={{ scale: 1 }} // Ending point of the animation
            transition={{ duration: 0.5 }} // Duration of the animation
            className="bg-white rounded-lg shadow-2xl p-4"
          >
            <Card className="mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl border-2 border-purple-400">
              <CardHeader className="text-center">
                <CardTitle className="text-5xl font-bold text-purple-600">
                  HAPPY BIRTHDAY
                </CardTitle>
                <br />
                <CardDescription className="text-3xl mt-4 text-pink-600 "><h1>{userName && userName}</h1> </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-lg text-center text-purple-700">
                    Happy Birthday, {userName && userName}! 🎉🎂 Wishing you endless joy, success, and laughter as you turn {userMessage && userMessage} today! 🥳🎁 Stay amazing! 💖✨
                  </p>
                  <h3 className="text-lg font-semibold text-black mb-2 text-center mt-6">
                    Light the candles:
                  </h3>
                  <div className="flex justify-center space-x-4">
                    {[...Array(totalCandles)].map((_, index) => (
                      <AnimatePresence key={index}>
                        {(celebrating && index <= candlesLit) ||
                          (!celebrating && index < candlesLit) ? (
                          <motion.div
                            initial={{ scale: 0 }} // Start with a scale of 0 (invisible)
                            animate={{ scale: 1 }} // Animate to scale 1 (visible)
                            exit={{ scale: 0 }} // Scale back to 0 when exiting
                            transition={{
                              duration: 0.5,
                              delay: celebrating ? index * 0.5 : 0,
                            }} // Delay each candle animation
                          >
                            <FaBirthdayCake
                              className={`w-10 h-10 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                              style={{
                                color: candleColors[index % candleColors.length],
                              }} // Set the candle color
                              onClick={() => lightCandle(index)} // Light the candle on click
                            />
                          </motion.div>
                        ) : (
                          <FaBirthdayCake
                            className={`w-10 h-10 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                            onClick={() => lightCandle(index)} // Light the candle on click
                          />
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2 text-center mt-4">
                    Pop the balloons:
                  </h3>
                  <div className="flex justify-center space-x-4">
                    {[...Array(totalBalloons)].map((_, index) => (
                      <motion.div
                        key={index} // Give each balloon a unique key
                        initial={{ scale: 1 }}
                        animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <GiBalloons
                          className={`w-10 h-10 cursor-pointer hover:scale-110`}
                          style={{
                            color: index < balloonsPoppedCount
                              ? "gray"
                              : balloonColors[index % balloonColors.length],
                          }}
                          onClick={() => popBalloon(index)} // Pop the balloon on click
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-center">
                <Button
                  onClick={celebratePlayMusic}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white hover:opacity-90 transition-all duration-300"
                >
                  Celebrate! <FaGift className="ml-2 h-4 w-4" />
                </Button>
                <audio ref={audioRef} src="/sound/song.mp3" preload="auto" />
              </CardFooter>
            </Card>
            {showConfetti && <DynamicConfetti width={windowSize.width} height={windowSize.height} colors={confettiColors} />}
          </motion.div>
        </div>
      )}
    </>
  );
}
