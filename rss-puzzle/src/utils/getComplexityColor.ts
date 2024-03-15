const getComplexityColor = (lvl: number): string => {
  const complexityColors = [
    'beginner',
    'novice',
    'intermediate',
    'advanced',
    'master',
    'expert',
  ];
  return complexityColors[lvl - 1];
};

export default getComplexityColor;
