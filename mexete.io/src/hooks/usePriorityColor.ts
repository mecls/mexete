export default function getPriorityColor(level: number | undefined) {
    switch (level) {
      case 1:
        return '#FF3131'; // High priority - Red
      case 2:
        return '#FF9F31'; // Medium priority - Orange
      case 3:
        return '#31FF5E'; // Low priority - Green
      default:
        return '#636363'; // Default color - Grey
    }
  };
  