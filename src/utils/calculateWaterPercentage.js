export const calculateWaterPercentage = (dailyGoalLiters, drank) => {
  const dailyGoalMl = dailyGoalLiters * 1000;
  const percentage = (drank / dailyGoalMl) * 100;
  return percentage.toFixed();
};
